<script setup lang="ts">
interface News {
  id: number
  date: string
  title: string
}
const newsList: News[] = [
  { id: 1, date: '2025-07-15', title: '全新秋冬系列发布，尽显温暖与时尚。' },
  { id: 2, date: '2025-06-20', title: '环保系列荣获国际绿色设计奖。' },
  { id: 3, date: '2025-05-10', title: '品牌周年庆，专享限时折扣。' },
]
</script>

<template>
  <section class="brand-news container">
    <h2>最新动态</h2>
    <ul class="news-list">
      <li v-for="news in newsList" :key="news.id">
        <strong>{{ news.date }}</strong> - {{ news.title }}
      </li>
    </ul>
  </section>

</template>

<style scoped>

</style>