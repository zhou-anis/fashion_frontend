<template>
  <div class="home-container">
    <!-- Hero Banner -->
    <HeroBanner></HeroBanner>
    <!-- Category Grid first -->
    <CategorySection></CategorySection>

  </div>
</template>

<script setup lang="ts">
import './home.css'
import HeroBanner from "@/views/home/HeroBanner.vue";
import CategorySection from "@/views/home/CategorySection.vue";
</script>

