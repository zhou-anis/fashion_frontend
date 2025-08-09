<script setup lang="ts">
interface Award {
  id: number
  title: string
  desc: string
  icon: string
}
const awardsList: Award[] = [
  { id: 1, title: '国际绿色设计奖', desc: '表彰品牌在环保与可持续发展领域的突出贡献。', icon: 'https://img.icons8.com/color/96/000000/trophy.png' },
  { id: 2, title: '最佳创新时尚品牌', desc: '年度评选中脱颖而出，展现品牌创新实力。', icon: 'https://img.icons8.com/color/96/000000/medal.png' },
]
</script>

<template>
  <section class="brand-awards container">
    <h2>品牌荣誉</h2>
    <div class="awards-grid">
      <div class="award-item" v-for="award in awardsList" :key="award.id">
        <img :src="award.icon" :alt="award.title" />
        <h4>{{ award.title }}</h4>
        <p>{{ award.desc }}</p>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>