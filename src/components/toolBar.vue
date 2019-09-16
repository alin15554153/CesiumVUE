<template>
  <div class="btn-toolbar" style="position: absolute; left: 0px; top: 0px;">
    <div id='toolbar' class='toolbar' style='margin: 5px 5px 5px 8px;'>
      <a id='layerMangerBtn' title='图层列表' class='btn'> <span class='iconfont icon-shu' ></span></a>
      <a class='btn'><span style='border-left : 1px solid #dddddd;  padding: 0px 1px;   display:block;    height:40px;' ></span></a>
      <a id='expandBtn' style='display : none;' title='展开' class='btn'  @click="onExpandBtnClk()"><span class='iconfont icon-angle-right'></span></a>
      <div id='btnGroup' class='btn-group'>

        <a title='切换底图' class='btn' @click="onBaseLayerBtnClk('first')">
          <el-dropdown trigger="hover" placement="bottom">
            <span class='iconfont icon-lujing' ></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='卫星影像' class='btn' @click="onBaseLayerBtnClk('first')">
                <span class='iconfont icon-ditu1'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='电子地图' class='btn' @click="onBaseLayerBtnClk('second')">
                <span class='iconfont icon-ditu4'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='地形' class='btn' @click="onBaseLayerBtnClk('third')">
                <span class='iconfont icon-dixingshuju'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <a title='添加模型' class='btn'><span class='iconfont icon-shiliangzhinengduixiang' @click="onModel3dBtnClk"></span></a>
        <a title='添加矢量' class='btn'>
          <el-dropdown trigger="hover" placement="bottom">
            <span class='iconfont icon-shiliang'></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='点' class='btn'><span class='iconfont icon-dian'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='线' class='btn'><span class='iconfont icon-icon-line-graph'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='面' class='btn'><span class='iconfont icon-mian'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <a title='定位导航' class='btn' @click="onDlgPathNavBtnClk('first')">
          <el-dropdown trigger="hover" placement="bottom">
            <span class='iconfont icon-paperplane-fill'></span>
            <el-dropdown-menu>
              <el-dropdown-item><a   title='特定场景' class='btn' @click="onDlgPathNavBtnClk('first')"><span class='iconfont icon-sheying'></span></a></el-dropdown-item>
              <el-dropdown-item><a   title='飞行路线' class='btn' @click="onDlgPathNavBtnClk('second')"><span class='iconfont icon-sheyingji'></span></a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <measurBarGroup></measurBarGroup>

        <a title='分屏对比' class='btn' @click="onSplitScreen"><span class='iconfont icon-fenpingduibi'></span></a>
        <a title='特效' class='btn' @click="openMask()"><span class='iconfont icon-texiao'></span></a>
        <a title='系统设置' class='btn' @click="openMask()"><span class='iconfont icon-icon_shezhi'></span></a>
        <a title='初始位置' class='btn' @click="setView(108.4,23.5, 800000)"><span class='iconfont icon-zhuye'></span></a>
        <a class='btn'><span style='border-left : 1px solid #dddddd;  padding: 0px 1px;   display:block;    height:40px;' ></span></a>
        <a id='foldBtn' title='折叠' class='btn' @click="onFoldBtnClk()"><span class='iconfont icon-angle-left'></span></a>
      </div>
    </div>
  </div>
</template>

<script>
import measurBarGroup from './toolBarMeasur'
export default {
  components: { measurBarGroup: measurBarGroup },
  name: 'toolBar',
  data () {
    return {
      visible: false,
      dlgPathNavShow: false

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
    //显示加载模型对话框
    onModel3dBtnClk(){
      this.$parent.$data.isShowModel3d = true//显示路径面板
    },
    //显示路径导航对话框
    onDlgPathNavBtnClk (name) {
      this.$parent.$data.isShowPathNav = true//显示路径面板
      this.$store.commit('setdlgPathNavPageName',name)
    },
    //显示分屏
    onSplitScreen(event){
      if(event.path[0].tagName==='SPAN'){
        if ( event.path[0].className =="iconfont icon-fenpingduibi"){
          event.path[0].className="iconfont icon-t02";//切换图标
          this.$parent.$refs.cesiumContainer.setAttribute('style','width:50%;height:100%') //将原的容器宽度变成50%
          this.$parent.$data.isShowSplitScreen = true//显示分屏2这两种都可以
          // this.$emit('on-open','isShowSplitScreen')//显示分屏2
        }else {
          event.path[0].className="iconfont icon-fenpingduibi"
          this.$parent.$refs.cesiumContainer.setAttribute('style','width:100%;height:100%') //将原的容器宽度变成100%
          this.$parent.$data.isShowSplitScreen = false//关闭分屏2

        }
      }
    },
    onBaseLayerBtnClk (name) {
      debugger
      this.$store.commit('setBaseLayerGroupPageName',name)
      this.$parent.$data.isShowBaseLayer = true//显示底图面板
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

  /*--------toolbar start*/
  /*整个按钮组*/
  .btn-toolbar{
    z-index: 1;
  }


  .btn-toolbar .toolbar .btn-group{
    position : relative;
    display : inline-block;
    vertical-align : middle;
  }
  .btn-toolbar .btn{
    color : #2ec5ad;
    background-color: rgba(38, 38, 38, 0.75);
    display : inline-block;
    text-align : center;
    white-space : nowrap;
    cursor : pointer;
    vertical-align : middle;
    transition : border .25s linear,color .25s linear,background-color .25s linear;
    -webkit-font-smoothing : subpixel-antialiased;
    -webkit-transition : border .25s linear,color .25s linear,background-color .25s linear;
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
.btn-toolbar .el-dropdown:hover,
.btn-toolbar .el-dropdown:focus,
.btn:hover,
.btn:focus{
    color: #409EFF;
    background : #2c3e50;
    outline: 1px;
  }
  /*--------toolbar end*/
</style>
