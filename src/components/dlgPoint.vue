<template>
  <el-tabs id='dlgPoint' v-model="activeTapName">
    <el-tab-pane label="绘制点" name="first">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button type="text" :class="[isDraw ? 'el-buttonSel':'el-button']" title="启动绘制" icon="el-icon-edit"
                       @click="onPointDraw"></el-button>
            <el-button type="text" :class="[isDel ? 'el-buttonSel':'el-button']" title="启动删除"
                       icon="el-icon-delete-solid" @click="onPointDel"></el-button>
            <el-button type="text" :class="[isMove ? 'el-buttonSel':'el-button']" title="启动移动" icon="el-icon-rank"
                       @click="onPointMove"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" title="添加自定义符号" icon="el-icon-plus" @click="onImgAdd"></el-button>
            <el-button type="text" title="删除自定义符号" icon="el-icon-delete" @click="onImgDel"></el-button>
            <el-button type="text" title="读取自定义符号" icon="el-icon-folder-opened" @click="onImgLoad"></el-button>
            <el-button type="text" title="导出自定义符号" icon="el-icon-download" @click="onImgSave"></el-button>
            <el-button type="text" title="上传自定义符号" icon="el-icon-upload2" @click="onImgUpdata"></el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-collapse v-model="activeCollapseNames">
            <el-collapse-item title="标准符号设置" name="1">
              <el-row>
                <el-col :span="4">
                  <el-tag>名称:</el-tag>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="pointInfo.pointName" placeholder="请输入名称"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="pointInfo.pointNameShow" label="显  示" border size="mini"
                               @change="onPointNameShow"></el-checkbox>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-tag>字体/符号缩放:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="pointInfo.pointScale" :min="1" :max="10" label="描述文字" size="mini"
                                   @change="onPointScale"></el-input-number>
                </el-col>
                <el-col :span="4">
                  <el-tag>颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="pointInfo.pointColor"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                                   @change="onPointColor"></el-color-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag>波纹半径:</el-tag>
                </el-col>
                <el-col :span="10">
                  <el-slider v-model="pointInfo.pointDiffusionRadius" @change="onPointDiffusionRadius"></el-slider>
                </el-col>
                <el-col :span="4">
                  <el-tooltip :content="pointInfo.pointRippleType" placement="top">
                    <el-switch
                      :width="25"
                      @change="onPointRippleType"
                      v-model="pointInfo.pointRippleType"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="连续"
                      inactive-value="间隔">
                    </el-switch>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  <el-tooltip :content="pointInfo.pointRippleDirection" placement="top">
                    <el-switch
                      :width="25"
                      @change="onPointRippleDirection"
                      v-model="pointInfo.pointRippleDirection"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="正向"
                      inactive-value="反向">
                    </el-switch>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="公共图像符号" name="2">
              <div class="billboardDiv" v-for="(billboard,billboardIndex) in billboardsDataPub">
                <img
                  class='billboardImg'
                  :src="billboard.image"
                  :ref="`billboard${billboardIndex}`"
                  alt=""
                  @click="onImgSel(billboardIndex)"></div>
            </el-collapse-item>
            <el-collapse-item title="私有图像符号" name="3">


            </el-collapse-item>
            <el-collapse-item title="其它设置" name="4">
              <el-row>
                <el-col :span="4">
                  <el-tag>坐标:</el-tag>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="pointCoordinate" placeholder="116.4,39.9,100"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="onPointCoordinate">精确放置</el-button>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-tab-pane>

    <el-tab-pane label="加载点" name="second">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'dlgPoint',
    data () {
      return {
        activeBillboardIndex: -1,//记录当前选中dom对应数据的索引
        lastbillboardImgDom: undefined,
        activeCollapseNames: ['1', '2', '3', '4'],
        activeTapName: 'first',
        isDraw: false,
        isDel: false,
        isMove: false,
        /**公共符号库图片及参数*/
        billboardsDataPub: '',
        /**所有绘制的点的Entity集合*/
        pointEntitySet: [],
        /**所有绘制的点的Json参数集合用于保存与读取*/
        pointJsonSet: [],
        /**单点信息*/
        pointInfo: {
          pointName: '点01',
          pointNameShow: false,

          log: 0.0,
          lat: 0.0,
          alt: 0.0,

          isBillbord: false,
          img: '',
          width: 128,
          height: 128,
          verticalOrigin: 'BOTTOM',
          horizontalOrigin: 'CENTER',

          pointScale: 1,
          distance: 5000,

          pointColor: '#2EC5AD',
          pointDiffusionRadius: 1,
          pointRippleType: '连续',
          pointRippleDirection: '正向',
        },
        pointCoordinate: '116.4,39.9,100',
        pointColorPredefine: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],

        handlerPointDraw: null,
        handlerPointHDel: null,
      }
    },//data end
    beforeMount () {

    },
    beforeCreate(){

    },
    mounted () {
      this.initImg()
    },

    updated () {

    },

    methods: {
      initImg () {
        /**初始化公共符号数组*/
        let temp = require('../assets/billboardsPub').billboardsPub
        var copy = JSON.parse(JSON.stringify(temp)) //深copy
        for (let i = 0; i < copy.length; i++) {
          copy[i].image = require(`../${copy[i].image}`)
        }
        this.billboardsDataPub = copy
      },
      onPointNameShow () {
        // this.pointNameShow = this.pointNameShow === false
        console.log(this.pointNameShow)
      },
      onPointScale () {

      },
      onPointColor () {

      },
      onPointDiffusionRadius () {

      },
      onPointRippleType () {

      },
      onPointRippleDirection () {

      },
      onPointCoordinate () {

      },
      /************************************************************************************开始绘点*/
      onPointDraw () {
        let that = this
        if (this.isDraw === false) {
          this.isDraw = true
          this.isDel = false
          this.isMove = false
          this.handlerPointDraw = new Cesium.ScreenSpaceEventHandler(that.viewer.canvas)

          this.handlerPointDraw.setInputAction(function (event) {
            var wp = event.position
            if (!Cesium.defined(wp)) {
              return
            }
            var ray = that.viewer.camera.getPickRay(wp)
            if (!Cesium.defined(ray)) {
              return
            }
            var cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene)
            if (!Cesium.defined(cartesian)) {
              return
            }

            // if(this.pointInfo.pointNameShow===true){
            //   let pointLabel = new Cesium.LabelGraphics(
            //     {
            //       text : this.pointInfo.pointName,
            //       scale: this.pointInfo.pointScale,
            //     }
            //   )
            // }

            var en = that.viewer.entities.add({
              // show:this.pointInfo.pointNameShow,
              position: cartesian,
              label: {
                text: 'test',
                font: '22px Helvetica',
                fillColor: Cesium.Color.BLACK
              },
              point: {
                pixelSize: 10,
                color: Cesium.Color.CHARTREUSE
              }
              // billboard : {
              //   image : 'img/Label/01_zt.png',
              //   sizeInMeters : true,
              //   horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
              //   verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
              //   scale : 2,
              //   width : 25, // default: undefined
              //   height : 12 // default: undefined
              // }
            })
            that.pointEntitySet.push(en)
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        } else {
          this.isDraw = false
          this.handlerPointDraw.destroy()
        }
      },
      onPointDel () {
        let that = this
        if (this.isDel === false) {
          this.isDel = true
          this.isDraw = false
          this.isMove = false
          this.handlerPointDel = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
          this.handlerPointDel.setInputAction(function (event) {
            var wp = event.position
            if (!Cesium.defined(wp)) {
              return
            }
            let pickedPointFeature = that.viewer.scene.pick(wp)
            console.log(pickedPointFeature)
            if (pickedPointFeature === undefined) {
              console.log('没有点中模型')
            }

            if (pickedPointFeature.primitive instanceof Cesium.PointPrimitive) {
              console.log('点中了点')
              that.viewer.entities.remove(pickedPointFeature.id)

            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        } else {
          this.isDel = false
          this.handlerPointDel.destroy()
        }
      },
      onPointMove () {
        if (this.isMove === false) {
          this.isMove = true
          this.isDraw = false
          this.isDel = false
        } else {
          this.isMove = false

        }
      },
      async onImgSel (billboardIndex) {
        this.activeBillboardIndex = billboardIndex
        await new Promise(resolve => setTimeout(resolve, 200))
        let billboardImgDom = this.$refs[`billboard${billboardIndex}`][0]
        /**把上次选中并且不是这次选中的取消高亮*/
        if (this.lastbillboardImgDom !== undefined && this.lastbillboardImgDom !== billboardImgDom) {
          this.lastbillboardImgDom.setAttribute('class', 'billboardImg')
        }
        billboardImgDom.className = billboardImgDom.className === 'billboardImg' ? 'billboardImgSel' : 'billboardImg'
        this.lastbillboardImgDom = billboardImgDom
      },
      onImgAdd () {

      },
      onImgDel () {

      },
      onImgLoad () {

      },
      onImgSave () {

      },
      onImgUpdata () {

      }

    }
  }
</script>

<style>

  #dlgPoint .billboardDiv {
    float: left;
    margin: 0px 0px 10px 10px;
    font-size: 0;
  }

  #dlgPoint .billboardDiv .billboardImg {
    width: 40px;
    height: 40px;
    /*filter: invert(80%);*/
    border: 1px solid #2EC5AD;
  }

  #dlgPoint .billboardDiv .billboardImgSel {
    width: 40px;
    height: 40px;
    border: 4px solid #409EFF;
  }

  #dlgPoint .billboardDiv .billboardImg:hover {
    border: 2px solid #409EFF;
  }

  #dlgPoint .el-main {
    height: 550px;
  }

  #dlgPoint .el-col .el-button {
    height: 30px;
    font-size: 14px;
    border: 1px solid #2EC5AD;
    padding: 5px 10px 5px 10px;
  }

  #dlgPoint .el-col .el-button:hover {
    border: 1px solid #C0C4CC;
    color: #409EFF;
  }

  #dlgPoint .el-button--primary {
    color: #2EC5AD;
    background: rgba(44, 62, 80, 0);
  }

  #dlgPoint .el-buttonSel {
    color: #ff3200;
    background: #409EFF;
  }
</style>
