const mixin = {
  data () {
    return {
      handler: undefined
    }
  },
  created () {
    console.log('在mixin中vue的data、生命周期、方法等都可以使用')
  },
  mounted () {

  },
  compiled () {

  },
  methods: {
    handlerInit (callBack) {
      let that = this
      this.handlerDestroy()
      if (this.handler === undefined) {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
        this.handler.setInputAction(function (event) {
          var wp = event.position
          if (!Cesium.defined(wp)) {
            return
          }
          var ray = that.viewer.camera.getPickRay(wp)
          if (!Cesium.defined(ray)) {
            return
          }
          var cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene)
          if (!Cesium.defined(cartesian)) {
            return
          }

          let pickedFeature = that.viewer.scene.pick(wp)
          console.log(pickedFeature)
          if (pickedFeature !== undefined) {
            callBack(cartesian, pickedFeature)
          } else {
            callBack(cartesian)
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }
    },
    handlerDestroy () {
      if (this.handler !== undefined) {
        this.handler.destroy()
        this.handler = undefined
      }
    },

    clearNoNum (value) {
      // 只能输入数字和小数点的文本框, 只能输入小数点后两位
      value =value.replace(/[^\d.-]/g, '')  // 清除“数字”和“.”,“-”以外的字符
      value =value.replace(/^\./g, '')  // 验证第一个字符不是.
      value =value.replace(/\.{2,}/g, '.') // 当存在连续的多个“.”时，只保留一个
      value =value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 只保留第一个“.”，清除多余的“.”
      value =value.replace(/\-{2,}/g, '-') // 当存在连续的多个“-”时，只保留一个
      value =value.replace('-', '$#$').replace(/\-/g, '').replace('$#$', '-') // 只保留第一个“-”，清除多余的“-”
      if (!(/^\-/.test(value))) { // 如果行首不是“-”，则不允许有“-”
        value =value.replace('-', '')
      }
      // 只能输入小数点后两位
      value =value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      return value
    },
  }
}
export default mixin
