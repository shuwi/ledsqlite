<template>
  <div class="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          工人信息
        </span>
        <system-information></system-information>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'workers',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
 
</style>
