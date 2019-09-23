<template>
  <div  id="dialogCom">
    <div @mousedown="mousedown" id='dialogHandle'>
          <a id = 'dialogClose' title='关闭' class='btn'><span class='el-icon-close' style="border: #2c3e50 2px" @click="closeMyself"></span></a>
    </div>
    <div id='dialogContainer'>
      <slot>empty</slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dialogCom',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    /** 关闭 */
    closeMyself () {
      this.$emit('on-close')
    },

    /** 窗口拖拽 */
    mousedown (event) {
      var dialogCom = event.currentTarget.parentNode;
      dialogCom.style.cursor = 'move'
      var distanceX = event.clientX - dialogCom.offsetLeft
      var distanceY = event.clientY - dialogCom.offsetTop

      document.onmousemove = function (ev) {
        var oevent = ev || event
        dialogCom.style.left = oevent.clientX - distanceX + 'px'
        dialogCom.style.top = oevent.clientY - distanceY + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        dialogCom.style.cursor = 'default'
      }
    }
  }
}
</script>

<style type="less">
  #dialogCom{
    position: absolute;
    background-color: rgba(38, 38, 38, 0.75);
    z-index: 3;
  }
  /***/
  #dialogHandle{
    position: relative;
    /* float: left; */
    background-color: rgba(38, 38, 38, 0);
    width: 100%;
    height: 28px;
  }
  #dialogClose{
    position: relative;
    width: 28px;
    height: 28px;
    padding: 0px 3px;
    font-size: 20px;
    float: right;
    background-color: rgba(38, 38, 38, 0.2);
  }
  #dialogClose:hover{
    background-color: #aa0024;
  }
  #dialogContainer{
    margin: 0px 20px 20px 20px;
  }
</style>
