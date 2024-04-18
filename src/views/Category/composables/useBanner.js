// 封装Banner轮播图 相关的代码

import { getBannerAPI } from "@/apis/home"
import { onMounted, ref } from "vue"

export const useBanner = () => {
// 获取轮播图数据
const bannerList = ref([])
const getBannerData = async () => {
  const res = await getBannerAPI(2)
  bannerList.value = res.result
}

onMounted(() => {
  getBannerData()
})

// 把组件中需要使用的数据或方法 return 出去
// 解构
return {
  bannerList
}
}

