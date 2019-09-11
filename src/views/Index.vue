<template>
  <div>
    <div id="cesiumContainer"></div>
    <toolBar @on-open="openDialog"></toolBar>

    <dialogCom v-show ='isShowPathNav' @on-close="closeDialog('isShowPathNav')">
      <dlgPathNav></dlgPathNav>
    </dialogCom>

    <dialogCom v-show ='isShowbaseLayer' @on-close="closeDialog('isShowbaseLayer')">
      <dlgBaseLayer></dlgBaseLayer>
    </dialogCom>



    <div style="top:100px;left:10px;   width: 300px;height: 200px;background-color: rgb(250,244,255);position: absolute;z-index: 3">
      <p>父组件data里绑定：</p>
      <input type="text" v-model="testParentData"/>{{testParentData}}
      <p>computed后：{{testParentcom}}</p>
      <br>
      子组件传回的值：{{CtoPData}}
    </div>
    <testChild :PtoCData="testParentData" @CtoPData="sendSonData"></testChild>
  </div>
</template>

<script>
import toolBar from '../components/toolBar'
import dlgBaseLayer from '../components/dlgBaseLayer'
import dlgPathNav from '../components/dlgPathNav'
import dialogCom from '../components/dialogCom'
import Vue from 'vue'
import testChild from '../components/test_child'
export default {
  components: {
    toolBar,
    dialogCom,
    dlgBaseLayer,
    dlgPathNav,
    testChild
  },
  name: 'Index',
  data () {
    return {
      isShowbaseLayer: false,
      isShowPathNav: false,
      dlgPathNavPage:1,
      testParentData: '父组件21数据123',
      PtoCData: '传给子组件',
      CtoPData: '等待接收'
    }
  },
  computed: {// 此处写入计算属性的方法
    testParentcom () {
      return this.testParentData.replace(/\d/g, ' ')
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
  },
  methods: {
    sendSonData (data) {
      this.CtoPData = data
    },
    init () {
      debugger
      let viewerOption = {
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        // baseLayerPicker: false, // 底图切换控件
        animation: false // 控制场景动画的播放速度控件
      }
      let viewer = new Cesium.Viewer(this.$el, viewerOption)
      viewer._cesiumWidget._creditContainer.style.display = 'none'// 隐藏版权
      Vue.prototype.viewer = viewer
    },
    closeDialog (attr) {
      this[attr] = false
    },
    openDialog (attr) {
      this[attr] = true
    }
  }
}
</script>

<style lang='scss' scoped>
  #cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: -1;
  }
</style>
