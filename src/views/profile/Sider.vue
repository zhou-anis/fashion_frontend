<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <el-col :span="5">
    <el-menu class="sidebar" mode="vertical"
             :default-active="router.currentRoute.value.path"
             router>
      <el-menu-item index="/center" class="active">个人信息</el-menu-item>
      <el-menu-item index="/center/address">地址管理</el-menu-item>
      <el-menu-item index="/center/orders">全部订单</el-menu-item>
      <el-menu-item index="/center/conf">账号设置</el-menu-item>
    </el-menu>
  </el-col>
</template>

<style scoped>


</style>