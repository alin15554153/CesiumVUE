<template>
  <el-tabs id='dlgBaseLayer' v-model="activeName" @tab-click="onTabHandleClick">
    <el-tab-pane label="公用服务" name="first">

        <el-collapse v-model="activeCollapseNames" accordion>
          <el-collapse-item v-bind:title = "item.groupName"    v-for="(item,index) in doms" v-bind:key="item.id" name="1">
            <div class="picdiv" v-for="item2 in item.group">
              <img
                class="baseImg"
                v-bind:src="require(`../${item2.image}`)"
                alt=""
                @click="changeImageryProvider(item2.providerName,item2.options)" />
              <p class="pictext">{{item2.name}}</p>
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
    <el-tab-pane label="地形" name="third">
      <el-collapse v-model="activeCollapseNames" accordion>
        <el-collapse-item v-bind:title = "item.groupName"    v-for="(item,index) in dems" v-bind:key="item.id"  name="1">
          <div class="picdiv" v-for="item2 in item.group">
            <img v-bind:src="require(`../${item2.image}`)" alt="" @click="changeTerrainProvider(item2.providerName,item2.options)" />
            <p class="pictext">{{item2.name}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
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
        activeCollapseNames: ['1','2'],
        doms:[],
        dems:[]
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
    mounted () {
      let url =  require('../assets/doms.json');
      this.doms = url.doms;

      url =  require('../assets/dems.json');
      this.dems = url.dems;
      /*debugger
      var domlayer = $("#domLayer");
      if (domlayer == null) return;
      domlayer.html('');
      this.$data.doms.forEach(function(currentValue, index, arr){
        var _mItemli = "<div class='picdiv'>" +
          "<img src= '" + currentValue.image + "' @click='showBingRoadMap' alt=''>" +
          "<p class='pictext'>" + currentValue.name + "</p>" +
          "</div>";

        var _mElement= $(_mItemli);
        _mElement.data('data', currentValue);
        var _mui = domlayer.append(_mElement);
      });*/
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
      changeImageryProvider(providerName, options){
        let newoptions = {};
        for (var i in options){
          if (typeof(options[i]) == 'string'  && options[i].substring(0, 4) == 'new ')
            newoptions[i] = eval(options[i]);
          else
            newoptions[i] = options[i];
        }
        let _mProvider = eval('new ' + providerName + '(newoptions)');
        this.viewer.imageryLayers.removeAll();
        this.viewer.imageryLayers.addImageryProvider(_mProvider);
      },
      changeTerrainProvider(providerName, options){
        let newoptions = {};
        for (var i in options){
          if (typeof(options[i]) == 'string' && (options[i].substring(0, 4) == 'new ' || options[i].substring(0, 7) == 'Cesium.') )
            newoptions[i] = eval(options[i]);
          else
            newoptions[i] = options[i];
        }

        this.viewer.terrainProvider = eval('new ' + providerName + '(newoptions)');
      },
      loadByUrl(image){
        let name = 'assets/images/mapboxSatellite.png';
        return require(`../${image}`);
      }
    }
  }
</script>

<style type="less">

  /*tab组面板*/
  #dlgBaseLayer .el-tab-pane {
    /*height: 398px;*/
    width:320px;
    background-color: rgba(38, 38, 38, 0.7);
  }



  #dlgBaseLayer .picdiv {
    float: left;
    margin: 10px 0px 0px 10px;
  }

  #dlgBaseLayer .picdiv .baseImg {
    width: 88px;
    height: 88px;
    border: 2px solid #2EC5AD;
  }

  #dlgBaseLayer .picdiv .baseImg:hover {
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
