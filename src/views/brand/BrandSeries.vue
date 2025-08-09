<script setup lang="ts">
interface Series {
  id: number
  name: string
  desc: string
  img: string
}

const seriesList: Series[] = [
  { id: 1, name: '经典系列', desc: '永不过时的设计，彰显优雅与品味。', img: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: '运动系列', desc: '结合功能与时尚，助你活力每一天。', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: '环保系列', desc: '采用可持续材料，呵护地球家园。', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80' },
]
</script>

<template>
  <section class="brand-series container">
    <h2>品牌系列</h2>
    <div class="series-list">
      <div class="series-card" v-for="series in seriesList" :key="series.id">
        <img :src="series.img" :alt="series.name" />
        <div class="card-overlay">
          <button class="view-more">查看更多</button>
        </div>
        <h3>{{ series.name }}</h3>
        <p>{{ series.desc }}</p>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>