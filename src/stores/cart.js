// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { findNewCartListAPI,postInsertCartAPI,deleteCartGoodsAPI } from "@/apis/cart";

export const useCartStore = defineStore('cart',() => {
  const userStore = useUserStore()

  // 1、 定义state - cartList
  const cartList = ref([])

  // 获取最新购物车列表 action
  const updateNewList = async () => {
         const res = await findNewCartListAPI()
     cartList.value = res.result
  }

  // 判断是否登录
  const isLogin = computed(() => userStore.userInfo.token)
  
  // 2、 定义action - addCart
  const addCart = async (goods) => {
    const {skuId,count} = goods
    if(isLogin.value){
      // 登录之后加入购物车逻辑
     await postInsertCartAPI({skuId,count})
     updateNewList()
    } else {
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
    }
    
  // delCart
  const delCart = async (skuId) => {
    if(isLogin.value) {
      await deleteCartGoodsAPI([skuId])
      updateNewList()
    } else {
          // 思路： 方法1、找到要删除项的下标值 - splice方法
          const delIndex = cartList.value.findIndex((item) => item.skuId === skuId)
          cartList.value.splice(delIndex,1)
    //       方法2、 使用数组的过滤方法 - filter
    }
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
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

  // 是否全选
  const isAll = computed(() => {
    return cartList.value.every((item) => item.selected)
  })

  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach((item) =>item.selected = selected)
  }

  // 选中数
  const selectedCount = computed(() => {
    return cartList.value.filter((item) => item.selected).reduce((accumulation,currentValue) => accumulation + currentValue.count,0)
  })
  // 选中数总价
  const selectedPrice = computed(() => {
    return cartList.value.filter((item) => item.selected).reduce((accumulation,currentValue) => accumulation + currentValue.count * currentValue.price,0)
  })

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    totalPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
},{
  persist:true   //保存至本地 （需安装pinia数据持久化插件）
})