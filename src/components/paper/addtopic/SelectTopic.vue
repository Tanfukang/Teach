<template>
    <!-- 选择题组件 -->
    <div class="selectTopic">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item prop="textarea" label="题干" :rules="[{ required: true, message: '请输题干', trigger: 'blur' }]">
                <el-input type="textarea" autosize v-model="dynamicValidateForm.textarea"> </el-input>
            </el-form-item>
            <el-form-item
                class="context"
                v-for="(domain, index) in dynamicValidateForm.domains"
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
                <el-button round @click="resetForm('dynamicValidateForm')">重置</el-button>
                <el-button type="info" round @click="addDomain">新增题目</el-button>
                <el-button type="primary" round icon="el-icon-document-checked" @click="submitForm('dynamicValidateForm')"
                    >保存题目</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 2,
            input: '',
            // 选择题
            choice: [
                {
                    topicId: 1,
                    check: false,
                    stide: 'A',
                    inputtype: 'text'
                },
                {
                    topicId: 2,
                    check: false,
                    stide: 'B',
                    inputtype: 'text'
                },
                {
                    topicId: 3,
                    check: false,
                    stide: 'C',
                    inputtype: 'text'
                },
                {
                    topicId: 4,
                    check: false,
                    stide: 'D',
                    inputtype: 'text'
                }
            ],
            dynamicValidateForm: {
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
                    console.log(this.dynamicValidateForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();

            this.dynamicValidateForm.domains.forEach((item,index)=>{
                item.checked = false;
            })
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index > 1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            if (this.dynamicValidateForm.domains.length < 6) {
                this.dynamicValidateForm.domains.push({
                    value: '',
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
