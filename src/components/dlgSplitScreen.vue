<template>
  <div id="cesiumContainer2"></div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'dialogSplitScreen',
    props: {//第二种方式
      viewer1Listener: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    data(){
      return{
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        let that = this
        let viewerOption = {
          geocoder: false, // 地理位置查询定位控件
          homeButton: false, // 默认相机位置控件
          timeline: false, // 时间滚动条控件
          navigationHelpButton: false, // 默认的相机控制提示控件
          fullscreenButton: false, // 全屏控件
          scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
          baseLayerPicker: false, // 底图切换控件
          animation: false // 控制场景动画的播放速度控件
        }
        let viewer = new Cesium.Viewer('cesiumContainer2', viewerOption)
        viewer._cesiumWidget._creditContainer.style.display = 'none'// 隐藏版权
        viewer.scene.screenSpaceCameraController.enableRotate = true;
        viewer.scene.screenSpaceCameraController.enableTranslate = true;
        viewer.scene.screenSpaceCameraController.enableZoom = true;
        viewer.scene.screenSpaceCameraController.enableTilt = true;
        viewer.scene.screenSpaceCameraController.enableLook = true;
        viewer.camera.percentageChanged = 0.01;//事件灵敏度

        Vue.prototype.viewer2 = viewer
        this.viewer2.camera.changed.addEventListener(this.sync2DView);
        let _drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        _drawHandler.setInputAction(function (event) {
          that.$parent.$data.viewer1Listener = false;
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);


      },
      sync2DView() {
        if (this.$parent.$data.viewer1Listener !== true) {
          let worldPosition;
          let viewCenter = new Cesium.Cartesian2(Math.floor(this.viewer2.canvas.clientWidth / 2), Math.floor(this.viewer2.canvas.clientHeight / 2));
          let newWorldPosition = this.viewer2.scene.camera.pickEllipsoid(viewCenter);
          if (newWorldPosition!==undefined) {
            worldPosition = newWorldPosition;
            let distance = Cesium.Cartesian3.distance(worldPosition, this.viewer2.scene.camera.positionWC);
            var heading = this.viewer2.scene.camera.heading;
            var pitch = this.viewer2.scene.camera.pitch;
            var orientation = new Cesium.HeadingPitchRange(heading, pitch, distance)

            if (this.viewer !== undefined) {
              this.viewer.scene.camera.lookAt(worldPosition, orientation);
              this.viewer.scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            }
          }

        }else {
          // console.log("2失去控制")
        }
      },

    },
    computed:{
      isviewer1Listener() {
        return this.$parent.$data.viewer1Listener;
      }
    },
    watch: {
      isviewer1Listener:function() {
        if (this.$parent.$data.viewer1Listener==true){
          // alert('2-')
          // this.viewer2.camera.changed.removeEventListener(this.sync2DView);
        }else {
          // alert('2+')
          // this.viewer2.camera.changed.addEventListener(this.sync2DView);
        }
      }
    },
  }
</script>

<style>
  #cesiumContainer2 {
    width: 50%;
    height: 100%;
    float: left;
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: 1;
  }

</style>
