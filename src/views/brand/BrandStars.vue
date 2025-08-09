<script setup lang="ts">
interface Ambassador {
  id: number
  name: string
  desc: string
  photo: string
}
const ambassadorsList: Ambassador[] = [
  { id: 1, name: '李一桐', desc: '新生代演员，青春活力的象征，与品牌共同传递积极与时尚。', photo: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/96/null/external-celebrity-music-and-entertainment-flaticons-lineal-color-flat-icons.png' },
  { id: 2, name: '王凯', desc: '知名男演员，沉稳与优雅的代表，完美诠释品牌品质感。', photo: 'https://img.icons8.com/external-flaticons-flat-flat-icons/96/null/external-actor-movie-flaticons-flat-flat-icons.png' },
]
</script>

<template>
  <section class="brand-ambassadors container">
    <h2>明星代言人</h2>
    <div class="ambassadors-grid">
      <div class="ambassador-item" v-for="amb in ambassadorsList" :key="amb.id">
        <img :src="amb.photo" :alt="amb.name" />
        <h4>{{ amb.name }}</h4>
        <p>{{ amb.desc }}</p>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>