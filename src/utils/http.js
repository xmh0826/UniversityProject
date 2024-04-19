// axios 的基础封装
import axios from "axios";
import { ElMessage } from 'element-plus'

const http = axios.create({
  // 基地址
  baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout:5000
})

// 拦截器 (axios 官方文档)
// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, err => {
  // 统一错误提示
  ElMessage({
    type:'error',
    message:err.response.data.message
  })
  return Promise.reject(err)
})

export default http
