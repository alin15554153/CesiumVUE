<template>
  <el-tabs id='dlgPloygon' v-model="activeTapName">
    <el-tab-pane label="矢量面" name="first">
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
                  <el-input v-model="ploygonInfo.name" placeholder="请输入名称"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="ploygonInfo.nameShow" label="显  示" border size="mini"
                               @change="onPloygonNameShow"></el-checkbox>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>挤出高度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="ploygonInfo.extrudedHeight" :min="0" :max="100" label="挤出高度" size="mini"
                                   @change="onPloygonExtrudedHeight"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>填充颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="ploygonInfo.color"
                                   show-alpha
                                   :predefine="ploygonColorPredefine" size="mini"
                                   @change="onPloygonColor"></el-color-picker>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-tag>轮廓线宽:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="ploygonInfo.outWidth" :min="0" :max="100" label="轮廓线宽" size="mini"
                                   @change="onPloygonOutWidth"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>轮廓颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="ploygonInfo.outColor"
                                   show-alpha
                                   :predefine="ploygonColorPredefine" size="mini"
                                   @change="onPloygonOutColor"></el-color-picker>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="6">
                  <el-tag>光晕强度:</el-tag>
                </el-col>
                <el-col :span="8">
                  <el-input-number v-model="ploygonInfo.ploygonHaloIntensity" :min="0" :max="10" label="光晕强度"
                                   size="mini"
                                   @change="onPloygonHaloIntensity"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-tag>光晕颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="ploygonInfo.ploygonHaloColor"
                                   show-alpha
                                   :predefine="ploygonColorPredefine" size="mini"
                                   @change="onPloygonHaloColor"></el-color-picker>
                </el-col>
              </el-row>

            </el-collapse-item>

            <el-collapse-item title="wfs设置" name="2">
              <el-row>
                <el-col :span="23">
                  <el-input placeholder="请输入路径地址" v-model="polygonWfsInfo.url">
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
                  <el-input v-model="polygonWfsInfo.color" placeholder="字段名"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-tag>标注字段:</el-tag>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="polygonWfsInfo.label" placeholder="字段名"></el-input>
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
    name: 'dlgPloygon',
    data () {
      return {
        activeTapName: 'first',
        activeCollapseNames: ['1', '2'],
        polygonWfsInfo: {
          url: '',
          color: '',
          label: '',
        },

        ploygonInfo: {
          name: '',
          nameShow: '',
          ploygonWidth: 1,
          color: '#2EC5AD',
          extrudedHeight:0,
          outWidth: 0,
          outColor: '#2EC5AD',
          ploygonSpacingDistances: 0,
          ploygonSpacingColor: '#2EC5AD',
          ploygonHaloIntensity: 0,
          ploygonHaloColor: '#2EC5AD',
          ploygonFlowRate: 0,
          ploygonFlowScale: 0,
          ploygonArrowLength: 0,
          ploygonArrowWidth: 0,
        },
        ploygonColorPredefine: [
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
      onPloygonNameShow () {
      },
      onPloygonExtrudedHeight(){

      },
      onPloygonColor () {
      },
      onPloygonOutWidth () {
      },
      onPloygonOutColor () {
      },

      onPloygonHaloIntensity () {
      },
      onPloygonHaloColor () {
      },

    }
  }
</script>

<style>
  #dlgPloygon .el-button {
    padding-left: 6px;
  }

  #dlgPloygon .el-main {
    height: 350px;
    width: 350px;
  }
</style>
