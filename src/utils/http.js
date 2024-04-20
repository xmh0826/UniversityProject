// axios 的基础封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/user";
import router from "@/router";

const http = axios.create({
  // 基地址
  baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout:5000
})

// 拦截器 (axios 官方文档)
// axios请求拦截器
http.interceptors.request.use(config => {
  // 1、 从 pinia 中 获取token数据
  const userStore = useUserStore()
  // 2、按照后端要求拼接token数据
  const token = userStore.userInfo.token
  if(token) config.headers.Authorization = `Bearer ${token}`
 
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, err => {

  //  401 token 失效处理
    const userStore = useUserStore()
  // 1、清除本地用户数据
  // 2、跳转至登录页
  if(err.response.status === 401){
    userStore.clearUserInfo()
    router.replace({path:'/login'})
  }

  // 统一错误提示
  ElMessage({
    type:'error',
    message:err.response.data.message
  })
  return Promise.reject(err)
})

export default http
