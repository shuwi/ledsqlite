<template>
  <div id="app">
    <div id="topbar">人员信息录入</div>
    <div class="actionBtn-container">
      <div class="minimize actionBtn" @click="minimize">
        <Tooltip content="最小化" placement="bottom">
          <span class="iicon md-remove" color="#000"></span>
        </Tooltip>
      </div>
      <div class="close actionBtn" @click="closeApp">
        <Tooltip content="关闭" placement="bottom">
          <span class="iicon md-close" color="#000"></span>
        </Tooltip>
      </div>
    </div>
    <div id="nav">
      <Menu mode="vertical" :active-name="activeName" @on-select="navclick" width="100px" accordion>
        <MenuItem name="/">人员信息</MenuItem>
      </Menu>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import router from './router'
  const {
    remote
  } = require('electron')

  export default {
    name: 'ledsqlite',
    data() {
      return {
        activeName: '/',
        dialogVisible: false
      };
    },
    methods: {
      navclick(nv, e) {
        router.push(nv)
      },
      closeApp() {
        this.$Modal.confirm({
          title: '提醒',
          content: '<p>确认关闭并退出本系统？</p>',
          onOk: () => {
            remote.app.quit()
          }
        })
      },
      minimize() {
        remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }
  }
</script>

<style>
  body {
    font-family: 'Microsoft Yahei', sans-serif;
    background: #f8fafc;
  }

  #app {
    font-family: 'Microsoft Yahei', sans-serif;
  }

  .wrapper {
    padding: 0;
    margin: 50px auto 0 120px;
  }

  #topbar {
    width: 100%;
    background: #fafbfc;
    padding: 0;
    position: fixed;
    top: 0px;
    left: 0;
    right: 10px;
    line-height: 2.5em;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    border-bottom: 1px solid #e8eaec;
  }

  #nav {
    width: 100px;
    height: 100vw;
    background: #fff;
    padding: 0;
    position: fixed;
    top: 32px;
    left: 0;
    border-right: 1px solid #e8eaec;
  }

  .actionBtn-container {
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    padding: 0 4px;
    z-index: 222;
  }

  .actionBtn {
    -webkit-app-region: no-drag;
    font-size: 16px;
    width: 20px;
    height: 20px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: .7;
    margin: 0;
  }

  .actionBtn:hover {
    opacity: 1;
  }

  .close {
    margin: 0 0 0 10px;
  }

  .ivu-tabs-bar {
    margin-bottom: 0 !important;
  }

  .ivu-menu-item {
    font-size: 12px !important;
  }

  .ivu-modal-mask {
    background-color: rgb(255, 255, 255) !important;
  }

  .ivu-modal-content {
    margin-bottom: 30px;
    border: 1px solid rgba(27, 31, 35, 0.123) !important;
    box-shadow: 0 0 25px 6px rgba(31, 51, 73, .1) !important;
  }

  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 8px 24px !important;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(136, 136, 136, 0.3);
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    background: #797979;
  }

  .iicon{
    display: block;
    height: 12px;
    width: 12px;
    margin: 8px 0 0 0;
    border-radius: 12px;
    background: green;
  }

  .md-close{
    background: red;
    margin: 8px 6px 0 0;
  }
</style>