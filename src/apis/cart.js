// 封装购物车接口
import http from '@/utils/http'

// 加入购物车
export const postInsertCartAPI = ({skuId,count}) => {
  return http({
    url:'/member/cart',
    method:'POST',
    data:{
      skuId,
      count
    }
  })
} 

// 获取购物车列表
export const findNewCartListAPI = () => {
  return http({
    url:'/member/cart'
  })
}

// 删除购物车商品
export const deleteCartGoodsAPI = (ids) => {
  return http({
    method:'DELETE',
    url:'/member/cart',
    data:{
      ids
    }
  })
}