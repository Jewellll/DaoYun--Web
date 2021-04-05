import axios from 'axios'
import router from '../router/index'


axios.defaults.timeout = 5000; // 超时时间
// axios.defaults.baseURL = 'http://localhost:8443/api'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.Authorization = localStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 999) {
            this.$router.push({path: '/login'}).then(r =>{});
            console.log("token过期");
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;

