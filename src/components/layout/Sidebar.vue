<template>
    <div class="sidebar">
        <div class="menu">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2E9AFE"
                        text-color="#fff"
                        active-text-color="#FACC2E">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-setting"></i>
                            <span slot="title">教师管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">学生管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">课程管理</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-setting"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-setting"></i>
                            <span slot="title">角色管理</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-setting"></i>
                            <span slot="title">权限管理</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <i class="el-icon-reading"></i>
                            <span slot="title">数据字典</span>
                        </el-menu-item>
                    </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    methods: {
        handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style scoped>
.sidebar {
    border: none;
    top: 60px;
    height: 100vh;
    width: 199px;
    background-color: #2E9AFE;
}
.menu {
    padding-top: 10px;
    width: 200px;
}
</style>
