<template>
  <div style="top:400px;left:10px;   width: 300px;height: 200px;background-color: rgb(250,244,255);position: absolute;z-index: 3">
    <p>子组件data里绑定：</p>
    <input type="text" v-model="testChildData"/>{{testChildData}}
    <br>
    父组件传给子组件的值：{{PtoCData}}
    <el-button @click="testChildMethods">向父组件发送数据</el-button>
  </div>
</template>

<script>
  export default {
    name: 'test_child',
    // props:["PtoCData"],//第一种方式
    props: {//第二种方式
      PtoCData: {
        type: String,
        default: function () {
          return ""
        }
      }
    },
      data () {
      return {
        testChildData:"子组件数据"
      }
    },
    methods:{
      testChildMethods(){

          this.$emit("CtoPData",this.testChildData)
      }
    }
  }
</script>

<style scoped>

</style>
