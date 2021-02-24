import axios from 'axios'
import qs from 'qs'
// import Vue from 'vue'
// 配置请求的根路劲
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(obj) {
  if(obj.method === 'post') obj.data = qs.stringify(obj.data);
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // baseURL: '/api', //解决跨域
      baseURL: 'http://119.29.68.100/public/',
      timeuot: 5000
    })
    instance.interceptors.request.use(config => {
      // console.log(config)
      NProgress.start()
      config.headers.Authorization = sessionStorage.getItem('token')
      return config
    })
    instance.interceptors.response.use(config => {
      NProgress.done()
      return config
    })
    instance(obj).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}