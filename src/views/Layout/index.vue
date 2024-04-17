<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发导航列表的action
import { useCategoryStore } from '@/stores/navCategory'
import { onMounted } from 'vue'

// 得到实例对象
const categoryStore = useCategoryStore()

// categoryStore.getCategoryData()
onMounted(() => {
  categoryStore.getCategoryData()
})
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <RouterView></RouterView>
  <LayoutFooter />
</template>