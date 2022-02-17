import axios from 'axios'
import Element from "element-ui"
import router from './router'
import store from './store'

axios.defaults.baseURL='http://8.136.82.47:8001'

axios.interceptors.request.use(config => {
    // 可以统一设置请求头
    return config
})

axios.interceptors.response.use(response => {
    const res = response.data;
    // 当结果的code是否为200的情况
    if (res.code === 20000) {
        return response
    } else {
        // 弹窗异常信息
        Element.Message({
            message: response.data.message,
            type: 'error',
            duration: 3 * 1000
        })
        if(res.code === 401) {
            store.commit('REMOVE_INFO')
            router.push('/login')
        }
    // 直接拒绝往下面返回结果信息
        return Promise.reject(response.data.message)
    }
  },
)
