// 通过插件的方式 把 components 中的所有组件都进行全局注册
import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app){
    // 全局注册方法 app.component('组件名称',组件配置对象)
    app.component('ImageView',ImageView)
    app.component('XtxSku',XtxSku)
  }
}