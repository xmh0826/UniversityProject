// 封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart',() => {
  // 1、 定义state - cartList
  const cartList = ref([])
  // 2、 定义action - addCart
  const addCart = (goods) => {
    // 添加购物车操作
    // 已填加过 - count + newCount
    // 未添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId 能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => item.skuId === goods.skuId) //item 为单个商品
    if(item){
      // 购物车有此商品
      item.count += goods.count
    }else {
      // 未添加过购物车
      cartList.value.push(goods)
    }
  }

  return {
    cartList,
    addCart
  }
},{
  persist:true   //保存至本地 （需安装pinia数据持久化插件）
})