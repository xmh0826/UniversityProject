// const { install } = require("element-plus");
import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
  install(app){
    // 懒加载指令逻辑
    app.directive('img-lazy',{
      mounted(el,binding){
        // el:指令绑定的那个DOM元素 img
        // binding：binding.value 指令等于号后门绑定的表达式的值 图片url
        console.log(el,binding)
        const { stop } = useIntersectionObserver(
           el,
           ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
           },
        )
      }
    })
  }
}