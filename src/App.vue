
<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>
<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
</style>
