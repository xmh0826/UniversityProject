import { defineStore }  from 'pinia'
import { loginAPI } from '@/apis/user';
import { ref } from 'vue';

// 管理用户数据相关
export const useUserStore = defineStore('user',() => {
  // 1、定义管理用户数据 state
  const userInfo = ref({})
  // 2、定义获取接口数据的action函数
  const getUserInfo = async (data) => {
    const res = await loginAPI(data)
    userInfo.value = res.result
  }
  // 3、以对象的形式 把 state 和 action return
  return {
    userInfo,
    getUserInfo
  }
})