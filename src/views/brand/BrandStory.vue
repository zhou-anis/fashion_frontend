<script setup lang="ts">

</script>

<template>
  <section class="brand-story container">
    <h2>品牌故事</h2>
    <div class="story-content" v-for="i in 4" :key="i">
      <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80" alt="品牌故事图" />
      <div class="story-text">
        <p>
          我们品牌始于对美与品质的执着追求，结合现代设计理念与精湛工艺，
          致力于为每一位顾客打造兼具时尚与舒适的服饰。秉承可持续发展的原则，
          我们不断创新，只为带来更好的穿着体验。
        </p>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>