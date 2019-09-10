<template>
  <el-tabs id='baseLayerGroup' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="卫星影像" name="first">
      <div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="电子地图" name="second">
      <div>
        <el-button @click="showBingRoadMap">BingRoad</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="地形" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>


<script>

  export default {
    name: 'baseLayerGroup',

    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectElement: '',
        activeName: 'first'
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
      handleClick (tab, event) {
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

  #baseLayerGroup .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }

  #baseLayerGroup .el-tabs__item {
    padding: 0px 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 30px;
    display: inline-block;
    list-style: none;
    font-size: 16px;
    font-weight: 500;
    color: #2ec5ad;
    position: relative;
  }

  #baseLayerGroup .el-tabs__item:hover {
    color: #409EFF;
    cursor: pointer;
  }

  #baseLayerGroup .el-tabs__item.is-active {
    color: #409EFF;
  }

  #baseLayerGroup .el-tabs__content {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  #baseLayerGroup .el-tab-pane {
    height: 398px;
    background-color: rgba(38, 38, 38, 0.7);
  }
</style>
