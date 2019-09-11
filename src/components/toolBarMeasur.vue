<template>
  <a   title='量测' class='btn btn-inverse'>
    <el-dropdown trigger="hover" placement="bottom">
      <span class='iconfont icon-toolbar-measure'></span>
      <el-dropdown-menu>
        <el-dropdown-item><a   title='坐标' class='btn btn-inverse' @click="measurePoint"><span class='el-icon-map-location'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='水平距离' class='btn btn-inverse'><span class='iconfont icon-measure_length'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='垂直距离' class='btn btn-inverse'><span class='iconfont icon-measure_height'></span></a></el-dropdown-item>
        <el-dropdown-item><a   title='面积' class='btn btn-inverse'><span class='iconfont icon-measure_area'></span></a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </a>
</template>

<script>
  import   Cesium from 'cesium/Cesium'
  export default {
    name: 'toolBarMeasur',
    methods:{
      measurePoint(){
        let viewer = this.viewer;

        let _drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

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
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },
    }
  }
</script>



<style scoped>
  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #2ec5ad;
    font-size: 20px;
  }
  .el-dropdown-menu {
    position: absolute;
    top: 12px;
    left: 63px;
    padding: 0px 0;
    margin: 0px 0;
    background-color: rgba(0,0,0,0);
    border: 0px solid #EBEEF5;
    border-radius: 0px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 0px;
    margin: 0;
    font-size: 20px;
    color: #606266;
    cursor: pointer;
    outline: 0;
  }
  .el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    display: none;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #EBEEF5;
  }

  /*--------toolbar start*/



  a {
    color: #3f8eb9;
    text-decoration: none;
  }

  .btn-toolbar{
    margin-left: -5px;
    z-index: 1;
  }
  .btn-group{
    position : relative;
    display : inline-block;
    vertical-align : middle;
  }
  .btn-toolbar>.btn-group{
    margin-left : 5px;
  }
  .btn-toolbar .btn,.btn-toolbar .toolbar,.btn-toolbar .input-group{
    float : left;
  }
  .btn{
    display : inline-block;
    margin-bottom : 0;
    text-align : center;
    white-space : nowrap;
    touch-action : manipulation;
    cursor : pointer;
    -webkit-user-select : none;
    background-image : none;
    padding : 10px 12px;
    font-size : 20px;
    font-weight : 400;
    line-height : 1.4;
    border : none;
    vertical-align : middle;
    transition : border .25s linear,color .25s linear,background-color .25s linear;
    -webkit-font-smoothing : subpixel-antialiased;
    -webkit-transition : border .25s linear,color .25s linear,background-color .25s linear;
  }
  .btn:active{
    box-shadow : none;
  }
  .btn:hover,.btn:focus{
    color: #e5e1e1;
    outline: 1px;
    border-color: #c0baba;
  }
  .btn-inverse {
    color : #2ec5ad;
    background-color: rgba(38, 38, 38, 0.75);
  }
  .btn-inverse:hover,.btn-inverse.hover,.btn-inverse:active,.btn-inverse.active,.btn-inverse.focus,.open>dropdown-toggle.btn-inverse{
    background : #2c3e50;
    color : #fff;
  }
  .btn-group>.btn{
    font-weight : 400;
  }
  .btn-group>.btn:first-child{
    margin-left : 0;
  }
  .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){
    border-top-right-radius : 0;
    border-bottom-right-radius : 0;
  }
  .btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .btn-toolbar .btn>[class^=fui-]{
    margin: 0 1px;
    font-size : 20px;
  }
  .btn [class^=fui-]{
    position : relative;
    top : 1px;
    margin: 0 1px;
    line-height : 1;
  }
  .btn [class^="smicon-"] {
    position: relative;
    top: 1px;
    margin: 0 1px;
    line-height: 1;
  }
  .btn-xs.btn [class^="smicon-"] {
    top: 0;
    font-size: 20px;
  }
  .btn-hg.btn [class^="smicon-"] {
    top: 2px;
  }
  .btn-toolbar .btn > [class^="smicon-"] {
    margin: 0 1px;
    font-size: 20px;
  }
  .btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){
    border-radius : 0;
  }
  .btn-group>.btn:last-child:not(:first-child), .btn-group>.dropdown-toggle:not(:first-child){
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .btn-group>.btn+.btn{
    margin-left : 0;
  }
  .btn-group-vertical>.btn, .btn-group>.btn{
    position: relative;
    float: left;
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /*--------toolbar end*/
</style>
