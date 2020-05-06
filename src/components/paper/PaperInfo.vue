<template>
<!-- 出卷组件 -->
    <div class="paperinfo">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
            <el-form-item label="试卷名称" prop="paper">
                <el-input v-model="ruleForm.paper" placeholder="请输入试卷名称"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" prop="course">
                <SelectCourse v-model="course" ref="fous"></SelectCourse>
            </el-form-item>
            <div class="submitbtn">
                <el-button type="primary" @click="submitForm(ruleForm)">下一步</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import SelectCourse from '../select/SelectCourse';
import request from '@/api/Paper';
export default {
    data() {
        return {
            // label对齐方式
            labelPosition: 'top',
            // 表单数据
            ruleForm: {
                paper: ''
            },
            course: {
                courseId: '',
                courseName: ''
            },
            //验证表单
            rules: {
                paper: [
                    { required: true, message: '请输入试卷名称', trigger: 'blur' },
                    { min: 2, max: 18, message: '请输入正确的试卷名', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        SelectCourse
    },
    created() {},
    methods: {
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {  
                    if (!this.course.courseId) {
                        this.$message.error('请选择课程名称');
                        this.$refs.fous.$refs.focs.focus()
                        return false;
                    }
                    this.makePaperInfo();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //下一步
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        //制作试卷
        makePaperInfo() {
            let userInfo = sessionStorage.getItem('userData');
            let userId = JSON.parse(userInfo).userUid;
            request
                .makePaper(
                    {
                        tpTitle: this.ruleForm.paper,
                        tpCourseId: this.course.courseId
                    },
                    { uid: userId }
                )
                .then(res => {
                    if (res.data.code === 1) {
                        this.$message.success(res.data.message);
                        sessionStorage.setItem('paperId',res.data.data.testPaperId)   //储存试卷id
                        setTimeout(() => {
                             this.$emit('next')
                        }, 1000);
                    }else{
                        this.$message.warning(res.data.message);
                    }
                });
        }
    }
};
</script>

<style scoped lang="less">
.submitbtn {
    width: 100%;
    text-align: center;
}
</style>
