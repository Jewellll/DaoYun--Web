<template>
    <div class="header">
        <div class="logo">
            到云</div>
        <div class="user">
            <div class="username">
                你好，{{ userInfo.username }}！
            </div>
            <div class="user-img">
                <img :src="this.userInfo.avatar"/>
            </div>
            <el-col :span="12">
                <el-dropdown>
                <span class="el-dropdown-link">
                <i class="el-icon-user" style="color: white"></i>
                <i class="el-icon-arrow-down el-icon--right" style="color: white"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" @click.native="view = true">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </div>
        <!--        展示个人信息-->
        <el-drawer
            :visible.sync="view"
            :direction="direction"
            :before-close="handleClose"
            style="color: #333333">
            <div class="info-container">
                <div slot="header" class="clearfix">
                    <span>个人中心</span>
                </div>
                <div class="name-role">
                    <el-avatar :size="90" src="" @error="errorHandler">
                        <img :src="this.userInfo.avatar"/>
                    </el-avatar>
                    <span class="sender">姓名： {{ userInfo.name }}</span>
                    <span class="sender">身份：  {{ this.loginType }}</span>
                </div>
                <el-divider></el-divider>
                <div class="Info">
                    <span class="sender">用户名： {{ userInfo.username }}</span>
                    <span class="sender">性别：  {{ this.sex }}</span>
                    <span class="sender">手机号： {{ userInfo.telphone }}</span>
                    <span class="sender">邮箱： {{ userInfo.email }}</span>
                </div>
            </div>
            <el-button style="width: 50%;margin-top: 100px" @click.native="edit = true" type="primary">修改信息</el-button>
        </el-drawer>
        <!--        编辑个人信息-->
        <el-drawer
            title="修改信息"
            :visible.sync="edit"
            :direction="direction"
            :before-close="handleClose">
            <el-form :model="userForm" :rules="rules" label-width="80px" ref="userForm">
                <div class="item_bock head_p">
                    <div class="head_img">
                        <img :src="userForm.avatar"/>
                    </div>
                    <div class="setting_right" @click.stop="uploadHeadImg">
                        <div class="caption">更改头像</div>
                    </div>
                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                </div>
                <el-form-item label="姓名" prop="name">
                    <el-col :span="8">
                    <el-input v-model="userForm.name" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-col :span="8">
                    <el-input v-model="userForm.username" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-col :span="14">
                    <el-radio-group v-model="userForm.sex">
                        <el-radio class="radio" label=1>男</el-radio>
                        <el-radio class="radio" label=2>女</el-radio>
                    </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号" prop="telphone">
                    <el-col :span="14">
                    <el-input v-model="userForm.telphone" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-col :span="14">
                    <el-input v-model="userForm.email" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="newPassword">
                    <el-col :span="14">
                        <el-input v-model="userForm.newPassword" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-col :span="14">
                        <el-input v-model="userForm.checkPassword" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click.native="edit = false">返回</el-button>
                    <el-button type="primary" @click.native="editSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
import {editUserInfo} from '../../api/api'

export default {
    name: 'Header',
    data () {
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
            } else if (value !== this.userForm.newPassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            userInfo: {
                name: '',
                username:'',
                avatar: '',
                sex: -1,
                telphone: '',
                email: '',
                create_time: '',
                logintype: -1
            },
            userForm: {
                id:0,
                name: '',
                username:'',
                avatar: '',
                sex: -1,
                telphone: '',
                email: '',
                loginType: -1,
                newPassword:'',
                checkPassword:''
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                username: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                avatar: [
                    {required: true, message: '请上传头像', trigger: 'blur'}
                ],
                sex: [
                    {required: true, message: '请选择性别', trigger: 'blur'}
                ],
                newPassword: [{ validator: validatePass, trigger: "blur" }],
                checkPassword: [{ validator: validatePass2, trigger: "blur" }],
                telphone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'}
                ]
            },
            loginType:'',
            sex: '',
            edit: false,    //修改个人信息
            view: false,     //展示个人信息
            direction: 'rtl',
        }
    },
    methods: {
        logout: function () {
            var _this = this
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                _this.$router.push('/login')
            }).catch(() => {

            })
        },
        editSubmit: function () {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.logining = true
                    const editParams = {id:this.userInfo.id,avatar:'this.userForm.avatar',username: this.userForm.username, name:this.userForm.name,sex:this.userForm.sex,telphone:this.userForm.telphone,
                    email:this.userForm.email,newPassword:this.userForm.newPassword}
                    editUserInfo(editParams).then(data => {
                        this.logining = false
                        let {msg, code, user, token} = data
                        if (code !== 200) {
                            this.$message.error('修改失败')
                        } else {
                            this.$message.success('修改成功')
                            this.formatSex()
                            this.$store.commit('setUser', this.userForm);
                            this.edit=false
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        formatSex: function () {
            console.log(this.userInfo.sex)
            if (this.userInfo.sex == 1) {
                this.sex = '男'
            } else if (this.userInfo.sex == 2) {
                console.log('22')
                this.sex = '女'
            }  else if(this.userInfo.sex==0){
                this.sex = '未知'
            }
            console.log(this.sex)
        },
        formatLoginType: function () {
            if (this.userInfo.loginType == 1) {
                this.loginType = '教师'
            } else if (this.userInfo.loginType == 2) {
                this.loginType = '学生'
            } else {
                this.loginType = '管理员'
            }
        },
        handleClose (done) {
            done()
        },
        // 打开图片上传
        uploadHeadImg: function () {
            this.$el.querySelector('.hiddenInput').click()
        },
        errorHandler () {
            return true
        },
        // 将头像显示
        handleFile: function (e) {
            let $target = e.target
            let file = $target.files[0]
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target
                this.userForm.avatar = res.result
                // console.log(this.userForm.avatar)
                // this.userInfo.avatar=this.userForm.avatar
                // console.log(this.userInfo.avatar)
            }
            reader.readAsDataURL(file)
        }
    },
    mounted () {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            this.userInfo = user
            this.formatSex()
            this.formatLoginType()
            this.userForm = this.userInfo
            this.userForm.newPassword = this.userInfo.password
            this.userForm.checkPassword=this.userInfo.password
        }

    }
}
</script>
<style scoped>
.item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 94px;
    width: 300px;
    padding: 0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
}

.head_p {
    height: 132px;
}

.head_img {
    height: 90px;
}

.head_img img {
    width: 90px;
    height: 90px;
    border-radius: 50px
}

.setting_right {
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
}

.hiddenInput {
    display: none;
}

.caption {
    color: #8F8F8F;
    font-size: 26px;
    height: 37px;
}

.header {
    margin: 0px;
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #04315c;
    font-size: 30px;
    color: #fff;
}

.logo {
    float: left;
    width: 200px;
    text-align: center;
    line-height: 40px;
    background-color: #0a4b84;
    height: 40px;
}

.user {
    float: right;
    display: flex;
    height: 40px;
    width: 200px;
    align-items: center;
}

.username {
    color: #fff;
    font-size: 14px;
    white-space: nowrap; /*在同一行显示*/
}

.user-img img {
    display: block;
    width:30px;
    height: 30px;
    padding-right: 2px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #505458;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.name-role {
    font-size: 16px;
    margin-top: 20px;
    padding: 5px;
    text-align: center;
}

.name-role .sender {
    margin-top: 10px;
    text-align: center;
    display: block;
}

.personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
    width: 100%
}

.Info{
    font-size: 16px;
    margin-top: 20px;
    padding: 5px;
    text-align: center;
}
.Info .sender{
    margin-top: 10px;
    text-align: center;
    display: block;
}
</style>
