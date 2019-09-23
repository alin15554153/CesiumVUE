<template>
  <a   title='量测' class='btn'>
    <el-dropdown trigger="hover" placement="bottom">
      <span class='iconfont icon-celiang'></span>
      <el-dropdown-menu>
        <el-dropdown-item><a   title='坐标' class='btn' @click="measurePoint"><span class='iconfont icon-coordinate'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='水平距离' class='btn' @click="measureHorizontalDis"><span class='iconfont icon-liangsuan'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='垂直距离' class='btn' @click="measureVerticalDis"><span class='iconfont icon-iEarth-R-_liangsuan-ce'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='面积' class='btn'  @click="measureArea"><span class='iconfont icon-mianji'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='清除' class='btn' @click="measureClear"><span class='iconfont icon-iEarth-R-_liangsuan-guan'></span></a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </a>
</template>

<script>
  import LineDynamicMaterial from '../js/materials/LineDynamicMaterial'
  import CircleDynamicMaterial from '../js/materials/CircleDynamicMaterial'
  export default {
    name: 'toolBarMeasur',
    methods:{
      measurePoint(){
        if (this.viewer){
          this.viewer.ToolManager.measurePoint(function () {
          });
        }

        /*let _drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

        _drawHandler.setInputAction(function (event) {
          var wp = event.position;
          if (!Cesium.defined(wp)) {
            return;
          }
          var ray = viewer.camera.getPickRay(wp);
          if (!Cesium.defined(ray)) {
            return;
          }
          var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          if (!Cesium.defined(cartesian)) {
            return;
          }
          alert(cartesian)
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);*/
      },
      measureHorizontalDis(){
        //线型动态纹理
        /*var entity2 = this.viewer.entities.add({
          name: 'LineDynamicMaterial',
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([128, 42, 2500,
              128 + 10, 42, 2500,
              128 + 10, 42 + 10, 2500, ]),
            width: 15,
            material: new Cesium.LineDynamicMaterial(Cesium.Color.ORANGE, 3000)
          }
        });
        var entity = this.viewer.entities.add({
          name: 'CircleDynamicMaterial',
          position: Cesium.Cartesian3.fromDegrees(128, 42, 3000),
          ellipse: {
            height:0,
            semiMinorAxis:150000,
            semiMajorAxis:150000,
            material: new Cesium.CircleDynamicMaterial(Cesium.Color.ORANGE, 3000),
            clampToGround: true,
          }
        });
        return;*/

        if (this.viewer){
          this.viewer.ToolManager.measureHorizontalDis(function () {
          });
        }
      },
      measureVerticalDis(){
        if (this.viewer){
          this.viewer.ToolManager.measureVerticalDis(function () {
          });
        }
      },
      measureArea(){
        if (this.viewer){
          this.viewer.ToolManager.measureArea(function () {
          });
        }
      },
      measureClear(){
        var _mCount = this.viewer.entities.values.length;
        for (var i= 0; i < this.viewer.entities.values.length; ++i){
          var _mEntity = this.viewer.entities.values[i];
          if (false == Cesium.defined(_mEntity) || false == Cesium.defined(_mEntity.layerId) || _mEntity.layerId != 'Measure') continue;
          this.viewer.entities.remove(_mEntity);
          i--;
        }
      }
    }
  }
</script>



<style>

  /*下拉按键*/
  .btn-toolbar .el-dropdown {
    display: inline-block;
    position: relative;
    color: #2ec5ad;
    font-size: 20px;
  }
  /*下拉组ul*/
  body .el-dropdown-menu {
    position: absolute;
    top: 0px;
    left: 84px;
    padding: 0px 0;
    margin: 0px 0;background-color: rgba(38, 38, 38, 0.75);
    border: 0px solid #EBEEF5;
    border-radius: 0px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  /*下拉组ul里li*/
  body .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 0px;
    margin: 0;
    font-size: 20px;
    color: #606266;
    cursor: pointer;
    outline: 0;
  }
  body .el-popper[x-placement^=bottom] {
    margin-top: 0px;
  }
  body .el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    display: none;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: rgba(235, 238, 245, 0);
  }



  /*下拉按键li里的a标签*/
  .el-dropdown-menu__item .btn{
    color : #2ec5ad;
    background-color: rgba(38, 38, 38, 0.75);
    display : inline-block;
    text-align : center;
    white-space : nowrap;
    cursor : pointer;
    horiz-align: center;
    vertical-align : middle;
    transition : border .25s linear,color .25s linear,background-color .25s linear;
    -webkit-font-smoothing : subpixel-antialiased;
    -webkit-transition : border .25s linear,color .25s linear,background-color .25s linear;
  }
  .iconfont{
    font-size: 20px;
    display:block;
    height: 40px;
    width: 40px;
    padding: 5px 10px;
  }

  .btn:hover,
  .btn:focus{
    color: #409EFF;
    background : #2c3e50;
    outline: 1px;
  }
  /*--------toolbar end*/
</style>
