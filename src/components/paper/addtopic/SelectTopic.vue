<template>
    <!-- 选择题组件 -->
    <div class="selectTopic">
        <el-form :model="selectTopicInfo" ref="selectTopicInfo" label-width="100px" class="demo-dynamic">
            <el-form-item prop="textarea" label="题干" :rules="[{ required: true, message: '请输题干', trigger: 'blur' }]">
                <el-input type="textarea" autosize v-model="selectTopicInfo.textarea"> </el-input>
            </el-form-item>
            <el-form-item
                class="context"
                v-for="(domain, index) in selectTopicInfo.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                    required: true,
                    message: '请输入题目',
                    trigger: 'blur'
                }"
            >
                <span slot="label"
                    ><el-checkbox v-model="domain.checked">{{ String.fromCharCode(64 + parseInt(index + 1)) }}、</el-checkbox></span
                >
                <div>
                    <el-input v-model="domain.value" class="inputtopic"></el-input>
                    <el-button type="danger" icon="el-icon-delete" circle @click.prevent="removeDomain(domain)"></el-button>
                </div>
            </el-form-item>
            <el-form-item label="分值">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button round @click="resetForm('selectTopicInfo')">重置</el-button>
                <el-button type="info" round @click="addDomain">新增题目</el-button>
                <el-button type="primary" round icon="el-icon-document-checked" @click="submitForm('selectTopicInfo')"
                    >保存题目</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from '@/api/Paper';
export default {
    data() {
        return {
            num: 2,
            input: '',
            correct:true,
            // 选择题
            selectTopicInfo: {
                domains: [
                    {
                        checked: false,
                        value: ''
                    },
                    {
                        checked: false,
                        value: ''
                    }
                ],
                textarea: ''
            }
        };
    },
    created() {},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                  let corr  =  this.selectTopicInfo.domains.find(item => item.checked === this.correct); //是否有正确答案
                  let newArr = new Set(Array.from(this.selectTopicInfo.domains));          //答案重复操作
                    if(!corr){
                        this.$message.warning('请选择正确答案');
                        return
                    }else if(newArr.length !== this.selectTopicInfo.domains.length){
                         this.$message.warning('答案不能重复');
                         return
                    }
                    //正确答案
                   let chooseQuestion = this.selectTopicInfo.domains.map((item)=>{
                        return {
                            cqOption:item.value,
                            cqIsRight:item.checked
                        }
                    })
                    //添加题目参数
                    let addInfo = {
                        tpqPaperId:sessionStorage.getItem('paperId'),           //试卷编号
                        tpqScore:this.num,                                      //分值
                        tpqQuestion:{                       
                            questionTitle:this.selectTopicInfo.textarea,        //题干
                            questionTypeId:1,                                   //题目类型
                            chooseQuestion                                      //题目内容                      
                        }
                    }
                    request.addTopic(addInfo)
                    .then(res=>{
                        if (res.data.code === 1) {
                            this.$message.success(res.data.message);
                            this.resetForm()
                        }else{
                            this.$message.warning(res.data.message);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.selectTopicInfo.domains.forEach((item,index)=>{
                item.checked = false;
            })
        },
        //删除题目
        removeDomain(item) {
            var index = this.selectTopicInfo.domains.indexOf(item);
            if (index > 1) {
                this.selectTopicInfo.domains.splice(index, 1);
            }
        },
        //添加题目
        addDomain() {
            if (this.selectTopicInfo.domains.length < 6) {
                this.selectTopicInfo.domains.push({
                    value: '',
                    checked:false,
                    key: Date.now()
                });
            }
        },
        handleChange(value) {
            console.log(value);
        }
    }
};
</script>

<style scoped lang="less">
.context>div{
    display: flex;
}
.context .el-input{
    margin-right: 10px;
    width: calc(100% - 42px);
}
</style>
