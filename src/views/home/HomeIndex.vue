<template>
  <div class="home-container">
    <!-- Hero Banner -->
    <HomeBanner></HomeBanner>
    <!-- Category Grid first -->
    <HomeCategory></HomeCategory>

  </div>
</template>

<script setup lang="ts">
import './home.css'
import HomeBanner from "./HomeBanner.vue";
import HomeCategory from "./HomeCategory.vue";
</script>

