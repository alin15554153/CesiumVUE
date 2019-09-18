<template>
  <el-tabs id='dlgBaseLayer' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="公用服务" name="first">

        <el-collapse v-model="activeName2" accordion>
          <el-collapse-item v-bind:title = "item.groupName"   v-bind:name="index" v-for="(item,index) in doms" v-bind:key="item.id">
            <div class="picdiv" v-for="item2 in item.group">
              <img v-bind:src="require(`../${item2.image}`)" alt="" @click="changeImageryProvider(item2.providerName,item2.options)" />
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
      <el-collapse v-model="activeName2" accordion>
        <el-collapse-item v-bind:title = "item.groupName"   v-bind:name="index" v-for="(item,index) in dems" v-bind:key="item.id">
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
        activeName2: '1',
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
  /*tab组头*/
  #dlgBaseLayer .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
  /*tab组*/
  #dlgBaseLayer .el-tabs__item {
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
  /*tab组字鼠标*/
  #dlgBaseLayer .el-tabs__item:hover {
    color: #409EFF;
    cursor: pointer;
  }
  /*tab组当前*/
  #dlgBaseLayer .el-tabs__item.is-active {
    color: #409EFF;
  }
  /*tab组内容*/
  #dlgBaseLayer .el-tabs__content {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  /*tab组面板*/
  #dlgBaseLayer .el-tab-pane {
    /*height: 398px;*/
    width:320px;
    background-color: rgba(38, 38, 38, 0.7);
  }

  /**卷栏头*/
  #dlgBaseLayer .el-collapse-item__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 38px;
    width: 100%;
    line-height: 48px;
    background-color: rgba(239, 255, 244, 0);
    color: #2EC5AD;
    cursor: pointer;
    border-bottom: 2px solid #2ec5ad;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }
  /**卷栏内容*/
  #dlgBaseLayer .el-collapse-item__wrap {
    will-change: height;
    background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #2ec5ad;
  }

  /**服务里input*/
  #dlgBaseLayer .el-input-group__append,
  #dlgBaseLayer .el-input-group__prepend {
    background-color: rgba(245, 247, 250, 0);
    color: #2EC5AD;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid  #2EC5AD;
    border-radius: 0px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  #dlgBaseLayer .el-input__inner {
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0);
    background-image: none;
    border-radius: 0px;
    border: 1px solid #2EC5AD;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  #dlgBaseLayer .pictext{
    width:88px;
    word-break:break-all;
    word-wrap:break-word ;
  }
</style>
