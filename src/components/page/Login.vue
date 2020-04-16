<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="login-logo">
                            <div class="logo-pic">
                                <img src="../../assets/img/login-logo.png" alt="" />
                            </div>
                            <div class="login-title">
                                智学无忧后台系统
                            </div>
                            <div class="login-text">
                                做最有态度、责任、良心的IT教育
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                            <el-form-item prop="username">
                                <el-input v-model="param.username" placeholder="username">
                                    <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    type="password"
                                    placeholder="password"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                                >
                                    <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
                            <div class="login-btn">
                                <el-button type="success" @click="submitForm()" :loading="logining">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            checked: false,
            logining: false
        };
    },
    methods: {
        submitForm() {
            let _this = this;
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.axios.get('/api/OAuth/authenticate', {
                            params: {
                                username: userMobile,
                                password: userPassword
                            }
                        })
                        .then(res => {
                            console.log(res)
                        });
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    // this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.login-logo {
    padding: 30px 20px;
    text-align: center;
}
.logo-pic img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.login-title {
    font-weight: 700;
    color: #009688;
    margin: 20px 0px;
}
.login-text {
    font-size: 10px;
    color: #999999;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    width: 400px;
    margin: auto;
    border-radius: 5px;
    background-color: #d8ecf5;
    box-shadow: 0 0 20px #ffffff;
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
    border-left: 1px solid #cccccc;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
