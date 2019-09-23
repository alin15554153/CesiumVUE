<template>
  <div id = 'index' style="width: 100%;height: 100%">
    <div ref="cesiumContainer" id="cesiumContainer" ></div>
<!--    <div ref="cesiumContainer2" id="cesiumContainer2" ></div>-->
    <toolBar @on-open="openDialog"></toolBar>

    <dialogCom v-show ='isShowLayer' @on-close="closeDialog('isShowLayer')" style="top:55px;left: 10px">
      <dlgLayer></dlgLayer>
    </dialogCom>

    <dialogCom v-show ='isShowBaseLayer' @on-close="closeDialog('isShowBaseLayer')" style="top:150px;left: 400px">
      <dlgBaseLayer></dlgBaseLayer>
    </dialogCom>

    <dialogCom v-show ='isShowModel3d' @on-close="closeDialog('isShowModel3d')" style="top:200px;left: 500px">
      <dlgModel3d></dlgModel3d>
    </dialogCom>

    <dialogCom v-show ='isShowPoint' @on-close="closeDialog('isShowPoint')" style="top:250px;left: 600px">
      <dlgPoint></dlgPoint>
    </dialogCom>

    <dialogCom v-show ='isShowPathNav' @on-close="closeDialog('isShowPathNav')" style="top:300px;left: 700px">
      <dlgPathNav></dlgPathNav>
    </dialogCom>


    <dlgSplitScreen v-if = "isShowSplitScreen"></dlgSplitScreen>


<!--    <div style="top:100px;left:10px;   width: 300px;height: 200px;background-color: rgb(250,244,255);position: absolute;z-index: 3">-->
<!--      <router-link to="/dialogModel3d">dialogModel3d</router-link>-->
<!--      <p>父组件data里绑定：</p>-->
<!--      <input type="text" v-model="testParentData"/>{{testParentData}}-->
<!--      <p>computed后：{{testParentcom}}</p>-->
<!--      <br>-->
<!--      子组件传回的值：{{CtoPData}}-->
<!--    </div>-->
<!--    <testChild :PtoCData="testParentData" @CtoPData="sendSonData"></testChild>-->
  </div>
</template>

<script>
import Vue from 'vue'
import toolBar from '../components/toolBar'
import dialogCom from '../components/dialogCom'
import dlgLayer from '../components/dlgLayer'
import dlgBaseLayer from '../components/dlgBaseLayer'
import dlgModel3d from '../components/dlgModel3d'
import dlgPoint from '../components/dlgPoint'
import dlgPathNav from '../components/dlgPathNav'
import dlgSplitScreen from '../components/dlgSplitScreen'
import testChild from '../components/test_child'

export default {
  components: {
    toolBar,
    dialogCom,
    dlgLayer,
    dlgBaseLayer,
    dlgModel3d,
    dlgPoint,
    dlgPathNav,

    dlgSplitScreen,
    testChild
  },
  name: 'Index',
  data () {
    return {
      isShowLayer: true,
      isShowBaseLayer: false,
      isShowModel3d:true,
      isShowPoint:true,
      isShowPathNav: false,

      isShowSplitScreen:false,
      testParentData: '父组件21数据123',
      PtoCData: '传给子组件',
      CtoPData: '等待接收',
      viewer1:null,
      worldPosition:null,
      viewer1Listener:false,
    }
  },
  computed: {// 此处写入计算属性的方法
    testParentcom () {
      return this.testParentData.replace(/\d/g, ' ')
    },

  },
  watch:{

  },
  mounted () {
    this.initViewer1();
  },
  beforeDestroy () {
  },
  methods: {
    sendSonData (data) {
      this.CtoPData = data
    },

    initViewer1 () {
      let that = this
      let viewerOption = {
        selectionIndicator: false,
        shadows: false,
        shouldAnimate: true,
        animation: false,  //是否显示动画控件
        baseLayerPicker: true, //是否显示图层选择控件
        geocoder: true, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: true, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: false,  //是否显示点击要素之后显示的信息
        contextOptions:{
          webgl:{
            alpha: true,
            depth:true,
            stencil:true,
            antialias:true,
            premultipliedAlpha:true,
            //通过canvas.toDataURL()实现截图需要将该项设置为true
            preserveDrawingBuffer:true,
            failIfMajorPerformanceCaveat:true
          }
        }
      }
      let viewer = new Cesium.Viewer('cesiumContainer', viewerOption)
      viewer._cesiumWidget._creditContainer.style.display = 'none'// 隐藏版权
      viewer.camera.percentageChanged = 0.01;
      viewer.scene.screenSpaceCameraController.enableRotate = true;
      viewer.scene.screenSpaceCameraController.enableTranslate = true;
      viewer.scene.screenSpaceCameraController.enableZoom = true;
      viewer.scene.screenSpaceCameraController.enableTilt = true;
      viewer.scene.screenSpaceCameraController.enableLook = true;

      Vue.prototype.viewer = viewer





      this.viewer.camera.changed.addEventListener(this.sync2DView);
      let _drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      _drawHandler.setInputAction(function (event) {
        that.viewer1Listener =true;
      },Cesium.ScreenSpaceEventType.MOUSE_MOVE );


    },
    sync2DView(){
      if(this.viewer1Listener == true){
        let worldPosition;
        let viewCenter = new Cesium.Cartesian2(Math.floor(this.viewer.canvas.clientWidth / 2), Math.floor(this.viewer.canvas.clientHeight / 2));
        var newWorldPosition = this.viewer.scene.camera.pickEllipsoid(viewCenter);
        if (newWorldPosition!==undefined){
          worldPosition = newWorldPosition;
          let distance = Cesium.Cartesian3.distance(worldPosition, this.viewer.scene.camera.positionWC);
          let heading = this.viewer.scene.camera.heading;
          let pitch = this.viewer.scene.camera.pitch;
          let orientation = new Cesium.HeadingPitchRange(heading, pitch, distance)

          if(this.viewer2!==undefined){
            this.viewer2.scene.camera.lookAt(worldPosition, orientation);
            this.viewer2.scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
          }

        }
      }else {
        // console.log("1失去控制")
      }
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

<style>
  #cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    float: left;
    padding: 0;
    overflow: hidden;
    z-index: -1;
  }
  #cesiumContainer2 {
    width: 50%;
    height: 100%;
    margin: 0;
    float: left;
    padding: 0;
    overflow: hidden;
    z-index: -1;
    /*display: none;*/
  }

</style>
