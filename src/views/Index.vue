<template>
  <div id='index' style="width: 100%;height: 100%">
    <div ref="cesiumContainer" id="cesiumContainer"></div>
    <!--    <div ref="cesiumContainer2" id="cesiumContainer2" ></div>-->
    <toolBar @on-open="openDialog"></toolBar>

    <dialogCom v-show='isShowLayer' @on-close="closeDialog('isShowLayer')" style="top:55px;left: 10px">
      <dlgLayer></dlgLayer>
    </dialogCom>

    <dialogCom v-show='isShowBaseLayer' @on-close="closeDialog('isShowBaseLayer')" style="top:100px;left: 100px">
      <dlgBaseLayer></dlgBaseLayer>
    </dialogCom>

    <dialogCom v-show='isShowModel3d' @on-close="closeDialog('isShowModel3d')" style="top:150px;left: 200px">
      <dlgModel3d></dlgModel3d>
    </dialogCom>

    <dialogCom v-show='isShowPoint' @on-close="closeDialog('isShowPoint')" style="top:50px;left: 30px">
      <dlgPoint></dlgPoint>
    </dialogCom>

    <dialogCom v-show='isShowLine' @on-close="closeDialog('isShowLine')" style="top:250px;left: 400px">
      <dlgLine></dlgLine>
    </dialogCom>

    <dialogCom v-show='isShowPloygon' @on-close="closeDialog('isShowPloygon')" style="top:300px;left: 500px">
      <dlgPloygon></dlgPloygon>
    </dialogCom>

    <dialogCom v-show='isShowPathNav' @on-close="closeDialog('isShowPathNav')" style="top:350px;left: 600px">
      <dlgPathNav></dlgPathNav>
    </dialogCom>

    <dialogCom v-show='isShowEffects' @on-close="closeDialog('isShowEffects')" style="top:400px;left: 600px">
      <dlgEffects></dlgEffects>
    </dialogCom>

    <dlgSplitScreen v-if="isShowSplitScreen"></dlgSplitScreen>

    <div style="width: 300px;height: 30px;right: 200px;top: 10px; position: absolute;z-index: 4;background-color: #ebeef5;font-size: 20px">{{camPos}}</div>
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
  import dlgLine from '../components/dlgLine'
  import dlgPloygon from '../components/dlgPloygon'
  import dlgPathNav from '../components/dlgPathNav'
  import dlgSplitScreen from '../components/dlgSplitScreen'
  import dlgEffects from '../components/dlgEffects'
  import testChild from '../components/test_child'
  import ToolManager from '../js/tools/toolManager'
  import CesiumNavigation from 'cesium-navigation-es6'

  export default {
    components: {
      toolBar,
      dialogCom,
      dlgLayer,
      dlgBaseLayer,
      dlgModel3d,
      dlgPoint,
      dlgPloygon,
      dlgLine,
      dlgPathNav,

      dlgSplitScreen,
      dlgEffects,
      testChild
    },
    name: 'Index',
    data () {
      return {
        isShowLayer: false,
        isShowBaseLayer: false,
        isShowModel3d: false,
        isShowPoint: true,
        isShowLine: false,
        isShowPloygon: false,
        isShowPathNav: false,
        isShowEffects: false,

        isShowSplitScreen: false,
        testParentData: '父组件21数据123',
        PtoCData: '传给子组件',
        CtoPData: '等待接收',
        viewer1: null,
        worldPosition: null,
        viewer1Listener: false,
        camPos: '0,0,0'
      }
    },
    computed: {// 此处写入计算属性的方法
      testParentcom () {
        return this.testParentData.replace(/\d/g, ' ')
      },

    },
    watch: {},
    mounted () {
      this.initViewer1()
    },
    beforeDestroy () {
    },
    methods: {
      sendSonData (data) {
        this.CtoPData = data
      },

      initViewer1 () {
        let osm = Cesium.createOpenStreetMapImageryProvider({
          url : 'https://a.tile.openstreetmap.org/'
        });
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
          imageryProvider:osm,
          contextOptions: {
            webgl: {
              alpha: true,
              depth: true,
              stencil: true,
              antialias: true,
              premultipliedAlpha: true,
              //通过canvas.toDataURL()实现截图需要将该项设置为true
              preserveDrawingBuffer: true,
              failIfMajorPerformanceCaveat: true
            }
          }
        }
        let viewer = new Cesium.Viewer('cesiumContainer', viewerOption)
        viewer._cesiumWidget._creditContainer.style.display = 'none'// 隐藏版权
        viewer.camera.percentageChanged = 0.01
        viewer.scene.screenSpaceCameraController.enableRotate = true
        viewer.scene.screenSpaceCameraController.enableTranslate = true
        viewer.scene.screenSpaceCameraController.enableZoom = true
        viewer.scene.screenSpaceCameraController.enableTilt = true
        viewer.scene.screenSpaceCameraController.enableLook = true

        Vue.prototype.viewer = viewer
        Vue.prototype.viewer.ToolManager = new ToolManager(viewer)

        /*var options = {};
        options.defaultResetView = Cesium.Rectangle.fromDegrees(73, 3, 135, 53);
        // Only the compass will show on the map
        options.enableCompass= true;
        options.enableZoomControls= true;
        options.enableDistanceLegend= true;
        options.enableCompassOuterRing= true;
        viewer.extend(viewerCesiumNavigationMixin, options);*/

        let options = {}
        options.defaultResetView = Cesium.Rectangle.fromDegrees(73, 3, 135, 53)
        options.enableCompass = true
        options.enableZoomControls = true
        options.enableDistanceLegend = true
        options.enableCompassOuterRing = true
        CesiumNavigation(viewer, options)

        viewer.scene.globe.depthTestAgainstTerrain = true
        viewer.scene.globe.undergroundModel = true
        /* _mViewer.scene.screenSpaceCameraController.minimumZoomDistance=-500;*/
        viewer.scene.globe.showUndergroundGrid = true
        viewer.scene.screenSpaceCameraController.enableCollisionDetection = true

        this.viewer.camera.changed.addEventListener(this.cameraChanged)
        let _drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
        _drawHandler.setInputAction(function (event) {
          that.viewer1Listener = true
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

      },
      cameraChanged () {

        let worldPosition
        let viewCenter = new Cesium.Cartesian2(Math.floor(this.viewer.canvas.clientWidth / 2), Math.floor(this.viewer.canvas.clientHeight / 2))
        var newWorldPosition = this.viewer.scene.camera.pickEllipsoid(viewCenter)

        if (newWorldPosition !== undefined) {
          worldPosition = newWorldPosition

          var cartographic = Cesium.Cartographic.fromCartesian(worldPosition);

          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
          var heightString = this.viewer.camera.positionCartographic.height.toFixed(1);

          this.camPos = "X:" +longitudeString + "Y:" +latitudeString  + " H: " + heightString
          let distance = Cesium.Cartesian3.distance(worldPosition, this.viewer.scene.camera.positionWC)

          let heading = this.viewer.scene.camera.heading
          let pitch = this.viewer.scene.camera.pitch
          let orientation = new Cesium.HeadingPitchRange(heading, pitch, distance)

          if (this.viewer2 !== undefined && this.viewer1Listener) {
            this.viewer2.scene.camera.lookAt(worldPosition, orientation)
            this.viewer2.scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
          }

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
