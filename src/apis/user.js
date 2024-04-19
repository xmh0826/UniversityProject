// 封装所有与用户相关的接口函数
import http from '@/utils/http'


export const loginAPI = ({account,password}) => {
  return http({
    url:'/login',
    method:'POST',
    data:{
      account,
      password
    }
  })
}