<template>
  <div class="user-center">


    <el-row class="main" gutter={20}>
      <!-- 左侧菜单 -->
      <Sider/>


      <!-- 右侧内容 -->
      <router-view/>
    </el-row>
  </div>
</template>

<script setup>
import Sider from "./Sider.vue";
import './center.css'
</script>

<style scoped>

</style>
