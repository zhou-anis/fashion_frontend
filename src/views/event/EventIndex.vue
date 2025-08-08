<template>
  <div class="events-page fade-in">
    <!-- 头部导航 -->
    <!-- 活动主视觉 -->
    <section class="events-hero">
      <div class="hero-text">
        <h1>季节焕新 · 限时优惠</h1>
        <p>四季潮流，尽在本季活动</p>
      </div>
    </section>

    <!-- 活动分类 -->
    <section class="events-category container">
      <h2>四季活动</h2>
      <div class="category-list">
        <div class="category-card" v-for="cat in categoryList" :key="cat.id">
          <img :src="cat.img" :alt="cat.title" />
          <div class="card-info">
            <h3>{{ cat.title }}</h3>
            <p>{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 限时秒杀 -->
    <section class="flash-sale container">
      <h2>限时秒杀</h2>

      <div class="sale-list">
        <div class="sale-item" v-for="item in saleList" :key="item.id">
          <img :src="item.img" :alt="item.name" />
          <h3>{{ item.name }}</h3>
          <p class="price"><span class="old">¥{{ item.oldPrice }}</span> ¥{{ item.newPrice }}</p>
        </div>
      </div>
    </section>

    <!-- 节日专区 -->
    <section class="holiday-section container">
      <h2>节日特惠</h2>
      <div class="holiday-list">
        <div class="holiday-card" v-for="holiday in holidayList" :key="holiday.id">
          <img :src="holiday.img" :alt="holiday.title" />
          <div class="holiday-info">
            <h3>{{ holiday.title }}</h3>
            <p>{{ holiday.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 活动规则 -->
    <section class="rules container">
      <h2>活动规则</h2>
      <ul>
        <li>活动时间：以页面显示时间为准</li>
        <li>所有折扣仅限活动期间有效</li>
        <li>优惠不可与其他促销叠加</li>
        <li>本活动最终解释权归本店所有</li>
      </ul>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 你的品牌名称. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 活动分类
const categoryList = [
  { id: 1, title: '春日焕新', desc: '轻盈舒适，畅享春日', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: '夏日狂欢', desc: '清凉一夏，热情无限', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: '秋季精选', desc: '温暖色调，沉稳气质', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: '冬日暖心', desc: '保暖与时尚兼得', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80' },
]

// 限时秒杀
const saleList = [
  { id: 1, name: '轻薄羽绒服', oldPrice: 499, newPrice: 299, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3d3f?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: '夏日T恤', oldPrice: 129, newPrice: 79, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: '针织毛衣', oldPrice: 299, newPrice: 179, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
]

// 节日特惠
const holidayList = [
  { id: 1, title: '情人节专场', desc: '情侣装限时8折', img: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: '圣诞节特卖', desc: '暖冬好礼，全场7折', img: 'https://images.unsplash.com/photo-1512386233331-f023884a544f?auto=format&fit=crop&w=600&q=80' },
]

</script>

<style scoped>
.fade-in {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}
@keyframes fadeInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.events-hero {
  background: url('https://images.unsplash.com/photo-1531928351158-2f736078e0a8?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}
.events-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}
.hero-text {
  position: relative;
  z-index: 1;
  text-align: center;
}
.hero-text h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}
.hero-text p {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 活动分类 */
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.category-card {
  width: 260px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.1);
  background: white;
  transition: transform 0.3s ease;
}
.category-card:hover {
  transform: translateY(-8px);
}
.category-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-info {
  padding: 10px;
  text-align: center;
}

/* 限时秒杀 */
.countdown {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 20px;
}
.sale-list {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.sale-item {
  width: 200px;
  text-align: center;
}
.sale-item img {
  width: 100%;
  border-radius: 8px;
}
.price {
  font-size: 1.2rem;
  margin-top: 8px;
}
.price .old {
  text-decoration: line-through;
  color: #999;
  margin-right: 6px;
}

/* 节日专区 */
.holiday-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.holiday-card {
  width: 360px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.1);
  background: white;
}
.holiday-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.holiday-info {
  padding: 10px;
  text-align: center;
}

/* 活动规则 */
.rules ul {
  list-style: disc;
  padding-left: 20px;
  color: #555;
}

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
