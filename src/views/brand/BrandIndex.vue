<template>
  <div class="brand-page fade-in">
    <!-- 头部导航 -->
    <!-- 品牌主视觉大图 -->
    <section class="brand-hero">
      <div class="hero-text">
        <h1>探索我们的品牌世界</h1>
        <p>时尚·品质·创新，打造属于你的独特风格</p>
      </div>
    </section>

    <!-- 品牌故事 -->
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

    <!-- 品牌系列展示 -->
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

    <!-- 品牌理念 -->
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

    <!-- 品牌动态 -->
    <section class="brand-news container">
      <h2>最新动态</h2>
      <div class="news-slider" @mouseenter="pauseSlider" @mouseleave="startSlider">
        <div class="news-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div class="news-item" v-for="news in newsList" :key="news.id">
            <strong>{{ news.date }}</strong> - {{ news.title }}
          </div>
        </div>
        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 你的品牌名称. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const currentSlide = ref(0)
let sliderInterval: any = null

const startSlider = () => {
  sliderInterval = setInterval(() => {
    nextSlide()
  }, 3000)
}
const pauseSlider = () => {
  clearInterval(sliderInterval)
}
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % newsList.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + newsList.length) % newsList.length
}

onMounted(() => {
  startSlider()
})
onUnmounted(() => {
  pauseSlider()
})
</script>

<style scoped>
/* 页面渐入动画 */
.fade-in {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}
@keyframes fadeInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* 头部导航由Header组件负责 */

.brand-hero {
  background: url('https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 0 20px;
  position: relative;
}
.brand-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1;
}
.brand-hero .hero-text {
  position: relative;
  z-index: 2;
}
.brand-hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.brand-hero p {
  font-size: 1.25rem;
}

/* container */
.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 品牌故事 */
.story-content {
  display: flex;
  gap: 40px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
}
.story-content img {
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(0 0 0 / 0.1);
}
.story-text {
  flex: 1;
  font-size: 1.1rem;
  color: #555;
}

/* 品牌系列 */
.series-list {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}
.series-card {
  position: relative;
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  background: #fff;
}
.series-card:hover {
  transform: translateY(-8px);
}
.series-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.series-card:hover .card-overlay {
  opacity: 1;
}
.view-more {
  background: rgba(255,255,255,0.9);
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}
.view-more:hover {
  transform: scale(1.05);
}

/* 品牌理念 */
.values-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}
.value-item {
  width: 220px;
  text-align: center;
}
.value-item img {
  width: 80px;
  margin-bottom: 12px;
}

/* 新闻轮播 */
.news-slider {
  position: relative;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}
.news-track {
  display: flex;
  transition: transform 0.5s ease;
}
.news-item {
  min-width: 100%;
  background: #f9f9f9;
  padding: 16px;
  text-align: center;
  font-size: 1rem;
  color: #444;
}
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: #fff;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 50%;
}
.prev { left: 10px; }
.next { right: 10px; }

/* 页脚 */
.footer {
  background: #222;
  color: #aaa;
  text-align: center;
  padding: 20px 10px;
  font-size: 0.9rem;
  margin-top: 60px;
}
</style>
