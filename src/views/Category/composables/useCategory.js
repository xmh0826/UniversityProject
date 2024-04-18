// 封装分类数据业务相关代码
import { getCategoryAPI} from '@/apis/category'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export const useCategory = () => {
  // 获取数据
const categoryList = ref({})
const route = useRoute()
const getCategoryData = async (id = route.params.id) => {
  const res = await getCategoryAPI(id)
  categoryList.value = res.result
}

onMounted(() => {
  getCategoryData()
})

// 目标：路由参数变化的时候 可以把分类数据接口重新发送 
// to:表示即将要进入的目标路由对象
onBeforeRouteUpdate((to) => {
  getCategoryData(to.params.id)
})

return {
  categoryList
}
}


