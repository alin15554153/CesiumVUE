<template>
  <el-tabs id='dlgPoint' v-model="activeTapName">
    <el-tab-pane label="矢量点" name="first">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button type="text" :class="[isDraw ? 'el-buttonSel':'el-button']" title="启动绘制" icon="el-icon-plus"
                       @click="onPointDraw"></el-button>
            <el-button type="text" :class="[isDel ? 'el-buttonSel':'el-button']" title="启动删除"
                       icon="el-icon-delete-solid" @click="onPointDel"></el-button>
            <el-button type="text" :class="[isEdit ? 'el-buttonSel':'el-button']" title="启动编辑" icon="el-icon-edit"
                       @click="onPointEdit"></el-button>
            <el-button type="text" :class="[isMove ? 'el-buttonSel':'el-button']" title="启动移动" icon="el-icon-rank"
                       @click="onPointMove"></el-button>

            <el-divider direction="vertical"></el-divider>
            <el-button type="text" title="保存" icon="el-icon-download"
                       @click="onJsonSave"></el-button>
            <el-button type="text" title="读取" icon="el-icon-folder-opened"
                       @click="isShowDlgPointJsonLoad= true"></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" title="添加自定义符号" icon="el-icon-plus" @click="onImgAdd"></el-button>
            <el-button type="text" title="删除自定义符号" icon="el-icon-delete" @click="onImgDel"></el-button>
            <el-button type="text" title="读取自定义符号" icon="el-icon-folder-opened"></el-button>
            <el-button type="text" title="导出自定义符号" icon="el-icon-download"></el-button>
            <el-button type="text" title="上传自定义符号" icon="el-icon-upload2" @click="onImgUpdata"></el-button>
            <!--            <el-button type="text" title="上传自定义符号" icon="el-icon-upload2"-->
            <!--                       @click.stop.prevent="doClick($event)"></el-button>-->

          </el-row>
        </el-header>
        <el-dialog :visible.sync="isShowDlgPointJsonLoad" width=300px :append-to-body=true :destroy-on-close=true>
          <input type="file" ref="filElem" class="upload-file" @change="onJsonLoad">
          <div slot="footer" class="dialog-footer">
            <!--            <el-button type="primary" @click="isShowDlgCamLoad = false">确 定</el-button>-->
          </div>
        </el-dialog>
        <el-main>
          <el-collapse v-model="activeCollapseNames">
            <el-collapse-item title="基本设置" name="1">
              <el-row>
                <el-col :span="4">
                  <el-tag>图层:</el-tag>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="pointInfo.labelText" placeholder="图层名"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-checkbox v-model="pointInfo.isPoint">点</el-checkbox>
                </el-col>
                <el-col :span="4">
                  <el-checkbox v-model="pointInfo.isPoint">Label</el-checkbox>
                </el-col>
                <el-col :span="4">
                  <el-checkbox v-model="pointInfo.isPoint">BillBoard</el-checkbox>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="点属性设置" name="2">
              <el-row>
                <el-col :span="3">
                  <el-tag>尺寸:</el-tag>
                </el-col>
                <el-col :span="3">
                  <el-input v-model.number="pointOptions.pixelSize"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-tag>点色:</el-tag>
                </el-col>
                <el-col :span="2">
                  <el-color-picker v-model="pointOptions.colorCss"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                                   @change="onPointColor"></el-color-picker>
                </el-col>
                <el-col :span="3">
                  <el-tag>边宽:</el-tag>
                </el-col>
                <el-col :span="3">
                  <el-input v-model="pointOptions.outlineWidth"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-tag>边色:</el-tag>
                </el-col>
                <el-col :span="3">
                  <el-color-picker v-model="pointOptions.outlineColorCss"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                                   @change="onPointColor"></el-color-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>近缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointOptions.scaleNear"
                            maxlength="10"
                            @keyup.native="onPointScaleNear"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointOptions.scaleNearValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>远缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointOptions.scaleFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointOptions.scaleFarValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>近裁剪距离:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="pointOptions.displayNear"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-tag>远裁剪距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointOptions.displayFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-checkbox v-model="pointInfo.isWave">动态</el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-tag>波纹半径:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-slider v-model="pointInfo.diffusionRadius" @change="onPointDiffusionRadius"></el-slider>
                </el-col>
                <el-col :span="4">
                  <el-tooltip :content="pointInfo.rippleType" placement="top">
                    <el-switch
                      :width="25"
                      @change="onPointRippleType"
                      v-model="pointInfo.rippleType"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="连续"
                      inactive-value="间隔">
                    </el-switch>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  <el-tooltip :content="pointInfo.rippleDirection" placement="top">
                    <el-switch
                      :width="25"
                      @change="onPointRippleDirection"
                      v-model="pointInfo.rippleDirection"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="正向"
                      inactive-value="反向">
                    </el-switch>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="Label设置" name="3">
              <el-row>

                <el-col :span="4">
                  <el-radio v-model="labelOptions.dataSource" label="1">手动</el-radio>
                </el-col>
                <el-col :span="4">
                  <el-radio v-model="labelOptions.dataSource" label="2">挂接</el-radio>
                </el-col>
                <el-col :span="4">
                  <el-tag>手动:</el-tag>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="labelOptions.text"></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <el-tag>表:</el-tag>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="labelOptions.table"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-tag>字段:</el-tag>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="labelOptions.field"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-tag>值:</el-tag>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="labelOptions.value"></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4">
                  <el-tag>填充:</el-tag>
                </el-col>
                <el-col :span="3">
                  <el-color-picker v-model="labelOptions.fillColorCss"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                  ></el-color-picker>
                </el-col>
                <el-col :span="5">
                  <el-tag>轮廓颜色:</el-tag>
                </el-col>
                <el-col :span="3">
                  <el-color-picker v-model="labelOptions.outlineColorCss"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                  ></el-color-picker>
                </el-col>
                <el-col :span="3">
                  <el-tag>宽度:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="labelOptions.outlineWidth"></el-input>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="4">
                  <el-checkbox v-model="labelOptions.showBackground">背景</el-checkbox>
                </el-col>
                <el-col :span="2">
                  <el-color-picker v-model="labelOptions.backgroundColorCss"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                                   @change="onPointColor"></el-color-picker>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="labelOptions.horizontalOption" placeholder="水平轴">
                    <el-option
                      v-for="item in labelOptions.horizontalOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="labelOptions.verticalOption" placeholder="垂直轴">
                    <el-option
                      v-for="item in labelOptions.verticalOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>近缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="labelOptions.scaleNear"
                            maxlength="10"
                            @keyup.native="onPointScaleNear"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="labelOptions.scaleNearValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>远缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="labelOptions.scaleFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="labelOptions.scaleFarValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>近裁剪距离:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="labelOptions.displayNear"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-tag>远裁剪距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="labelOptions.displayFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
              </el-row>

            </el-collapse-item>
            <el-collapse-item title="billboard设置" name="4">
              <el-row>
                <el-col :span="11">
                  <el-select v-model="billboardOptions.horizontalOption" placeholder="水平轴">
                    <el-option
                      v-for="item in billboardOptions.horizontalOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-select v-model="billboardOptions.verticalOption" placeholder="垂直轴">
                    <el-option
                      v-for="item in billboardOptions.verticalOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>图片宽度:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.width"
                            maxlength="10"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>宽度:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.height"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>近缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.scaleNear"
                            maxlength="10"
                            @keyup.native="onPointScaleNear"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.scaleNearValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>远缩放距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.scaleFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-tag>比例:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.scaleFarValue"
                            maxlength="5"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>近裁剪距离:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="billboardOptions.displayNear"
                            maxlength="10"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-tag>远裁剪距离:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="billboardOptions.displayFar"
                            maxlength="10"
                  ></el-input>
                </el-col>
              </el-row>

            </el-collapse-item>
            <el-collapse-item title="公共图像符号" name="5">
              <div class="billboardDiv" v-for="(billboard,billboardIndex) in billboardsDataPub">
                <img
                  class='billboardImg'
                  :src="billboard.image"
                  :ref="`billboard${billboardIndex}`"
                  alt=""
                  @click="onImgSel(billboardIndex,billboard.image)"></div>
            </el-collapse-item>
            <el-collapse-item title="私有图像符号" name="6">


            </el-collapse-item>
            <el-collapse-item title="精确放置" name="7">
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
            <el-collapse-item title="WFS读取设置" name="8">
              <el-row>
                <el-col :span="23">
                  <el-input placeholder="请输入路径地址" v-model="pointWfsInfo.url">
                    <template slot="prepend">Http://</template>
                    <el-button slot="append">添加</el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-checkbox v-model="pointWfsInfo.isHeight">高度图</el-checkbox>
                </el-col>
                <el-col :span="3">
                  <el-tag>字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointWfsInfo.heightField" placeholder="字段名"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-tag>高度颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="pointWfsInfo.heightColor"
                                   show-alpha
                                   :predefine="pointColorPredefine" size="mini"
                                   @change="onPointHeightColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>

                <el-col :span="5">
                  <el-tag>截面形状:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="pointWfsInfo.heightShape" placeholder="水平轴">
                    <el-option
                      v-for="item in pointWfsInfo.shapeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-tag>截面半径:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="pointWfsInfo.shapeSize"></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <el-checkbox v-model="pointWfsInfo.isHeight">动点图</el-checkbox>
                </el-col>
                <el-col :span="3">
                  <el-tag>字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointWfsInfo.heightField" placeholder="字段名"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-tag>半径:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointWfsInfo.size" placeholder="字段名"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-checkbox v-model="pointWfsInfo.isHeight">热力图</el-checkbox>
                </el-col>
                <el-col :span="3">
                  <el-tag>字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointWfsInfo.heightField" placeholder="字段名"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-tag>半径:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pointWfsInfo.size" placeholder="字段名"></el-input>
                </el-col>
              </el-row>
            </el-collapse-item>

          </el-collapse>
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>


