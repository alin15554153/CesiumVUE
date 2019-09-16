<template>
  <el-tabs id='dlgPathNav' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="特定场景" name="first">
      <el-container>
        <el-header height = '40px'>
          <el-row>
            <el-button  type="text" title="添加分组"  icon="el-icon-folder" @click="addGroup"></el-button>
            <el-button  type="text" title="删除分组"  icon="el-icon-delete-solid" @click="delGroup"></el-button>
            <el-button  type="text" title="编辑分组"  icon="el-icon-edit-outline" @click="editGroup"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button  type="text" title="添加"  icon="el-icon-plus" @click="addView"></el-button>
            <el-button  type="text" title="删除" icon="el-icon-delete-solid" @click="delView"></el-button>
            <el-button  type="text" title="替换" icon="el-icon-connection" @click="replaceView"></el-button>
            <el-button  type="text" title="修改" icon="el-icon-edit" @click="editView"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button  type="text" title="导出"  icon="el-icon-download" @click="savePoint"></el-button>
            <el-button  type="text" title="缩略图显示"  icon="el-icon-menu" @click="ViewType"></el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-collapse v-model="activeName2" accordion>

              <el-collapse-item v-bind:title = "item.groupName"   v-bind:name="index" v-for="(item,index) in camPointData" v-bind:key="item.id">
                <div class="picdiv" v-for="item2 in item.group">
                  <img v-bind:src="item2.imgSrc" alt="" @click="flyToPoint(item2.x,item2.y,item2.z,item2.heading,item2.pitch,item2.roll,item2.time)" />
                  <p class="pictext">{{item2.name}}</p>
                </div>
              </el-collapse-item>

          </el-collapse>
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="动画导航" name="second">
      <el-container>
        <el-header height = '40px'>
          <el-row>
            <el-button  type="text"  icon="el-icon-plus"></el-button>
            <el-button  type="text"  icon="el-icon-delete-solid"></el-button>
            <el-button  type="text"  icon="el-icon-edit" ></el-button>
          </el-row>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    data () {
      return {
        camPointData:{},
        selectElement: '',
        activeName: 'first',
        activeName2: '1',
        src:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    mounted () {
      let url =  require('../assets/pro2.json')
      this.camPointData = url.camPointArr
    },

    computed:{
      listensPage(){
        return this.$store.state.dlgPathNavPageName;
      }
    },
    watch: {
      listensPage: function() {
        this.activeName = this.$store.state.dlgPathNavPageName;
      }
    },
    methods: {
      getCamPos(){
        let position = this.viewer.scene.camera.positionWC;

        let cartographic= this.viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
        //将地图坐标（弧度）转为十进制的度数
        let lat_String=Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        let log_String=Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        let alt_String=(this.viewer.camera.positionCartographic.height/1000).toFixed(2);

        let heading = this.viewer.scene.camera.heading;
        let pitch = this.viewer.scene.camera.pitch;
        let roll = this.viewer.scene.camera.roll;
        return {x:log_String,y:lat_String,z:alt_String}
      },
      addView(){
          console.log(this.camPointData)
      },
      flyToPoint(lon, lat, height,heading, pitch,roll,duration){
        this.viewer.camera.flyTo({
          destination : Cesium.Cartesian3.fromDegrees(lon, lat, height),
          orientation : {
            heading : Cesium.Math.toRadians(heading),
            pitch : Cesium.Math.toRadians( pitch),
            roll : roll
          },
          duration:duration
        });
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
      },
      //保存相机点
      savePoint(){
        var FileSaver = require('file-saver');
        let data = {
          name:"hanmeimei",
          age:88
        }
        var content = JSON.stringify(data);
        var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "save.json");
      },
      /** 切换tab */
      handleClick (tab, event) {
        // paneName
        console.log(tab, event)
      },
      addGroup () {
        alert('请完成添加分组方法')
      },
      delGroup(){
        alert('请完成删除分组方法')
      },
      editGroup(){
        alert('请完善编辑分组方法')
      },

      delView(){
        alert('请完善删除方法')
      },
      replaceView(){
        alert('请完善替换方法')
      },
      editView(){
        alert('请完善此编辑方法')
      },
      ViewType(event){
        if(event.path[0].tagName==='I') {
          if (event.path[0].className == "el-icon-s-unfold") {
            event.path[0].className = "el-icon-menu"
          } else {
            event.path[0].className = "el-icon-s-unfold"
          }
        }
        // alert('请完其它Q')
      }
    }
  }

</script>

<style>


  #dlgPathNav .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }

  #dlgPathNav .el-tabs__item {
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

  #dlgPathNav .el-tabs__item:hover {
    color: #409EFF;
    cursor: pointer;
  }

  #dlgPathNav .el-tabs__item.is-active {
    color: #409EFF;
  }

  #dlgPathNav .el-tabs__content {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  #dlgPathNav .el-tab-pane {
    height: 100%;
    background-color: rgba(38, 38, 38, 0.7);
  }

  #dlgPathNav .el-header {
    padding: 2px 5px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  #dlgPathNav .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgba(255, 255, 255, 0);
    /*border: 1px solid #DCDFE6;*/
    color: #2ec5ad;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 0px 0px;
    font-size: 18px;
    border-radius: 4px;
  }


  #dlgPathNav .el-button:hover{
    color: #e5e1e1;
    background : #2c3e50;
  }
  #dlgPathNav .el-button i{
    padding: 8px 6px;
  }
  #dlgPathNav .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0px;
    height: 400px;
    width: 320px;
    background : rgba(255, 255, 255, 0);
  }

  #dlgPathNav .el-collapse-item__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 38px;
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
  #dlgPathNav .el-collapse-item__wrap {
    will-change: height;
    background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #2ec5ad;
  }

  #dlgPathNav .picdiv{
    float: left;
    margin: 10px 0px 0px 10px;
  }

  #dlgPathNav .picdiv img{
    width: 88px;
    height: 88px;
    border:2px solid #2EC5AD;
  }
  #dlgPathNav .picdiv img:hover{
    border:2px solid #409EFF;

  }
  #dlgPathNav .pictext{
    text-align:center;
    color: #2EC5AD;
  }
  #dlgPathNav .pictext:hover{
    color: #409EFF;
  }

</style>
