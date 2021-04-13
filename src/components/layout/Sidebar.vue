<template>
    <div class="sidebar">
        <el-aside width="auto">
            <transition name="el-zoom-in-center">
        <el-menu
            class="sidebar-el-menu"
            :collapse="isCollapse"
            :collapse-transition="true"
            background-color="#f5f5f5"
            text-color="#777"
            active-text-color="#ffd04b"
            unique-opened
            router
        >
            <el-menu-item  @click="isC">
                <i class="el-icon-s-fold" ></i>
            </el-menu-item>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
            </transition>
        </el-aside>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            isCollapse: true,
            items: [
                {
                    icon: 'el-icon-house',
                    index: 'manage',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'teacherManage',
                    title: '教师管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'studentManage',
                    title: '学生管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'test2',
                    title: '课程管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'userManage',
                    title: '用户管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'roleManage',
                    title: '角色管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'dictionary',
                    title: '数据字典管理'
                },

                {
                    icon: 'el-icon-tickets',
                    index: 'systemManage',
                    title: '系统参数管理'
                },
                {
                    icon: 'el-icon-files',
                    index: '3',
                    title: '异常管理',
                    subs: [
                        {
                            index: '500',
                            title: '500异常页面'
                        },
                        {
                            index: '404',
                            title: '404异常页面'
                        },
                        {
                            index: '403',
                            title: '403异常页面'
                        },
                        {
                            index: 'diyError',
                            title: '自定义异常页面'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        tohome() {
            return this.$route.path.replace('/manage', '');
        }
    },
    methods: {
        isC(){
            this.isCollapse = !this.isCollapse
        },
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
.sidebar-el-menu{
}
.sidebar {
    margin-top: 10px;
    text-align: left;
}

</style>
