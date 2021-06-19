<template>
    <div>
        <el-form :model="checkForm" ref="checkForm" class="check-container" label-position="left"
                 label-width="0px" :rules="rules">
            <h3 class="check_title">验证手机</h3>
            <el-form-item prop="phoneNum">
                <el-input type="text" v-model="checkForm.phoneNum"
                          auto-complete="off" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="verifyNum">
                <div class="iden">
                    <el-input type="text" v-model="checkForm.verifyNum" style=""
                              auto-complete="off" @keyup.enter.native="verificationCode"
                              placeholder="请输入验证码"></el-input>
                    <el-button :style="{border: none,background:btnColor?'#2E9AFE':'#617079',color:'#FFF',width:'50%'}"
                               v-on:click="sendSmsCode"
                               class="verify-btn" v-model="btnContent"
                               v-bind="{'disabled':disabled}">
                        {{ btnContent }}
                    </el-button>
                </div>
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
import {requestCheck, requestMss, requireRegister} from '../../api/api'

export default {
    data () {
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
        return {
            checkForm:{
                phoneNum: '', //手机号
                verifyNum: '', //验证码
            },
            rules: {
                verifyNum: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                phoneNum:[{ required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: checkMobile, trigger: "blur" }],
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
            const phoneParams={phoneNum: this.checkForm.phoneNum}
            requestMss(phoneParams).then(res => {
                let {msg, code} = res;
                if (code === 200) {
                    this.$message(msg)
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
        // 验证验证码
        verificationCode () {
            this.$refs.checkForm.validate((valid) => {
                if (valid) {
                    const params = this.checkForm
                    requestCheck(params).then(res => {
                        let {msg, code} = res
                        if (code !== 200) {
                            this.$message.error(msg);
                        } else {
                            this.$message.success(msg)
                            this.$router.push("/forgetpassword");
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back(){
            this.$router.push( "/login");
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

.check-container {
    border-radius: 15px;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px #cac6c6;
    opacity: 0.9;
}
.back-link {
    position: relative;
    left: 180px;
    color: #505458;
    font-size: 13px;
}
</style>
