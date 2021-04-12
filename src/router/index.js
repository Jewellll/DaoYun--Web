import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoginHome from '../components/LoginHome'
import ForgetPassword from '../components/layout/ForgetPassword'
import Login from '../components/layout/Login'
import CheckPhone from '../components/page/CheckPhone'
import Register from '../components/layout/Register'
import Manage from '../components/page/Manage'
import StudentManage from '../components/page/StudentManage'
import TeacherManage from '../components/page/TeacherManage'
import error from '../components/page/404'
import Dictionary from '../components/page/Dictionary'
import SystemManage from '../components/page/SystemManage'

Vue.use(Router)

export default new Router({
    mode: 'history', // 去除#路由，即hash
    routes: [
        {
            path: '/',
            name: 'Login',
            redirect: '/login'
        },
        {
            // home页面并不需要被访问，只是作为其它组件的父组件
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/manage',
            children: [
                {
                    path: '/manage',
                    name: 'Manage',
                    component: Manage,
                    meta: {
                        title:'系统首页',
                        hideclose:true,
                        requireAuth: true
                    }
                },
                {
                    path: '/studentmanage',
                    name: 'StudentManage',
                    component: StudentManage,
                    meta: {
                        title:'学生管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/teachermanage',
                    name: 'TeacherManage',
                    component: TeacherManage,
                    meta: {
                        title:'教师管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/dictionary',
                    name: 'Dictionary',
                    component: Dictionary,
                    meta: {
                        title:'数据字典',
                        requireAuth: true
                    }
                },
                {
                    path: '/systemManage',
                    name: 'SystemManage',
                    component: SystemManage,
                    meta: {
                        title:'系统参数管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/500',
                    name: '500',
                    component: () =>
                        import (  '../components/page/500.vue'),
                    meta:{
                        title:'服务异常'
                    }
                },
                {
                    path: '/403',
                    name: '403',
                    component: () =>
                        import (  '../components/page/403.vue'),
                    meta:{
                        title:'服务异常'
                    }
                },
                {
                    path: '/404',
                    name: '404',
                    component: error,
                    meta:{
                        title:'页面走丢了'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginHome,
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: '/forgetpassword',
                    name: 'ForgetPassword',
                    component: ForgetPassword
                },
                {
                    path: '/checkphone',
                    name: 'CheckPhone',
                    component: CheckPhone
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register
                }
            ]
        },
        {
            path: '*',
            name: '404',
            component: error,
            meta:{
                title:'页面走丢了'
            }
        }
    ]
})
