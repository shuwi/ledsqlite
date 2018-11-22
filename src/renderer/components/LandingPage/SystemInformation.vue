<template>
  <div class="sysinfo">
    <Card title="系统信息" icon="ios-options" dis-hover>
      <CellGroup>
        <Cell title="APP" :label="app" />
        <Cell title="路径" :label="path" />
        <Cell title="组件名称" :label="name" />
        <Cell title="Vue.js" :label="vue" />
        <Cell title="Electron" :label="electron" />
        <Cell title="Node.js" :label="node" />
        <Cell title="平台" :label="platform" />
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        app: require('electron').remote.app.getLocale(),
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
  .sysinfo {
    padding: 10px;
    background: #fafbfc;
    width: 400px;
    margin: 20px 0;
  }
</style>