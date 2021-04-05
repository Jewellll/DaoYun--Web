import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 共享状态（即变量）
    state: {

    },
    // 更改vuex的store中状态的唯一方法 - 同步操作
    mutations: {
        login (state, token) {
            state.token = token
            window.localStorage.setItem('token', token)
        }
    },
    Action:{

    }
})
