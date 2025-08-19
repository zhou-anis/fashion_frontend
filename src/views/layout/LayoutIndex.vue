<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "@/views/layout/Footer.vue";

import { computed } from "vue";
import {useRoute} from "vue-router";



const route = useRoute();
const isHome = computed(() => route.path === "/");
if (isHome) {
  document.title = "Fashion Hub - 首页";
}
</script>

<template>
  <Header></Header>
  <div class="main-container">
  <router-view></router-view>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.main-container {
  padding-top: 80px;
}
</style>