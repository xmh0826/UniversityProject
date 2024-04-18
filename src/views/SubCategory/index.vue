<script setup>
import {getCategoryFilterAPI,postSubCategoryAPI} from '@/apis/category'
import { onMounted, ref } from 'vue';
import {  useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue';


// 获取面包屑导航数据
const subCategoryList = ref({})
// 执行才能得到Route实例
const route = useRoute()
const getSubCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  subCategoryList.value = res.result
}

// 获取基础数据渲染
const goodsList = ref([])
const reqData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField:'publishTime'
})
const getGoodsData = async () => {
  // 接收返回
  const res = await postSubCategoryAPI(reqData.value)
  goodsList.value = res.result.items
}

// 加载更多
const disabled = ref(false)
const load = async () => {
  // 获取下一页数据
  reqData.value.page++ 
  const res = await postSubCategoryAPI(reqData.value)
  // 展开运算符拼接,先展开旧数据，后展开新数据
   goodsList.value = [...goodsList.value,...res.result.items]
  //  判断是否加载完毕 , 加载完毕则停止监听
  if(res.value.items.length === 0){
    disabled.value = true
  }

} 

// tab切换回调
const onTabChange = () => {
  // 初始化页数
  reqData.value.page = 1
  disabled.value = false
  getGoodsData()
}

onMounted(() => {
  getSubCategoryData(),
  getGoodsData()
})



</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryList.parentId}` }">{{ subCategoryList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 会自动将子组件中的name存储到父组件的v-model中 -->
      <el-tabs v-model="reqData.sortField" @tab-change="onTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
         <!-- 商品列表-->
         <GoodsItem v-for=" goods in goodsList" :goods="goods" :key="goods.id" :infinite-scroll-disabled="disabled"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>