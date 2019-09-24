<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import 'assets/css/geoFont/iconfont.css';

  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    color: #000;
    overflow: hidden;
  }

  /******************************************************tab标签页*/
  body .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }

  /*tab组*/
  body .el-tabs__item {
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

  /*tab组鼠标划过*/
  body .el-tabs__item:hover {
    color: #409EFF;
    cursor: pointer;
  }

  /*tab组鼠标选中*/
  body .el-tabs__item.is-active {
    color: #409EFF;
  }

  /*tab组容器*/
  body .el-tabs__content {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  /*tab组面板*/
  body .el-tab-pane {
    height: 100%;
    background-color: rgba(38, 38, 38, 0.7);
  }

  /****************************************************el-container容器*/
  body .el-header {
    padding: 2px 5px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  /*el-container下的el-main*/
  body .el-main {
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
    background: rgba(255, 255, 255, 0);
  }

  /******************************************************el-collapse折叠*/
  body .el-collapse-item__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 28px;
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

  body .el-collapse-item__wrap {
    will-change: height;
    background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #2ec5ad;
  }

  body .el-collapse-item__content {
    padding-bottom: 5px;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
  }


/*****************************************************************el-col布局*/
  body .el-col {
    padding: 5px
  }


  /***************************************************************弹出层*/

  body .el-dialog {
    background-color: rgba(38, 38, 38, 0.7);
  }
  body .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #2ec5ad;
  }

  /*弹出层主体*/
  body .el-dialog__body {
    padding: 0px 20px;
    color: #2ec5ad;
    font-size: 14px;
    word-break: break-all;
  }
/****************************************************************el-tag标签*/
  body .el-tag {
    background-color: rgba(236, 245, 255, 0);
    border-color: rgba(217, 236, 255, 0);
    display: inline-block;
    height: 30px;
    padding: 0 5px;
    line-height: 30px;
    font-size: 14px;
    color: #2EC5AD;
    border-width: 0px;
    border-style: solid;
    border-radius: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
  }

  /*************************************************************el-checkbox复选框*/
  body .el-checkbox.is-bordered.el-checkbox--mini {
    padding: 5px 15px 3px 10px;
    border-radius: 0px;
    height: 30px;
  }
  body .el-checkbox.is-bordered {
    padding: 9px 20px 9px 10px;
    border-radius: 0px;
    border: 1px solid #2ec5ad;;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
    height: 40px;
  }
  body .el-checkbox--mini:hover {
    border: 1px solid #C0C4CC;
  }

  /************************************************elm颜色选择器*/
  body .el-color-picker__trigger {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    padding: 0px;
    border: 1px solid #2ec5ad;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
  }

  /************************************************el-input__inner*/
  body .el-input__inner {
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0);
    background-image: none;
    border-radius: 0px;
    border: 1px solid #2EC5AD;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #409EFF;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 5px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  /**input头*/
  body .el-input-group__append,
  body .el-input-group__prepend {
    background-color: rgba(245, 247, 250, 0);
    color: #2EC5AD;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #2EC5AD;
    border-radius: 0px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  /*********************************************************el-button按钮*/
  body .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgba(255, 255, 255, 0);
    border: 0px solid #2ec5ad;
    color: #2ec5ad;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0px;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 0px 0px;
    font-size: 18px;
    border-radius: 0px;
  }

  body .el-button + .el-button {
    margin-left: 0px;
  }
  /*所有elm按钮鼠标划过*/
  body .el-button:hover {
    color: #409EFF;
    background: #2c3e50;
  }
  /*容器头里的button*/
  body .el-button i {
    padding: 8px 2px;
  }

  /*****************************************************************表单*/
  body .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #2ec5ad;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body .el-form-item {
    margin-bottom: 12px;
  }

  /***********************************************************el-input-number计数器*/
  body .el-input-number {
    position: relative;
    display: inline-block;
    width: 100%;
    /*line-height: 38px;*/
  }

  body .el-input-number__decrease,
  body .el-input-number__increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    background-color: rgba(38, 38, 38, 0.7);
    color: #2ec5ad;
    cursor: pointer;
    font-size: 13px;
  }



  /**********************************************************el-switch开关*/
  body .el-switch{
    margin: 4px 2px;
  }
  body .el-switch__core {
    margin: 0;
    position: relative;
    width: 30px;
    height: 14px;
    border: 1px solid #DCDFE6;
    outline: 0;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #DCDFE6;
    -webkit-transition: border-color .3s,background-color .3s;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
  }
  /*开关里的点*/
  body .el-switch__core:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    -webkit-transition: all .3s;
    transition: all .3s;
    width: 10px;
    height: 10px;
    background-color: #FFF;
  }
  body .el-switch.is-checked .el-switch__core::after {
    left: 100%;
    margin-left: -11px;
  }
  /*****************************************************************el-slider滑块*/
  body .el-slider {
    margin: 0;
    padding: 12px 0px  12px 5px;
  }
  /*滑块线*/
  body .el-slider__runway {
    width: 100%;
    height: 6px;
    margin: 0px 0;
    background-color: #E4E7ED;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }
  /*滑块线*/
  body .el-slider__button {
    width: 12px;
    height: 12px;
    border: 2px solid #409EFF;
    background-color: #FFF;
    border-radius: 50%;
    -webkit-transition: .2s;
    transition: .2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
