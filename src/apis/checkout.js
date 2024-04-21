import http from "@/utils/http"

// 获取详情接口
export const getCheckInfoAPI =() => {
  return http({
    url:'/member/order/pre'
  })
}

// 提交订单信息
export const postMmemberOrderAPI = (data) => {
  return http({
    method:'POST',
    url:'/member/order',
    data
  })
}