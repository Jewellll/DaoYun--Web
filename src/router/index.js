import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
import Home from '@/components/Home'
import LoginHome from '../components/LoginHome'
import ForgetPassword from '../components/layout/ForgetPassword'
import Login from '../components/layout/Login'
import CheckPhone from '../components/page/CheckPhone'
import Register from '../components/layout/Register'

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
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'Index',
                    component: Index,
                    meta: {
                        requireAuth: true
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
        }
    ]
})
