<template>
    <div class="login-wrap">
        <div class="ms-login">
            <!-- 登陆logo容器 -->
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
            <!-- 登陆容器 -->
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content ">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名" maxlength="11">
                        <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
                <div class="login-btn">
                    <el-button type="success" @click="submitForm(rules)" :loading="logining">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 账号验证正则
        let checkPhone = (rule, value, callback) => {
            const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;

            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (phoneReg.test(value)) {
                    callback();
                } else {
                    callback(new Error('账号格式有误'));
                }
            }
        };
        return {
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ]
            },
            checked: false,
            logining: false
        };
    },
    methods: {
        submitForm(param) {
            let _this = this;
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.logining = true;
                    _this.axios
                        .get('/api/OAuth/authenticate', {
                            params: {
                                userMobile: _this.param.username,
                                userPassword: _this.param.password
                            }
                        })
                        .then(res => {
                            let Userinfo = JSON.stringify(this.param);
                            if (res.status === 200) {
                                if (this.checked) {
                                    // 对账号密码加密并存入cookie
                                    this.Cookie.setCookie('user', this.Base64.encode(Userinfo), 60 * 60 * 24 * 3);
                                }
                                _this.userToken = res.data.token_type + ' ' + res.data.access_token;
                                this.$message.success('登录成功');
                                sessionStorage.setItem('userToken', _this.userToken);
                                sessionStorage.setItem('username', res.data.profile.userName);
                                localStorage.setItem('userpic', res.data.profile.userHeader);
                                setTimeout(() => {
                                    this.logining = false;
                                    this.$router.push({ path: '/' });
                                }, 1000);
                            } else {
                                return false;
                            }
                        })
                        .catch(error => {
                            setTimeout(() => {
                                this.logining = false;
                            }, 2000);
                            this.$message.warning('账号密码错误');
                        });
                } else {
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
    background-size: cover;
}
.login-logo {
    flex: 1;
    box-sizing: border-box;
    padding: 40px 20px;
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
/deep/ .el-icon-user-solid,
/deep/ .el-icon-lock {
    color: #67c23a;
}
.ms-login {
    width: 500px;
    height: 250px;
    margin: auto;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #d8ecf5;
    box-shadow: 0 0 20px #d8ecf5;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.ms-content {
    box-sizing: border-box;
    flex: 1;
    padding: 40px 20px;
    border-left: 1px solid transparent;
    border-image: linear-gradient(to bottom, #fbfbfb, #36a85f, #fbfbfb) 1 1;
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
@media screen and (max-width: 750px) {
    .logo-pic {
        margin-top: 60px;
    }
    .ms-login {
        width: 100%;
        height: 100%;
        flex-direction: column;
        /* display: block; */
        overflow: hidden;
    }
    .login-logo {
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(to left, #fbfbfb, #36a85f, #fbfbfb) 1 1;
    }
    .ms-content {
        border-left: none;
    }
}
</style>
