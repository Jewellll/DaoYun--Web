<template>
    <div>
        <el-form :model="regForm" :rules="rules" ref="regForm" class="reg-container" label-position="left" size="small"
                 label-width="0x">
            <h3 class="check_title">注册</h3>
            <el-form-item label="手机号" prop="phoneNum">
                <el-col :span="14">
                <el-input type="text" v-model="regForm.phoneNum"
                          auto-complete="off" placeholder="请输入手机号码"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyNum">
                <div class="iden">
                    <el-col :span="10">
                    <el-input type="text" v-model="regForm.verifyNum" auto-complete="off"  placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="24">
                    <el-button :style="{border: 'none',background:btnColor?'#2E9AFE':'#617079',color:'#FFF',width:'50%'}"
                               v-on:click="sendSmsCode" class="verify-btn" v-model="btnContent"
                               v-bind="{'disabled':disabled}">
                        {{ btnContent }}
                    </el-button>
                    </el-col>
                </div>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-col :span="10">
                <el-input type="text" v-model="regForm.username" placeholder="请输入用户名"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-col :span="10">
                <el-input type="text" v-model="regForm.name" placeholder="请输入姓名"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="name">
                <el-col :span="14">
                <el-radio-group v-model="regForm.sex">
                    <el-radio class="radio" label="1">男</el-radio>
                    <el-radio class="radio" label="2">女</el-radio>
                    <el-radio class="radio" label="0">未知</el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="身份" prop="loginType">
                <el-col :span="14">
                <el-radio-group v-model="regForm.loginType">
                    <el-radio class="radio" label="1">教师</el-radio>
                    <el-radio class="radio" label="2">学生</el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-col :span="14">
                <el-input type="text" v-model="regForm.email" placeholder="请输入邮箱"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码"  prop="newPassword">
                <el-col :span="14">
                <el-input type="password" v-model="regForm.newPassword" placeholder="请输入密码"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-col :span="14">
                <el-input type="password" v-model="regForm.checkPassword" placeholder="再次输入密码"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;border: none"
                           v-on:click.stop="verificationCode">
                    确定
                </el-button>
            </el-form-item>
            <el-link :underline="false" class="back-link" @click="back()">返回</el-link>
        </el-form>
    </div>
</template>

<script>
import {registerMss, requireRegister} from '../../api/api'

export default {
    name: 'Register',
    data () {
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/

            if (regEmail.test(value)) {
                // 合法的邮箱
                return cb()
            }

            cb(new Error('请输入合法的邮箱'))
        };
        var checkMobile = (rule, value, cb) => {
            // 先定义一个验证手机号的正则表达式
            const regMobile = /^1[34578]\d{9}$/
            // 合法： regMobile.test(value)进过测试后放回的值
            if (regMobile.test(value)) {
                return cb()
            }
            // 不合法
            cb(new Error('请输入合法的手机号'))
        };
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入新密码"));
            } else if (value.toString().length < 6 || value.toString().length > 18) {
                callback(new Error("密码长度为6-18位"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.regForm.newPassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            regForm: {
                name:'',
                phoneNum:'',
                username:"",
                verifyNum:'',
                sex:'0',
                email:"",
                newPassword:"",
                checkPassword:"",
                loginType:''
            },
            rules: {
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                loginType: [{ required: true, message: "请选择身份", trigger: "blur" }],
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                verifyNum: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                newPassword: [{ required: true, message: "请输入密码", trigger: "blur" },{ validator: validatePass, trigger: "blur" }],
                checkPassword: [{ required: true, message: "请再次输入密码", trigger: "blur" },{ validator: validatePass2, trigger: "blur" }],
                phoneNum:[{ required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: checkMobile, trigger: "blur" }],
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: 'blur' }],
            },
            btnContent: '获取验证码', //获取验证码按钮内文字
            time: 0, //发送验证码间隔时间
            disabled: false, //按钮状态
            btnColor: true
        }
    },
    created () {

    },
    methods: {
        // 获取验证码
        sendSmsCode () {
            this.time = 60
            this.btnColor = false
            this.timer()
            // 获取验证码请求
            const phoneParams={phoneNum: this.regForm.phoneNum}
            registerMss(phoneParams).then(res => {
                let {msg, code} = res;
                if (code === 200) {
                    this.$message.success(msg)
                } else if (code === 400) {
                    this.$message.error(msg);
                }
            });
        },
        timer () {
            if (this.time > 0) {
                this.time--
                this.btnContent = this.time + 's后重新获取'
                this.disabled = true
                var timer = setTimeout(this.timer, 1000)
            } else if (this.time == 0) {
                this.btnContent = '获取验证码'
                clearTimeout(timer)
                this.disabled = false
                this.btnColor = true
            }
        },
        // 注册
        verificationCode () {
            this.$refs.regForm.validate((valid) => {
                if (valid) {
                    const regParams = this.regForm
                    console.log(regParams)
                     requireRegister(regParams).then(res => {
                        let {msg, code} = res
                        if (code !== 200) {
                            this.$message.error(msg);
                        } else {
                            this.$message.success(msg)
                            this.$router.push("/login");
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.iden {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.reg-container {
    border-radius: 15px;
    margin-left:auto;
    margin-right: auto;
    margin-top: 0px;
    width: 350px;
    padding: 0px 35px 8px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px #cac6c6;
    opacity: 0.9;
}
.back-link {
    position: relative;
    left: 190px;
    color: #505458;
    font-size: 13px;
}
</style>
