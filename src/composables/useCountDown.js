// 封装倒计时逻辑函数

import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  // 1、响应式数据
  let timer = null
  const time = ref(0)
  // 格式化时间为 xx分xx秒
  const formatTime = computed(() => 
      dayjs.unix(time.value).format('mm分ss秒')
   )
  // 2、开启倒计时函数
  const state = (currentTime) => {
    // 开始倒计时的逻辑
    // 每隔1s 就减一
    // 定时器函数   (可能出现内存溢出)
    formatTime.value = currentTime
    setInterval(() => {
      timer = formatTime.value--
    },1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    state
  }
}