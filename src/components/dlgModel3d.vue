<template>
  <el-tabs id='dlgModel3d' v-model="activeaTapName" @tab-click="onTabHandleClick">
    <el-tab-pane label="公用数据" name="first">
      <el-container >
        <div class="modelDiv" v-for="(dataServer,dataServerIndex) in dataServerPub">
          <img :src="dataServer.image"
               class="modelImg"

               alt="">
          <p class="pictext">{{dataServer.name}}</p>
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
            <el-button  type="text" title="添加"  icon="el-icon-plus" @click="onModelAdd"></el-button>
            <el-button  type="text" title="删除" icon="el-icon-delete-solid" @click="onModelDel"></el-button>
            <el-button  type="text" title="移动" icon="el-icon-rank" @click="onModelMove"></el-button>
            <el-button  type="text" title="旋转" icon="el-icon-refresh-right" @click="onModelRotate"></el-button>
            <el-divider direction="vertical"></el-divider>

            <el-button  type="text" title="添加分组"  icon="el-icon-folder" @click="onModelGroupAdd"></el-button>
            <el-button  type="text" title="删除分组"  icon="el-icon-delete-solid" @click="onModelGroupDel"></el-button>
            <el-button  type="text" title="编辑分组"  icon="el-icon-edit-outline" @click="onModelGroupEdit"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button  type="text" title="缩略图显示"  icon="el-icon-menu" @click="onViewType"></el-button>
          </el-row>
        </el-header>
        <el-main>
          <!--accordion-->
          <el-collapse v-model="modelGroupName" >
            <el-collapse-item  v-for="(modelGroup,modeGroupIndex) in modelLibraryPub"
                               :title="modelGroup.modelGroupName"
                              :name="modelGroup.modelGroupName">
              <div class="modelDiv" v-for="(model,modelIndex) in modelGroup.modelGroup">
                <img
                    :src="model.image"
                    :ref="`modelGroup${modeGroupIndex}`+`model${modelIndex}`"
                    class="modelImg"
                    alt=""
                    @click="onModelImgSel(modeGroupIndex,modelIndex)">
                <p class="pictext">{{model.name}}</p>
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
        activeModelIndex:-1,
        lastModelImgDom: undefined,
        dataServerPub:[],
        modelLibraryPub:[],
        selectElement: '',
        activeaTapName: 'three',
        modelGroupName: [],
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
    mounted () {
      this.initImg()
    },

    methods: {
      initImg(){
        /**初始化图片数组*/
        var temp = require('../assets/dataServerPub').dataServerPub
        var copy = JSON.parse(JSON.stringify(temp)) //深copy
        for (let i = 0; i < copy.length; i++) {
          copy[i].image = require(`../${copy[i].image}`)
        }
        this.dataServerPub = copy

        var temp2 = require('../assets/dataServerPub').modelLibraryPub
        var copy2 = JSON.parse(JSON.stringify(temp2)) //深copy
        for (let i = 0; i < temp2.length; i++) {
          let modelgroup =  copy2[i].modelGroup
          this.modelGroupName.push( copy2[i].modelGroupName)
          for (let j=0;j<modelgroup.length;j++){
            let model =  copy2[i].modelGroup[j]
            model.image = require(`../${ model.image}`)
          }
        }
        this.modelLibraryPub =  copy2
      },
      /** 切换tab */
      onTabHandleClick (tab, event) {
        // paneName
        console.log(tab, event)
      },
      onModelGroupAdd () {
        alert('请完成添加分组方法')
      },
      onModelGroupDel(){
        alert('请完成删除分组方法')
      },
      onModelGroupEdit(){
        alert('请完善编辑分组方法')
      },
      onModelAdd(){
        alert('请完成添加方法')
      },
      onModelDel(){
        alert('请完善删除方法')
      },

      onModelMove(){
        alert('请完善此编辑方法')
      },
      onModelRotate(){

      },
      /**点击模型图片*/
      async onModelImgSel (modelGroupIndex,modelIndex) {
        this.activeModelIndex = modelIndex
        await new Promise(resolve => setTimeout(resolve, 200))
        let modelImgDom = this.$refs[`modelGroup${modelGroupIndex}`+`model${modelIndex}`][0]
        /**把上次选中并且不是这次选中的取消高亮*/
        if (this.lastModelImgDom !== undefined && this.lastModelImgDom !== modelImgDom) {
          this.lastModelImgDom.setAttribute('class', 'modelImg')
        }
        modelImgDom.className = modelImgDom.className === 'modelImg' ? 'modelImgSel' : 'modelImg'
        this.lastModelImgDom = modelImgDom
      },
      onViewType(event){
        console.log(event)
        if ( event.path[0].className ==="el-icon-s-unfold"){
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
  #dlgModel3d .modelDiv{
    float: left;
    margin: 10px 0px 0px 10px;
  }

  #dlgModel3d .modelDiv .modelImg{
    width: 88px;
    height: 88px;
    border:2px solid #2EC5AD;
  }
  #dlgModel3d .modelDiv .modelImgSel {
    width: 88px;
    height: 88px;
    border: 4px solid #409EFF;
  }

  #dlgModel3d .modelDiv .modelImg:hover{
    border:2px solid #409EFF;
  }
  #dlgModel3d .pictext{
    text-align:center;
    color: #2EC5AD;
  }






</style>

