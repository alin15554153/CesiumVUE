<template>
  <el-tabs id='dlgLine' v-model="activeTapName">
    <el-tab-pane label="矢量线" name="first">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button title="启动绘制" icon="el-icon-plus"></el-button>
            <el-button title="启动删除" icon="el-icon-delete-solid"></el-button>
            <el-button title="启动编辑" icon="el-icon-edit"></el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-collapse v-model="activeCollapseNames">

            <el-collapse-item title="属性设置" name="1">
              <el-row>
                <el-col :span="4">
                  <el-tag>名称:</el-tag>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="lineInfo.name" placeholder="请输入名称"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="lineInfo.nameShow" label="显  示" border size="mini"
                               @change="onLineNameShow"></el-checkbox>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>线体宽度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="lineInfo.width" :min="1" :max="10" label="线宽" size="mini"
                                   @change="onLineWidth"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>线体颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="lineInfo.color"
                                   show-alpha
                                   :predefine="lineColorPredefine" size="mini"
                                   @change="onLineColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>轮廓线宽:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="lineInfo.outWidth" :min="0" :max="100" label="轮廓线宽" size="mini"
                                   @change="onLineOutWidth"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>轮廓颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="lineInfo.outColor"
                                   show-alpha
                                   :predefine="lineColorPredefine" size="mini"
                                   @change="onLineOutColor"></el-color-picker>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="6">
                  <el-tag>间隔距离:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="lineInfo.spacingDistances" :min="0" :max="10" label="虚线间隔" size="mini"
                                   @change="onLineSpacingDistances"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>间隔颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="lineInfo.spacingColor"
                                   show-alpha
                                   :predefine="lineColorPredefine" size="mini"
                                   @change="onLineSpacingColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>光晕强度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="lineInfo.haloIntensity" :min="0" :max="10" label="光晕强度" size="mini"
                                   @change="onLineHaloIntensity"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>光晕颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="lineInfo.haloColor"
                                   show-alpha
                                   :predefine="lineColorPredefine" size="mini"
                                   @change="onLineHaloColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>挤出高度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="lineInfo.extrudedHeight" :min="0" :max="10" label="挤出高度" size="mini"
                                   @change="onLineExtrudedHeight"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>上沿颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="lineInfo.extrudedColor"
                                   show-alpha
                                   :predefine="lineColorPredefine" size="mini"
                                   @change="onLineExtrudedColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>流动频率:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-input-number v-model="lineInfo.flowRate" :min="0" :max="10" label="流动频率" size="mini"
                                   @change="onLineFlowRate"></el-input-number>
                </el-col>
                <el-col :span="3">
                  <el-tag>占比:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-input-number v-model="lineInfo.flowScale" :min="0" :max="10" label="流动频率" size="mini"
                                   @change="onLineFlowScale"></el-input-number>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>箭头长度:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-input-number v-model="lineInfo.arrowLength" :min="0" :max="10" label="箭头长度" size="mini"
                                   @change="onLineArrowLength"></el-input-number>
                </el-col>
                <el-col :span="3">
                  <el-tag>宽度:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-input-number v-model="lineInfo.arrowWidth" :min="0" :max="10" label="宽度" size="mini"
                                   @change="onLineArrowWidth"></el-input-number>
                </el-col>
              </el-row>
            </el-collapse-item>

            <el-collapse-item title="wfs设置" name="2">
              <el-row>
                <el-col :span="23">
                  <el-input placeholder="请输入路径地址" v-model="lineWfsInfo.url">
                    <template slot="prepend">Http://</template>
                    <el-button slot="append">添加</el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-tag>颜色字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="lineWfsInfo.color" placeholder="字段名"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-tag>线宽字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="lineWfsInfo.width" placeholder="字段名"></el-input>
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
  export default {
    name: 'dlgLine',
    data () {
      return {
        activeTapName: 'first',
        activeCollapseNames: ['1', '2'],
        lineWfsInfo: {
          url: '',
          color: '',
          width: 1,
        },

        lineInfo: {
          name: '',
          nameShow: '',
          width: 1,
          color: '#2EC5AD',
          outWidth: 0,
          outColor: '#2EC5AD',
          spacingDistances: 0,
          spacingColor: '#2EC5AD',
          haloIntensity: 0,
          haloColor: '#2EC5AD',
          extrudedHeight:0,
          extrudedColor:'#2EC5AD',
          flowRate: 0,
          flowScale: 0,
          arrowLength: 0,
          arrowWidth: 0,

        },
        lineColorPredefine: [
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
    },
    methods: {
      onLineNameShow () {
      },
      onLineWidth () {
      },
      onLineColor () {
      },
      onLineOutWidth () {
      },
      onLineOutColor () {
      },
      onLineSpacingDistances () {
      },
      onLineSpacingColor () {
      },
      onLineHaloIntensity () {
      },
      onLineHaloColor () {
      },
      onLineExtrudedHeight(){

      },
      onLineExtrudedColor(){

      },
      onLineFlowRate () {
      },
      onLineFlowScale () {
      },
      onLineArrowLength () {
      },
      onLineArrowWidth () {
      },
    }
  }
</script>

<style>
  #dlgLine .el-button {
    padding-left: 6px;
  }

  #dlgLine .el-main {
    height: 500px;
    width: 350px;
  }
</style>
