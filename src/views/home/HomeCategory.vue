<script setup lang="ts">

</script>

<template>
  <div class="product-grid" v-for="i in 3" :key="i">
    <h2>男士专区</h2>
    <div class="products">
      <div class="product-card" v-for="i in 5" :key="i">
        <img src="@/assets/images/mens-button-up-shirt-urban-fashion.jpg" alt="男士上衣" />
        <h3>男士上衣</h3>
        <p>¥99.00</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>