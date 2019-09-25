<template>
  <el-tabs id='dlgPathNav' v-model="activeTapName" @tab-click="onTabClick">
    <el-tab-pane label="特定场景" name="first">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button type="text" title="添加" icon="el-icon-plus" @click="onCamAddOpen"></el-button>
            <el-button type="text" title="删除当前场景" icon="el-icon-delete-solid" @click="onCamDel"></el-button>
            <el-button type="text" title="替换" icon="el-icon-connection" @click="onCamReplace"></el-button>
            <el-button type="text" title="修改当前" icon="el-icon-edit" @click="isShowDlgCamEdit = true"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" title="添加分组" icon="el-icon-folder-add" @click="onCamGroupAdd"></el-button>
            <el-button type="text" title="删除当前分组" icon="el-icon-folder-remove" @click="onCamGroupDel"></el-button>
            <el-button type="text" title="编辑当前分组" icon="el-icon-edit-outline" @click="onCamGroupEdit"></el-button>
            <el-divider direction="vertical"></el-divider>

            <el-button type="text" title="导出" icon="el-icon-download" @click="onCamDataArrSave"></el-button>
            <el-button type="text" title="读取" icon="el-icon-folder-opened" @click="isShowDlgCamLoad= true"></el-button>
            <el-divider direction="vertical"></el-divider>
            <!--            <el-button  type="text" title="缩略图显示"  icon="el-icon-menu" @click="ViewType"></el-button>-->
            <el-button type="text" title="播放" icon="el-icon-video-play" @click="onCamGroupPlay"></el-button>
            <el-button type="text" title="暂停" icon="el-icon-video-pause" @click="onCamGroupPlayPause"></el-button>
          </el-row>
        </el-header>
        <el-dialog :visible.sync="isShowDlgCamAdd" width=300px :append-to-body=true :destroy-on-close=true>
          <el-form :model="camInfo">
            <el-form-item label="特定场景名称" label-width="120">
              <el-input v-model="camInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="特定场景时间" label-width="120">
              <el-input-number v-model="camInfo.time" controls-position="right" :min="1" :max="10"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowDlgCamAdd = false">取 消</el-button>
            <el-button type="primary" @click="camAdd">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="isShowDlgCamEdit" width=300px :append-to-body=true :destroy-on-close=true>
          <el-form :model="camInfo">
            <el-form-item label="特定场景名称" label-width="120">
              <el-input v-model="camInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="特定场景时间" label-width="120">
              <el-input-number v-model="camInfo.time" controls-position="right" :min="1" :max="10"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowDlgCamEdit = false">取 消</el-button>
            <el-button type="primary" @click="camEdit">修 改</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="isShowDlgCamLoad" width=300px :append-to-body=true :destroy-on-close=true>
          <input type="file" ref="filElem" class="upload-file" @change="onCamDataArrLoad">
          <div slot="footer" class="dialog-footer">
            <!--            <el-button type="primary" @click="isShowDlgCamLoad = false">确 定</el-button>-->
          </div>
        </el-dialog>

        <el-main>
          <el-collapse v-model="camGroupName" accordion @change="onCamGroupChange">
            <el-collapse-item v-for="(camGroup,camGroupIndex) in camData"
                              :key="camGroup.id"
                              :title="camGroup.camGroupName"
                              :name="camGroup.camGroupName">

              <div class="camDiv"
                   v-for="(camInfo,camIndex) in camGroup.group">

                <img class='camImg'
                     :src="camInfo.img"
                     :ref="`camGroup${camGroupIndex}`+`cam${camIndex}`"
                     alt=""
                     @click="onCamImg(camInfo,camGroupIndex,camIndex)"/>
                <p class="pictext">{{camInfo.name +':' + camInfo.time +'秒'}}</p>
              </div>
            </el-collapse-item>

          </el-collapse>
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="动画导航" name="second">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button type="text" icon="el-icon-plus"></el-button>
            <el-button type="text" icon="el-icon-delete-solid"></el-button>
            <el-button type="text" icon="el-icon-edit"></el-button>
          </el-row>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>


</template>

