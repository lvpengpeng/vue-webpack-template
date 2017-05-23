<style>
.header {
  border-bottom: 1px solid #e5e5e5;
}
</style>

<template>
<div>
  <div class="header">
    <Navigator text="首页" url="#/" :isActive="this.$route.path === '/'"/>
    <Navigator text="次页" url="#/second" :isActive="this.$route.path === '/second'"/>
  </div>
  <div style="padding-top: 50px; text-align: center;">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Navigator from './components/Navigator'

export default {
  components: { Navigator }
}
</script>


