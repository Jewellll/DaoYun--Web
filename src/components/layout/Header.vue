<template>
    <div class="header">
        <div class="logo">到云</div>
        <div class="user">
            <div class="username">
                你好，{{ username }}！
            </div>
            <div class="user-img">
                <img src="../../assets/img/11.jpg"/>
            </div>
            <el-col :span="12">
                <el-dropdown>
                <span class="el-dropdown-link">
                <i class="el-icon-user-solid"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            username: ''
        }
    },
    methods: {
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user');
                _this.$router.push('/login');
            }).catch(() => {

            });

        },
    },
        mounted() {
            console.log("22")
            var user = localStorage.getItem('user');
            if (user) {
                console.log("11")
                user = JSON.parse(user);
                this.username = user.username || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
}
</script>
<style scoped>
.header {
    margin: 0px;
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #5882FA;
    font-size: 30px;
    color: #fff;
}

.logo {
    float: left;
    width: 157px;
    text-align: center;
    line-height: 70px;
    background-color: #81BEF7;
    height: 60px;
}

.user {
    float: right;
    display: flex;
    height: 60px;
    width: 200px;
    align-items: center;
}

.username {
    color: #fff;
    font-size: 14px;
    white-space: nowrap;          /*在同一行显示*/
}

.user-img img {
    display: block;
    width: 40px;
    height: 40px;
    padding-right: 2px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #505458;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