<script>
  // import
  var FileSaver = require('file-saver')
  import html2canvas from 'html2canvas'

  export default {
    data () {
      return {
        urlUpload: '',
        camData: [],
        activeTapName: 'first',
        camGroupName: '特定场景组1',
        camGroupIndex: -1,
        activeCamIndex: -1,

        isFly: true,
        isShowDlgCamAdd: false,
        isShowDlgCamEdit: false,
        isShowDlgCamLoad: false,
        isShowDlgcamGroupAdd: false,

        camInfo: {
          // id:'',
          // index:0,
          name: '特定场景0',
          img: '',
          log: 0.0,
          lat: 0.0,
          alt: 0.0,
          heading: 0.0,
          pitch: 0.0,
          roll: 0.0,
          time: 1,
        },
        lastCamImgDom: undefined,

      }
    },
    mounted () {
    },

    methods: {
      /** 切换tab */
      onTabClick (tab, event) {
        // paneName
        // console.log(tab, event)
      },
      /** 场景组切换折叠通知所有操作基于场景数据中哪个场景组 */
      onCamGroupChange (collapse) {
        this.camGroupIndex = this.camData.findIndex(item => item.camGroupName === this.camGroupName)
      },
      /**场景组新建*/
      onCamGroupAdd () {
        this.$prompt('请输入特定场景组名称', '提示', {
          inputValue: '特定场景组' + this.camData.length,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(({ value }) => {
          this.camGroupName = value
          this.camData.push({ 'camGroupName': value, 'group': [] })
          this.onCamGroupChange()
          this.$message({
            type: 'success',
            message: '你的定场景组名称是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      /**场景组删除*/
      onCamGroupDel () {
        this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.camData.splice(this.camGroupIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /**场景组重命名*/
      onCamGroupEdit () {
        let that = this
        this.$prompt('请输入特定场景组名称', '提示', {
          inputValue: '特定场景组' + this.camGroupIndex,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          that.camData[this.camGroupIndex].camGroupName = value
          this.camGroupName = value
          this.$message({
            type: 'success',
            message: '你的定场景组名称是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      /**获取当前相机姿态*/
      getCamPos () {
        let position = this.viewer.scene.camera.positionWC
        let cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(position)
        //将地图坐标（弧度）转为十进制的度数
        this.camInfo.lat = Cesium.Math.toDegrees(cartographic.latitude)
        this.camInfo.log = Cesium.Math.toDegrees(cartographic.longitude)
        this.camInfo.alt = (this.viewer.camera.positionCartographic.height)

        this.camInfo.heading = this.viewer.scene.camera.heading
        this.camInfo.pitch = this.viewer.scene.camera.pitch
        this.camInfo.roll = this.viewer.scene.camera.roll
      },
      /**弹出对话框添写特定场景名称和时间*/
      onCamAddOpen () {
        if (this.camGroupIndex === -1) {
          alert('请先建立分组')
          return
        }
        this.isShowDlgCamAdd = true
        var canvas = this.viewer.scene.canvas
        window.pageYOffset = 0
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        this.camInfo.name = '特定场景' + this.camData[this.camGroupIndex].group.length
        html2canvas(canvas, { scale: 0.05 }).then((canvas) => {
          let img = canvas.toDataURL('image/png')
          this.camInfo.img = img
        })
      },
      /**添加特定场景*/
      camAdd () {
        this.isShowDlgCamAdd = false
        // this.camInfo.id = this.camGroupName + this.camInfo.name + this.activeCamIndex
        this.getCamPos()
        var copy = JSON.parse(JSON.stringify(this.camInfo)) //深copy
        let index = this.camData[this.camGroupIndex].group.length
        if (this.activeCamIndex === index - 1) {
          this.camData[this.camGroupIndex].group.push(copy)
          this.camImgHighlight(this.camGroupIndex, index)
        } else {
          this.camData[this.camGroupIndex].group.splice(this.activeCamIndex + 1, 0, copy)
          this.camImgHighlight(this.camGroupIndex, this.activeCamIndex + 1)
        }

        this.camInfo = {
          id: '',
          index: '',
          name: '特定场景0',
          pointImg: '',
          log: 0.0,
          pointLat: 0.0,
          pointAlt: 0.0,
          pitch: 0.0,
          roll: 0.0,
          time: 1,
        }

      },
      /**删除特定场景*/
      onCamDel () {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.camData[this.camGroupIndex].group.splice(this.activeCamIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /**替换特定场景*/
      async onCamReplace () {
        let that = this
        var canvas = this.viewer.scene.canvas
        window.pageYOffset = 0
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        html2canvas(canvas, { scale: 0.05 }).then((canvas) => {
          let img = canvas.toDataURL('image/png')
          that.camInfo.img = img
        })

        await new Promise(resolve => setTimeout(resolve, 1000))
        this.getCamPos()

        this.camData[this.camGroupIndex].group[this.activeCamIndex].log = this.camInfo.log
        this.camData[this.camGroupIndex].group[this.activeCamIndex].lat = this.camInfo.lat
        this.camData[this.camGroupIndex].group[this.activeCamIndex].alt = this.camInfo.alt
        this.camData[this.camGroupIndex].group[this.activeCamIndex].heading = this.camInfo.heading
        this.camData[this.camGroupIndex].group[this.activeCamIndex].pitch = this.camInfo.pitch
        this.camData[this.camGroupIndex].group[this.activeCamIndex].roll = this.camInfo.roll
        this.camData[this.camGroupIndex].group[this.activeCamIndex].img = this.camInfo.img

      },
      /**更改特定场景*/
      camEdit () {
        this.camData[this.camGroupIndex].group[this.activeCamIndex].name = this.camInfo.name
        this.camData[this.camGroupIndex].group[this.activeCamIndex].time = this.camInfo.time
        this.isShowDlgCamEdit = false

      },
      /**飞到指定位置*/
      onCamImg (camInfo, camGroupIndex, camIndex) {
        this.camImgHighlight(camGroupIndex, camIndex)
        this.activeCamIndex = camIndex//以经飞过的排序号
        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(camInfo.log, camInfo.lat, camInfo.alt),
          orientation: {
            heading: camInfo.heading,
            pitch: camInfo.pitch,
            roll: camInfo.roll
          },
          duration: camInfo.time,
          easingFunction: Cesium.EasingFunction.LINEAR_NONE
        })
      },
      /**img高亮*/
      async camImgHighlight (camGroupIndex, camIndex) {
        this.activeCamIndex = camIndex
        await new Promise(resolve => setTimeout(resolve, 200))
        let camImgDom = this.$refs[`camGroup${camGroupIndex}` + `cam${camIndex}`][0]

        if (this.lastCamImgDom !== undefined) {
          this.lastCamImgDom.setAttribute('class', 'camImg')
        }
        camImgDom.setAttribute('class', 'camImgSel')
        this.lastCamImgDom = camImgDom
      },
      /**选择文件*/
      onCamDataArrLoad (event) {
        var that = this
        var input = event.target
        var reader = new FileReader()
        reader.onload = function () {
          if (reader.result) {
            //显示文件内容
            that.camData = JSON.parse(reader.result)

          }
        }
        reader.readAsText(input.files[0])
        this.isShowDlgCamLoad = false
      },
      /**保存相机点*/
      onCamDataArrSave () {
        var content = JSON.stringify(this.camData)
        var blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, 'cam.json')
      },

      /**场景组播放*/
      async onCamGroupPlay () {
        let that = this
        let camGroup = this.camData[this.camGroupIndex].group
        let ai = this.activeCamIndex
        this.isFly = true
        for (let i = ai; i < camGroup.length; i++) {
          if (that.isFly == true) {
            that.onCamImg(camGroup[i], this.camGroupIndex, i)
            await new Promise(resolve => setTimeout(resolve, camGroup[i].time * 1000))
          }
          this.activeCamIndex = i
        }
      },
      /**场景组暂停*/
      onCamGroupPlayPause () {
        this.isFly = false
        this.viewer.camera.cancelFlight()
      },
      onViewType (event) {
        if (event.path[0].tagName === 'I') {
          if (event.path[0].className == 'el-icon-s-unfold') {
            event.path[0].className = 'el-icon-menu'
          } else {
            event.path[0].className = 'el-icon-s-unfold'
          }
        }
        // alert('请完其它Q')
      }
    },
    computed: {
      listensPage () {
        return this.$store.state.pathNavPageName
      }
    },
    watch: {
      listensPage: function () {
        this.activeTapName = this.$store.state.pathNavPageName
      }
    },
  }
</script>

<style>

  #dlgPathNav .camDiv {
    float: left;
    margin: 0px 0px 0px 10px;
    font-size: 0;
  }

  #dlgPathNav .camDiv .camImg {
    width: 88px;
    height: 45px;
    border: 2px solid #2ec5ad;

  }

  #dlgPathNav .camDiv .camImgSel {
    width: 88px;
    height: 45px;
    border: 4px solid #409EFF;
  }

  #dlgPathNav .camDiv .camImg:hover {
    border: 2px solid #409EFF;

  }

  #dlgPathNav .pictext {
    text-align: center;
    color: #2EC5AD;
    width: 88px;
    font-size: 12px;
    word-break: break-all;
    word-wrap: break-word;
  }


</style>
