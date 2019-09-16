<template>
  <el-tabs id='dlgModel3d' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="公用数据" name="first">
      <el-container>
        <div class="picdiv">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
          <p class="pictext">倾斜数据1</p>
        </div>
        <div class="picdiv">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
          <p class="pictext">手工数据</p>
        </div>
        <div class="picdiv">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
          <p class="pictext">倾斜数据3</p>
        </div>
      </el-container>
    </el-tab-pane>

    <el-tab-pane label="服务" name="second">

        <el-input placeholder="请输入路径地址" v-model="tileUrl">
          <template slot="prepend">Http://</template>
          <el-button slot="append">确认</el-button>
        </el-input>

    </el-tab-pane>
    <el-tab-pane label="模型库" name="three">
      <el-container>
        <el-header height = '40px'>
          <el-row>
            <el-button  type="text" title="添加分组"  icon="el-icon-folder" @click="addGroup"></el-button>
            <el-button  type="text" title="删除分组"  icon="el-icon-delete-solid" @click="delGroup"></el-button>
            <el-button  type="text" title="编辑分组"  icon="el-icon-edit-outline" @click="editGroup"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button  type="text" title="添加"  icon="el-icon-plus" @click="addView"></el-button>
            <el-button  type="text" title="删除" icon="el-icon-delete-solid" @click="delView"></el-button>
            <el-button  type="text" title="修改" icon="el-icon-edit" @click="editView"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button  type="text" title="缩略图显示"  icon="el-icon-menu" @click="ViewType"></el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-collapse v-model="activeName2" accordion>
            <el-collapse-item title="公共库-人物" name="1">
              <div class="picdiv">
                <img src="../assets/images/model/baoan.jpg" alt="">
                <p class="pictext">保安</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/polic.jpg" alt="">
                <p class="pictext">警察</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/worker.jpg" alt="">
                <p class="pictext">工作人员</p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="公共库-车辆" name="2">
              <div class="picdiv">
                <img src="../assets/images/model/car1.jpg" alt="">
                <p class="pictext">家用车</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/car2.jpg" alt="">
                <p class="pictext">救护车</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/car3.jpg" alt="">
                <p class="pictext">警车</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/car4.png" alt="">
                <p class="pictext">消防车</p>
              </div>
            </el-collapse-item>

            <el-collapse-item title="公共库-安全" name="3">
              <div class="picdiv">
                <img src="../assets/images/model/cam1.jpg" alt="">
                <p class="pictext">监控1</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/cam2.jpg" alt="">
                <p class="pictext">监控2</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/build.jpg" alt="">
                <p class="pictext">岗亭</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/fire.jpg" alt="">
                <p class="pictext">消防栓</p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="公共库-树" name="4">
              <div class="picdiv">
                <img src="../assets/images/model/tree1.png" alt="">
                <p class="pictext">树1</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/tree2.png" alt="">
                <p class="pictext">树2</p>
              </div>
              <div class="picdiv">
                <img src="../assets/images/model/tree3.png" alt="">
                <p class="pictext">树3</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>


<script>
  export default {
    data () {
      return {
        selectElement: '',
        activeName: 'three',
        activeName2: '1',
        src:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        tileUrl:''
      }
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
      addView(){
        alert('请完成添加方法')
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
        console.log(event)
        if ( event.path[0].className =="el-icon-s-unfold"){
          event.path[0].className="el-icon-menu"
        }else {
          event.path[0].className="el-icon-s-unfold"
        }

        alert('请完其它')
      }
    }
  }

</script>

<style>
  .picdiv{
    float: left;
    margin: 10px 0px 0px 10px;
  }

  .picdiv img{
    width: 88px;
    height: 88px;
    border:2px solid #2EC5AD;
  }
  .picdiv img:hover{
    border:2px solid #409EFF;

  }
  .pictext{
    text-align:center;
    color: #2EC5AD;
  }
  .pictext:hover{
    color: #409EFF;
  }


/**服务里input*/
  #dlgModel3d .el-input-group__append, #dlgModel3d .el-input-group__prepend {
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
  #dlgModel3d .el-input__inner {
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

/**卷栏头*/
  #dlgModel3d .el-collapse-item__header {
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
/**卷栏内容*/
  #dlgModel3d .el-collapse-item__wrap {
    will-change: height;
    background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #2ec5ad;
  }

/*tab组头*/
  #dlgModel3d .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
  /*tab组*/
  #dlgModel3d .el-tabs__item {
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
  #dlgModel3d .el-tabs__item:hover {
    color: #409EFF;
    cursor: pointer;
  }
  /*tab组当前*/
  #dlgModel3d .el-tabs__item.is-active {
    color: #409EFF;
  }
  /*tab组内容*/
  #dlgModel3d .el-tabs__content {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  /*tab组面板*/
  #dlgModel3d .el-tab-pane {
    height: 100%;
    background-color: rgba(38, 38, 38, 0.7);
  }
  /*tab下的容器*/

  /*容器头*/
  #dlgModel3d .el-header {
    padding: 2px 5px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
  /*容器头里的button*/
  #dlgModel3d .el-button {
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

  /*容器头里的button*/
  #dlgModel3d .el-button:hover{
    color: #e5e1e1;
    background : #2c3e50;
  }
  /*容器头里的button*/
  #dlgModel3d .el-button i{
    padding: 8px 6px;
  }

  /*容器主体*/
  #dlgModel3d .el-main {
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



</style>

