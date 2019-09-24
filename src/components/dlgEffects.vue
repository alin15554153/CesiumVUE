<template>
  <el-tabs id='dlgEffects' v-model="activeTapName">
    <el-tab-pane label="粒子发射" name="first">
      <el-container>
        <el-header height='40px'>
          <el-row>
            <el-button title="启动绘制" icon="el-icon-plus"></el-button>
            <el-button title="启动删除" icon="el-icon-delete-solid"></el-button>
            <el-button title="启动编辑" icon="el-icon-edit"></el-button>
            <el-button  type="text" title="移动" icon="el-icon-rank" ></el-button>
            <el-button  type="text" title="旋转" icon="el-icon-refresh-right" ></el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-collapse v-model="activeCollapseNames">

            <el-collapse-item title="属性设置" name="1">

              <el-row>
                <el-col :span="4">
                  <el-tag>颜色:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="particleInfo.color"
                                   show-alpha
                                   :predefine="particleColorPredefine" size="mini"
                                  ></el-color-picker>
                </el-col>
                <el-col :span="4">
                  <el-tag>开始:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="particleInfo.startColor"
                                   show-alpha
                                   :predefine="particleColorPredefine" size="mini"
                                  ></el-color-picker>
                </el-col>
                <el-col :span="4">
                  <el-tag>结束:</el-tag>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="particleInfo.endColor"
                                   show-alpha
                                   :predefine="particleColorPredefine" size="mini"
                                  ></el-color-picker>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="5">
                  <el-tag>开始尺寸:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.startScale"></el-slider>
                </el-col>
                <el-col :span="5">
                  <el-tag>结束尺寸:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.endScale"></el-slider>
                </el-col>
              </el-row>

              <el-row>

                <el-col :span="5">
                  <el-tag>最小质量:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.minimumMass"></el-slider>
                </el-col>
                <el-col :span="5">
                  <el-tag>最大质量:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.maximumMass"></el-slider>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <el-tag>最小周期:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.minimumParticleLife"></el-slider>
                </el-col>
                <el-col :span="5">
                  <el-tag>最大周期:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.maximumParticleLife"></el-slider>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <el-tag>最小速度:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.minimumSpeed"></el-slider>
                </el-col>
                <el-col :span="5">
                  <el-tag>最大速度:</el-tag>
                </el-col>
                <el-col :span="7">
                  <el-slider v-model="particleInfo.maximumSpeed"></el-slider>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-button>火焰预设</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button>喷泉预设</el-button>
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
    name: 'dlgEffects',
    data () {
      return {
        activeTapName: 'first',
        activeCollapseNames: ['1', '2'],

        particleInfo: {
          name: '',
          show: '',
          mass: 1,
          minimumMass: 0.5,
          maximumMass: 2,
          velocity: 1,
          lifetime: 1,
          particleLife: 1,
          minimumParticleLife: 1,
          maximumParticleLife: 1,

          color: '#c5985e',
          startColor: '#c52d24',
          endColor: '#c58c2a',
          scale: 10,
          startScale: 5,
          endScale: 1,
          image: '',
          imageSize: 1,
          minimumImageSize: 1,
          maximumImageSize: 1,
          speed: 1,
          minimumSpeed: 1,
          maximumSpeed: 1,

          log: 0.0,
          lat: 0.0,
          alt: 0.0,
          heading: 0.0,
          pitch: 0.0,
          roll: 0.0,

        },
        particleColorPredefine: [
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

      onMinimumMass () {
      },
      onMaximumMass () {

      },
      onMinimumParticleLife(){

      },
      onMaximumParticleLife(){

      },
      onStartColor(){

      },
    }
  }
</script>

<style>
  #dlgEffects .el-button {
    padding-left: 6px;
  }

  #dlgEffects .el-main {
    height: 300px;
    width: 350px;
  }
</style>
