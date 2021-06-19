import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 共享状态（即变量）
    state: {
         token:'',
         user:{},
         dicCode:'',
         addDicCode:'',
         isCollapse: true,

    },
    // 更改vuex的store中状态的唯一方法 - 同步操作
    mutations: {
        setUser (state, user) {
            state.user = user
            window.localStorage.setItem('user', JSON.stringify(user))
        },
        setToken (state,token) {
            state.token = token
            window.localStorage.setItem('token', token)
        },
        setDiction(state,data){
            state.dicCode = data
        },
        addDiction(state,data){
            state.addDicCode = data
        },
        setCollapse(state,data){
            state.isCollapse=data
        }
    },
    //异步操作
    Action:{

    }
})
