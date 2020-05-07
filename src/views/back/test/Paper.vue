<template>
    <div class="paper">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>在线测试</el-breadcrumb-item>
                <el-breadcrumb-item>老师出卷</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="step">
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="试卷信息"></el-step>
                        <el-step title="添加题目"></el-step>
                        <el-step title="完成制作"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="text item">
                <!-- 试卷信息 -->
                <paper-info class="paperinfo" v-if="active === 0" @next ="next"></paper-info>
                <!-- 添加题目 -->
                <add-topic class="addTopic" v-if="active === 1"></add-topic>
                <!-- 完成制作 -->
                <achieve class="achieve" v-if="active === 2"></achieve>
            </div>
        </el-card>
    </div>
</template>

<script>
import PaperInfo from '@/components/paper/PaperInfo'; //试卷信息组件
import AddTopic from '@/components/paper/AddTopic'; //添加题目组件
import Achieve from '@/components/paper/Achieve'; //完成制作组件
import request from '@/api/Paper'; 
export default {
    name: '',
    data() {
        return {
            //默认选中第一个步骤
            active: 0,
            // label对齐方式
            labelPosition: 'top',
            ruleForm: {
                name: ''
            },
            rules: {
                paper: [
                    { required: true, message: '请输入试卷名称', trigger: 'blur' },
                    { min: 3, max: 18, message: '请输入正确的试卷名', trigger: 'blur' }
                ],
                course: [{ required: true, message: '请选择课程名称', trigger: 'blur' }]
            }
        };
    },
    components: { PaperInfo, AddTopic, Achieve },
    created() {},
    methods: {
        //上一步
        next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
};
</script>

<style scoped lang="less">
.step {
    width: 70%;
    margin: 0px auto;
}
.paperinfo {
    width: 40%;
    margin: 20px auto;
}
.submitbtn {
    width: 100%;
    text-align: center;
}
</style>