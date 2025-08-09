<script setup lang="ts">
interface Value {
  id: number
  title: string
  desc: string
  icon: string
}
const valuesList: Value[] = [
  { id: 1, title: '可持续发展', desc: '从原材料到生产，全程环保监控。', icon: 'https://img.icons8.com/color/96/000000/leaf.png' },
  { id: 2, title: '创新设计', desc: '融合前沿潮流与实用功能。', icon: 'https://img.icons8.com/color/96/000000/idea.png' },
  { id: 3, title: '卓越品质', desc: '严苛工艺，确保每件产品都精益求精。', icon: 'https://img.icons8.com/color/96/000000/quality.png' },
]
</script>

<template>
  <section class="brand-values container">
    <h2>品牌理念</h2>
    <div class="values-grid">
      <div class="value-item" v-for="value in valuesList" :key="value.id">
        <img :src="value.icon" :alt="value.title" />
        <h4>{{ value.title }}</h4>
        <p>{{ value.desc }}</p>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>