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

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return  http({
    url:'home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return http({
    url: '/home/goods'
  })
}