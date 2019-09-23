<template>
  <el-tabs id='dlgBaseLayer' v-model="activeName" @tab-click="onTabHandleClick">
    <el-tab-pane label="公用服务" name="first">

        <el-collapse v-model="activeName2" accordion>
          <el-collapse-item title="影像地图" name="1">
            <div class="picdiv">
              <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" @click="showBingRoadMap" alt="">
              <p class="pictext">BingBingBingBingBingBingBing</p>
            </div>
            <div class="picdiv">
              <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
              <p class="pictext">Bing</p>
            </div>
            <div class="picdiv">
              <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
              <p class="pictext">Bing</p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="电子地图" name="2">
            <div class="picdiv">
              <img src="../assets/images/modelLibraryPub/car1.jpg" alt="">
              <p class="pictext">Bing</p>
            </div>
            <div class="picdiv">
              <img src="../assets/images/modelLibraryPub/car2.jpg" alt="">
              <p class="pictext">Bing</p>
            </div>
            <div class="picdiv">
              <img src="../assets/images/modelLibraryPub/car3.jpg" alt="">
              <p class="pictext">Bing</p>
            </div>

          </el-collapse-item>
        </el-collapse>

    </el-tab-pane>
    <el-tab-pane label="自定义服务" name="second">
      <el-input placeholder="请输入路径地址" v-model="tileUrl">
        <template slot="prepend">Http://</template>
        <el-button slot="append">确认</el-button>
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="地形" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>


<script>

  export default {
    name: 'dlgBaseLayer',

    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tileUrl:'',
        selectElement: '',
        activeName: 'first',
        activeName2: '1',
      }
    },

    computed:{
      listensPage(){
        return this.$store.state.baseLayerGroupPageName;
      }
    },
    watch: {
      listensPage: function() {
        this.activeName = this.$store.state.baseLayerGroupPageName;
      }
    },

    methods: {
      /** 切换tab */
      onTabHandleClick (tab, event) {
        console.log(tab, event)
      },
      /** 设置地图 */
      showBingRoadMap () {
        let viewer = this.viewer
        viewer.imageryLayers.removeAll()
        var shadedRelief1 = new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS',
          layer: 'USGSShadedReliefOnly',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'default028mm',
          // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
          maximumLevel: 19,
          credit: new Cesium.Credit('U. S. Geological Survey')
        })
        viewer.imageryLayers.addImageryProvider(shadedRelief1)
      },
    }
  }
</script>

<style type="less">


  #dlgBaseLayer .picdiv {
    float: left;
    margin: 10px 0px 0px 10px;
  }

  #dlgBaseLayer .picdiv img {
    width: 88px;
    height: 45px;
    border: 2px solid #2EC5AD;
  }

  #dlgBaseLayer .picdiv img:hover {
    border: 2px solid #409EFF;

  }


  #dlgBaseLayer .pictext{
    width:88px;
    text-align: center;
    color: #2EC5AD;
    word-break:break-all;
    word-wrap:break-word ;
  }

</style>
