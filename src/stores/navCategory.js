import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('counter', () => {
// 导航列表的数据管理
//  state 导航列表数据
  const categoryList = ref([])
  //  action 获取导航数据的方法
  const getCategoryData = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return {
    categoryList,
    getCategoryData
  }
})
