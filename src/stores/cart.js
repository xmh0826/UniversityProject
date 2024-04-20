// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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
    console.log(goods)
    if(item){
      // 购物车有此商品
      item.count += goods.count
    }else {
      // 未添加过购物车
      cartList.value.push(goods)
    }
  }
  // delCart
  const delCart = (skuId) => {
    // 思路： 方法1、找到要删除项的下标值 - splice方法
    const delIndex = cartList.value.findIndex((item) => item.skuId === skuId)
    cartList.value.splice(delIndex,1)
    //       方法2、 使用数组的过滤方法 - filter
  }

  // 计算属性
  // 1、总数量 所有count之和
  const allCount =  computed(() => {
    return cartList.value.reduce((accumulation,currentValue) => accumulation + currentValue.count,0)
  })
  // 2、总价 所有项的count * price 之和
  const totalPrice =  computed(() => {
    return cartList.value.reduce((accumulation,currentValue) => accumulation + currentValue.count * currentValue.price,0)
  })

  // 单选功能
  const singleCheck = (goods) => {
    goods.selected = !goods.selected
  }

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    totalPrice,
    singleCheck
  }
},{
  persist:true   //保存至本地 （需安装pinia数据持久化插件）
})