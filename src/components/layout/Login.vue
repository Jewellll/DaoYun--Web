<template>
    <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-container" label-position="left"
             label-width="0x">
        <h3 class="login_title">登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" @keyup.enter.native="login()" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item  prop="verifycode">
            <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
        </el-form-item>
        <el-form-item>
            <div class="identifybox">
                <div @click="refreshCode">
                    <Identify :identifyCode="identifyCode"></Identify>
                </div>
                <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;background: #2E9AFE;border: none" @click="login()">
                登录
            </el-button>
        </el-form-item>
        <el-link :underline="false" class="forget-link" @click="forgetpassword()">忘记密码</el-link>
        <el-link :underline="false" class="signup-link" @click="register()">注册账号</el-link>
    </el-form>
    </div>
</template>
<script>
import Identify from './Identify'
export default {
    name: 'Login',
    data () {
        const validateVerifycode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'))
            } else if (value !== this.identifyCode) {
                console.log('validateVerifycode:', value)
                callback(new Error('验证码不正确!'))
            } else {
                callback()
            }
        };
        return {
            loginForm: {
                username: '',
                password: '',
                verifycode: ''
            },
            checked: false,
            identifyCodes: '1234567890',
            identifyCode: '',
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                verifycode: [
                    { required: true,  validator: validateVerifycode,trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        Identify
    },
    mounted() {
        // 验证码初始化
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
    },
    methods: {
        // 生成随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换验证码
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        // 生成四位随机验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ]
            }
            console.log(this.identifyCode)
        },
        login () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$axios
                        .post('/login', {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$store.commit('login', this.loginForm);  //触发 store 中的 login() 方法，把 loginForm 对象传递给 store 中的 user 对象
                                var path = this.$route.query.redirect
                                this.$router.replace({
                                    path: path === '/' || path === undefined ? '/index' : path
                                });
                            }
                            if (res.data.code === 400) {
                                this.$message.error("账号或密码错误");
                            }
                        })
                        .catch(failResponse => {});
                } else {
                    this.$message.error('请输入账号和密码或验证码')
                    return false
                }
            })
        },
        forgetpassword(){
            this.$router.push({ path: "/checkphone", query: {} });
        },
        register(){
            this.$router.push({ path: "/register", query: {} });
        }
    }
}
</script>

<style>
.login-container {
    border-radius: 15px;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    opacity: 0.9;
}

.login_title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
    letter-spacing: 10px
}

.forget-link {
    position: relative;
    right: 145px;
    color: #505458;
    font-size: 12px;
}
.signup-link{
    position: relative;
    left: 145px;
    color: #505458;
    font-size: 12px;
}
.identifybox{
    display: flex;
    justify-content: space-between;
    margin-top:7px;
}
</style>
