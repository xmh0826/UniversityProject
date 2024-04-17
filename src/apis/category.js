import http from "@/utils/http";

export const getCategoryAPI = (id) => {
  return http({
    url:'/category',
    param:{
      id
    }
  })
}