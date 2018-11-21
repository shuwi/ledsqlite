<template>
  <div class="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          项目信息
        </span>
        <system-information></system-information>
        <Button size="small" round @click="test">超小按钮</Button>
      </div>

    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: {
      SystemInformation
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      },
      test() {
        var that = this
        that.$leveldb.put('name', new Date(), function (err) {
          if (err) return that.$Notice.error({
            title: '写入错误',
            desc: err
          })
        })

        that.$leveldb.get('name', function (err, value) {
          if (err) return that.$Notice.error({
            title: '读取错误',
            desc: err
          })
          that.$Notice.success({
            title: '结果',
            desc: value
          })

        })
      }
    }
  }
</script>

<style>

</style>