</template>

<script>
  import eventBus from '../js/eventBus'
  import mixin from '../js/mixin'

  var FileSaver = require('file-saver')
  export default {
    mixins: [mixin],
    name: 'dlgPoint',
    components: {},
    data () {
      return {

        isShowDlgPointJsonLoad: false,
        activeCollapseNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
        activeBillboardIndex: -1,//记录当前选中dom对应数据的索引
        lastbillboardImgDom: undefined,
        activeTapName: 'first',
        isDraw: false,
        isDel: false,
        isEdit: false,
        isMove: false,
        /**公共符号库图片及参数*/
        billboardsDataPub: '',
        /**所有绘制的点的Entity集合*/
        pointEntitySet: [],
        pointLabelEntitySet: [],
        pointBillboardEntitySet: [],
        /**所有绘制的点的Json参数集合用于保存与读取*/
        pointJsonSet: [],

        pointWfsInfo: {
          url: '',
          isHeight: false,
          heightField: '',
          heightColor: 'rgba(255, 69, 0, 0.68)',
          heightShape: '正方形',
          shapeOptions: [
            { value: 1, label: '正方形' },
            { value: 2, label: '圆形' },
            { value: 3, label: '三角形' },
            { value: 4, label: '五星' },
          ],
          shapeSize: '',
        },

        pointOptions: {
          isShow: true,
          pixelSize: 10,
          colorCss: 'rgba(255, 69, 0, 0.68)',
          outlineColorCss: 'rgba(46,197,173,0.51)',
          outlineWidth: 2,
          // heightReference: Cesium.HeightReference.none,
          // translucencyByDistance:new Cesium.NearFarScalar(10000,1,50000,0.5),
          scaleNear: 10000,
          scaleNearValue: 1,
          scaleFar: 50000,
          scaleFarValue: 5,
          displayNear: 0,
          displayFar: 500000,
          disableDepthTestDistance: 5000000,

        },
        labelOptions: {
          isShow: true,
          dataSource: '1',
          text: 'test',
          table: 'pointInfo',
          field: 'id',
          value: '1',
          font: '30px sans-serif',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          // scale:1,
          showBackground: true,
          backgroundColorCss: 'rgba(0,0,0,0.92)',
          backgroundPadding: new Cesium.Cartesian2(7, 5),
          // pixelOffset:new Cesium.Cartesian2(0, -20),
          // eyeOffset:new Cesium.Cartesian3(10, 45,0),
          horizontalOption: 0,
          horizontalOptions: [
            { value: Cesium.HorizontalOrigin.CENTER, label: '水平中轴' },
            { value: Cesium.HorizontalOrigin.LEFT, label: '水平左轴' },
            { value: Cesium.HorizontalOrigin.RIGHT, label: '水平右轴' },
          ],
          verticalOption: 1,
          verticalOptions: [
            { value: Cesium.VerticalOrigin.BASELINE, label: '垂直基轴' },
            { value: Cesium.VerticalOrigin.BOTTOM, label: '垂直底轴' },
            { value: Cesium.VerticalOrigin.CENTER, label: '垂直中轴' },
            { value: Cesium.VerticalOrigin.TOP, label: '垂直顶轴' },
          ],
          heightReference: Cesium.HeightReference.none,
          fillColorCss: 'rgba(0,0,0,0.82)',
          outlineColorCss: 'rgba(217,236,255,0.82)',
          outlineWidth: 2,
          // translucencyByDistance:new Cesium.NearFarScalar(10000,1,50000,0.5),
          scaleNear: 10000,
          scaleNearValue: 1,
          scaleFar: 50000,
          scaleFarValue: 5,
          displayNear: 0,
          displayFar: 500000,
          disableDepthTestDistance: 5000000
        },
        billboardOptions: {
          isShow: true,
          image: '',
          // scale:200,
          horizontalOption: 0,
          horizontalOptions: [
            { value: Cesium.HorizontalOrigin.CENTER, label: '水平中轴' },
            { value: Cesium.HorizontalOrigin.LEFT, label: '水平左轴' },
            { value: Cesium.HorizontalOrigin.RIGHT, label: '水平右轴' },
          ],
          verticalOption: 1,
          verticalOptions: [
            { value: Cesium.VerticalOrigin.BASELINE, label: '垂直基轴' },
            { value: Cesium.VerticalOrigin.BOTTOM, label: '垂直底轴' },
            { value: Cesium.VerticalOrigin.CENTER, label: '垂直中轴' },
            { value: Cesium.VerticalOrigin.TOP, label: '垂直顶轴' },
          ],
          heightReference: Cesium.HeightReference.none,
          // color:new Cesium.Color(0.165, 0.165, 0.165, 0.8),
          // rotation:0,
          // alignedAxis:new Cesium.Cartesian3(10, 10, 10),
          sizeInMeters: true,
          width: 640, // default: undefined
          height: 640,// default: undefined
          scaleNear: 10000,
          scaleNearValue: 1,
          scaleFar: 50000,
          scaleFarValue: 5,
          displayNear: 0,
          displayFar: 500000,
          disableDepthTestDistance: 5000000
        },
        /**单点信息*/
        pointInfo: {
          nameOfLayer: '',
          isShow: true,
          isPoint: true,
          isLabel: true,
          isBillboard: true,
          log: 0.0,
          lat: 0.0,
          alt: 0.0,

          height: 0,
          heightColor: '#2EC5AD',
          isWave: false,
          diffusionRadius: 1,
          rippleType: '连续',
          rippleDirection: '正向',
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

      }
    },//data end
    computed: {},
    mounted () {
      this.initImg()
    },

    methods: {

      proving1 () {
        this.pointOptions.scaleNear = this.pointOptions.scaleNear.replace(/[^\.\d]/g, '')
        // this.pointOptions.scaleNear = this.pointOptions.scaleNear.replace('.', '');
      },
      onPointScaleNear (event) {
        // var value = event.target.value
        this.pointOptions.scaleNear = this.clearNoNum(this.pointOptions.scaleNear)
      },

      doClick (event) {
        eventBus.$emit('getTarget', event.target)
        eventBus.$emit('layerAdd', 'event.target')
      },
      initImg () {
        /**初始化公共符号数组*/
        let temp = require('../assets/billboardsPub').billboardsPub
        var copy = JSON.parse(JSON.stringify(temp)) //深copy
        for (let i = 0; i < copy.length; i++) {
          copy[i].image = require(`../${copy[i].image}`)
        }
        this.billboardsDataPub = copy
      },
      OptionsComputed () {
        this.pointOptions.color = Cesium.Color.fromCssColorString(this.pointOptions.colorCss)
        this.pointOptions.outlineColor = Cesium.Color.fromCssColorString(this.pointOptions.outlineColorCss)
        this.pointOptions.scaleByDistance = new Cesium.NearFarScalar(this.pointOptions.scaleNear,
          this.pointOptions.scaleNearValue, this.pointOptions.scaleFar, this.pointOptions.scaleFarValue)
        this.pointOptions.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(this.pointOptions.displayNear,
          this.pointOptions.displayFar)

        this.labelOptions.backgroundColor = Cesium.Color.fromCssColorString(this.labelOptions.backgroundColorCss)
        this.labelOptions.fillColor = Cesium.Color.fromCssColorString(this.labelOptions.fillColorCss)
        this.labelOptions.outlineColor = Cesium.Color.fromCssColorString(this.labelOptions.outlineColorCss)
        this.labelOptions.scaleByDistance = new Cesium.NearFarScalar(this.labelOptions.scaleNear,
          this.labelOptions.scaleNearValue, this.labelOptions.scaleFar, this.labelOptions.scaleFarValue)
        this.labelOptions.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(this.labelOptions.displayNear,
          this.labelOptions.displayFar)

        this.billboardOptions.scaleByDistance = new Cesium.NearFarScalar(this.billboardOptions.scaleNear,
          this.billboardOptions.scaleNearValue, this.billboardOptions.scaleFar, this.billboardOptions.scaleFarValue)
        this.billboardOptions.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(
          this.billboardOptions.displayNear,this.billboardOptions.displayFar)

      },

      onPointScale () {

      },
      onPointColor () {

      },
      onPointHeight () {

      },
      onPointHeightColor () {

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
        if (this.isDraw === false) {
          this.isDraw = true
          this.isDel = false
          this.isMove = false
          this.handlerInit(this.callBackPointDraw)
          console.log(this.handler)
        } else {
          this.isDraw = false
          // this.handlerDestroy()
        }
      },

      callBackPointDraw (cartesian) {
        let that = this
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        that.pointInfo.log = Cesium.Math.toDegrees(cartographic.longitude)
        that.pointInfo.lat = Cesium.Math.toDegrees(cartographic.latitude)
        that.pointInfo.alt = cartographic.height

        let pos = Cesium.Cartesian3.fromDegrees(that.pointInfo.log, that.pointInfo.lat, that.pointInfo.alt + 100)
        this.OptionsComputed()
        var en = that.viewer.entities.add({
          position: pos,
          point: this.pointOptions,
          label: this.labelOptions,
          billboard: this.billboardOptions
        })

        that.pointEntitySet.push(en)
        let pointOne = {}
        pointOne.id = en.id
        pointOne.log = that.pointInfo.log
        pointOne.lat = that.pointInfo.lat
        pointOne.alt = that.pointInfo.alt
        pointOne.pos = pos
        pointOne.point = that.pointOptions
        pointOne.label = that.labelOptions
        pointOne.billboard = that.billboardOptions
        that.pointJsonSet.push(pointOne)
      },
      onPointDel () {
        if (this.isDel === false) {
          this.isDel = true
          this.isDraw = false
          this.isMove = false
          this.handlerInit(this.callBackPointDel)
        } else {
          this.isDel = false
          // this.handlerDestroy()
        }
      },
      callBackPointDel (cartesian, pickedFeature) {
        let that = this
        if (pickedFeature === undefined) {
          return
        }
        let pointIndex = this.pointJsonSet.findIndex(item => item.id === pickedFeature.id.id)
        if (pointIndex !== -1) {
          this.pointJsonSet.splice(this.pointIndex, 1)
        }
        that.viewer.entities.remove(pickedFeature.id)
        if (pickedFeature.primitive instanceof Cesium.PointPrimitive) {

        }
      },
      onPointEdit (a, b) {
        console.log(a)
        console.log(b)
      },
      onPointMoveh (a, b) {
        console.log('onPointMoveh')
        console.log(a)
        console.log(b)
      },
      onPointMoveh2 (a, b) {
        console.log('onPointMoveh2')
        console.log(a)
        console.log(b)
      },
      onPointMove () {
        this.handlerInit(this.onPointMoveh)
        if (this.isMove === false) {
          this.isMove = true
          this.isDraw = false
          this.isDel = false

        } else {
          this.isMove = false

        }
      },
      onPointMove2 () {
        this.handlerInit(this.onPointMoveh2)
      },
      async onImgSel (billboardIndex,image) {
        this.activeBillboardIndex = billboardIndex
        await new Promise(resolve => setTimeout(resolve, 200))
        let billboardImgDom = this.$refs[`billboard${billboardIndex}`][0]
        /**把上次选中并且不是这次选中的取消高亮*/
        if (this.lastbillboardImgDom !== undefined && this.lastbillboardImgDom !== billboardImgDom) {
          this.lastbillboardImgDom.setAttribute('class', 'billboardImg')
        }
        billboardImgDom.className = billboardImgDom.className === 'billboardImg' ? 'billboardImgSel' : 'billboardImg'
        this.lastbillboardImgDom = billboardImgDom
        this.billboardOptions.image = image
        this.pointInfo.isBillboard = true
      },
      onImgAdd () {

      },
      onImgDel () {

      },
      onJsonLoad (event) {
        var that = this
        var input = event.target
        var reader = new FileReader()
        reader.onload = function () {
          if (reader.result) {
            //显示文件内容
            that.pointJsonSet = JSON.parse(reader.result)
          }
        }
        reader.readAsText(input.files[0])
        this.isShowDlgPointJsonLoad = false
        for (let i = 0; i < this.pointJsonSet.length; i++) {
          var en = that.viewer.entities.add({
            position: this.pointJsonSet[i].pos,
            point: this.pointJsonSet[i].point,
            label: this.pointJsonSet[i].label,
            billboard: this.pointJsonSet[i].billboard
          })
          that.pointEntitySet.push(en)
        }

      },
      onJsonSave () {
        var content = JSON.stringify(this.pointJsonSet)
        var blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, 'point.json')
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
    height: 700px;
    width: 350px;
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
