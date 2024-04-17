import http from '@/utils/http'

export const getBannerAPI = ()=> {
  return http({
    url:'/home/banner'
  })
} 

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getFindNewAPI = () => {
  return http({
    url:'/home/new'
  })
}