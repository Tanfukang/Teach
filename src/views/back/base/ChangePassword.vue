<template>
    <div class="change">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基础数据</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card max">
            <div slot="header" class="clearfix">
                <i class="el-icon-edit">修改密码</i>
            </div>
            <div class="item">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="FormerPass">
                        <el-input type="password" v-model="ruleForm.FormerPass" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="NewPass">
                        <el-input type="password" v-model="ruleForm.NewPass" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="AffirmPass">
                        <el-input v-model="ruleForm.AffirmPass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import request from '../../../api/ChangePass';

export default {
    name: '',
    data() {
        //   确认密码是否一致
        var NewPass2 = (rule, value, callback) => {
            if (value !== this.ruleForm.NewPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                FormerPass: '',
                NewPass: '',
                AffirmPass: ''
            },
            // 用户id
            userId: '',
            // 当前密码
            atPass: '',
            rules: {
                FormerPass: [
                    { required: true, message: '请输输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ],
                NewPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ],
                AffirmPass: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: NewPass2, trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        let cookies = this.Cookie.getCookie('user');
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        this.userId = userData.userUid;
        if (cookies) {
            let userPass = JSON.parse(this.Base64.decode(cookies));
            this.ruleForm.FormerPass = userPass.password;
        }
    },
    methods: {
        //修改密码
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    request
                        .AlterPass({
                            uid: this.userId,
                            oldPassword: formName.FormerPass,
                            newPassword: formName.NewPass
                        })
                        .then(res => {
                            if(res.data.code === 1) {
                                this.$message.success('修改密码成功，请重新登陆');
                                this.Cookie.removeCookie('user');
                                setTimeout(() => {
                                    this.$router.push({ path: '/login' });
                                }, 1000);
                            }else if(res.data.code === 0){
                                this.$message.warning('密码没有变化');
                            }else{
                                this.$message.warning('密码修改失败');
                            }
                        })
                        .catch(error => {
                            this.$message.warning('密码修改失败');
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="" scoped></style>
