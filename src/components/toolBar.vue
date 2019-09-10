<template>
  <div class="btn-toolbar" style="position: absolute; left: 0px; top: 0px;">
    <div id='toolbar' class='toolbar' style='margin: 5px 5px 5px 8px;'>
      <a data-toggle='dropdown' id='layerMangerBtn' title='图层列表' class='btn btn-inverse'> <span class='iconfont icon-toolbar_layer-list' ></span></a>
      <a class='btn btn-inverse' style='padding : 10px 0px;'><span style='border-left : 1px solid #dddddd;'></span></a>
      <a id='expandBtn' style='display : none;' title='展开' class='btn btn-inverse'  @click="onExpandBtnClk()"><span class='el-icon-arrow-right'></span></a>
      <div id='btnGroup' class='btn-group'>

        <a   title='切换底图' class='btn btn-inverse' @click="onBaseLayerBtnClk('first')">
          <el-dropdown trigger="hover" placement="bottom">
            <span class='el-icon-picture' ></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='卫星影像' class='btn btn-inverse' @click="onBaseLayerBtnClk('first')">
                <span class='el-icon-picture-outline-round'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='电子地图' class='btn btn-inverse' @click="onBaseLayerBtnClk('second')">
                <span class='el-icon-picture-outline'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='地形' class='btn btn-inverse' @click="onBaseLayerBtnClk('third')">
                <span class='iconfont icon-toolbar-terrain'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <a   title='添加模型' class='btn btn-inverse'><span class='el-icon-office-building'></span></a>
        <a   title='添加矢量' class='btn btn-inverse'>
          <el-dropdown trigger="hover" placement="bottom">
            <span class='el-icon-share'></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='点' class='btn btn-inverse'><span class='el-icon-place'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='线' class='btn btn-inverse'><span class='el-icon-star-off'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='面' class='btn btn-inverse'><span class='el-icon-star-on'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <a   title='定位导航' class='btn btn-inverse' @click="onPathNavigationBtnClk('first')">
          <el-dropdown trigger="hover" placement="bottom">
            <span class='el-icon-video-camera-solid'></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='特定场景' class='btn btn-inverse' @click="onPathNavigationBtnClk('first')"><span class='el-icon-camera-solid'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='飞行路线' class='btn btn-inverse' @click="onPathNavigationBtnClk('second')"><span class='el-icon-s-promotion'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <measurBarGroup></measurBarGroup>

        <a  title='分屏对比' class='btn btn-inverse' @click="openMask()"><span class='el-icon-menu'></span></a>
        <a  title='特效' class='btn btn-inverse' @click="openMask()"><span class='el-icon-magic-stick'></span></a>
        <a  title='系统设置' class='btn btn-inverse' @click="openMask()"><span class='el-icon-s-tools'></span></a>
        <a  title='初始位置' class='btn btn-inverse' @click="setView(108.4,23.5, 800000)"><span class='el-icon-location-information'></span></a>
        <a class='btn btn-inverse' style='padding : 10px 0px;'><span style='border-left : 1px solid #dddddd;'></span></a>
        <a id='foldBtn' title='折叠' class='btn btn-inverse' @click="onFoldBtnClk()"><span class='el-icon-arrow-left'></span></a>
      </div>
    </div>
  </div>
</template>

<script>
import measurBarGroup from './measurBarGroup'
export default {
  components: { measurBarGroup: measurBarGroup },
  name: 'toolBar',
  data () {
    return {
      visible: false,
      pathNavigationShow: false

    }
  },
  methods: {
    openMask () {
    },

    /** 工具栏收缩 */
    onFoldBtnClk (evt) {
      if (evt && evt.preventDefault) {
        evt.preventDefault()
      } else {
        window.event.returnValue = false
      }
      $('#btnGroup').hide()
      $('#expandBtn').show()
    },
    /** 工具栏展开 */
    onExpandBtnClk: function (evt) {
      if (evt && evt.preventDefault) {
        evt.preventDefault()
      } else {
        window.event.returnValue = false
      }
      $('#btnGroup').show()
      $('#expandBtn').hide()
    },

    onPathNavigationBtnClk (name) {
      this.$store.commit('setPathNavigationPageName',name)
      this.$emit('on-open','isPathNavigation')
    },

    onBaseLayerBtnClk (name) {
      this.$store.commit('setBaseLayerGroupPageName',name)
      this.$emit('on-open','isShowbaseLayerGroup')
    },
    setView (lon, lat, height) {
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height), // 设置位置
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // 方向
          pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
          roll: 0
        }
      })
    }
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
