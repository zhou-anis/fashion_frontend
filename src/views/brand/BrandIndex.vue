<template>
  <div class="brand-page fade-in">
    <!-- 品牌主视觉大图 -->
    <BrandHero />

    <!-- 品牌故事 -->
    <BrandStory />

    <!-- 品牌系列展示 -->
    <BrandSeries />

    <!-- 品牌理念 -->
    <BrandValue/>

    <!-- 明星代言人 -->
    <BrandStars/>

    <!-- 品牌荣誉 -->
    <BrandAwards/>

    <!-- 最新动态（取消轮播） -->
    <BrandNews/>
    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 Fashion Hub. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import BrandHero from "@/views/brand/BrandHero.vue";
import BrandStory from "@/views/brand/BrandStory.vue";
import BrandSeries from "@/views/brand/BrandSeries.vue";
import BrandValue from "@/views/brand/BrandValue.vue";
import BrandStars from "@/views/brand/BrandStars.vue";
import BrandAwards from "@/views/brand/BrandAwards.vue";
import BrandNews from "@/views/brand/BrandNews.vue";

import './brand.css'



</script>

<style scoped>

</style>
