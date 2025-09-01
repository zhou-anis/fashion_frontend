<template>
  <main class="product-detail-page">
    <!-- 面包屑 -->
    <nav class="breadcrumb" v-if="item">
      <a href="/">首页</a> /
      <a href="/products">商品列表</a> /
      <span>{{ item.name }}</span>
    </nav>

    <!-- 商品详情 -->
    <section v-if="item" class="product-detail">
      <div class="product-gallery">
        <img
            :src="`http://127.0.0.1:8000${selectedImage || item.image}`"
            :alt="item.name"
            class="main-image"
        />
        <div class="thumbnail-list">
          <img
              v-for="i in 4"
              :key="i"
              :src="`http://127.0.0.1:8000${item.image}`"
              class="thumbnail"
              :class="{ active: `http://127.0.0.1:8000${item.image}` === selectedImage }"
              @click="selectedImage = `http://127.0.0.1:8000${item.image}`"
          />
        </div>
      </div>

      <div class="product-info">
        <h1>{{ item.name }}</h1>
        <p class="brand">品牌：{{ item.name }}</p>
        <p class="price">￥{{ item.price }}</p>
        <p class="desc">{{ item.name }}</p>

        <div class="options">
          <div class="option">
            <span>颜色：</span>
            <button
                v-for="(color, idx) in ['红色', '黄色', '蓝色', '绿色']"
                :key="idx"
                :class="{ active: color === selectedColor }"
                @click="selectedColor = color"
            >
              {{ color }}
            </button>
          </div>
          <div class="option">
            <span>尺码：</span>
            <button
                v-for="(size, idx) in ['M', 'L', 'XL', 'XXL']"
                :key="idx"
                :class="{ active: size === selectedSize }"
                @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="actions">
          <input type="number" v-model="quantity" min="1" />
          <button class="add-to-cart">加入购物车</button>
          <button class="buy-now">立即购买</button>
        </div>
      </div>
    </section>

    <!-- 加载中提示 -->
    <section v-else>
      <p>加载中...</p>
    </section>

    <!-- 商品详情和评价 -->
    <section v-if="item" class="product-tabs">
      <div class="tabs">
        <button :class="{ active: activeTab === 'detail' }" @click="activeTab = 'detail'">商品详情</button>
        <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">用户评价</button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'detail'">
          <h2>商品详情</h2>
          <p>无</p>
        </div>
        <!--
        <div v-else>
          <h2>用户评价</h2>
          <div v-for="(review, index) in product.reviews" :key="index" class="review">
            <p><strong>{{ review.user }}</strong> ⭐ {{ review.rating }}/5</p>
            <p>{{ review.comment }}</p>
          </div>
        </div>
        -->
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useDetailStore from "../../store/detailStore.ts";
import type { commodity } from "../../store/detailStore.ts";

const route = useRoute();
const detailStore = useDetailStore();

const quantity = ref<number>(1);
const item = ref<commodity | null>(null);

const selectedImage = ref<string>("");
const selectedColor = ref<string>("");
const selectedSize = ref<string>("");
const activeTab = ref<string>("detail");

onMounted(async () => {
  await detailStore.getDetail(Number(route.params.id));
  item.value = detailStore.item;
  if (item.value) {
    selectedImage.value = `http://127.0.0.1:8000${item.value.image}`;
  }
});
</script>

<style scoped>
.product-detail-page {
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.breadcrumb {
  font-size: 14px;
  margin-bottom: 20px;
}
.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}
.breadcrumb span {
  color: #666;
}

.product-detail {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}
.product-gallery {
  flex: 1;
}
.main-image {
  width: 100%;
  max-width: 500px;
  border: 1px solid #eee;
}
.thumbnail-list {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.thumbnail {
  width: 60px;
  height: 80px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: 0.3s;
}
.thumbnail.active,
.thumbnail:hover {
  border-color: #007bff;
}

.product-info {
  flex: 1;
}
.product-info h1 {
  margin-bottom: 10px;
}
.price {
  font-size: 20px;
  color: #e60023;
  margin: 10px 0;
}
.options {
  margin: 20px 0;
}
.option {
  margin-bottom: 10px;
}
.option button {
  margin-right: 8px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}
.option button.active {
  border-color: #007bff;
  background: #e6f0ff;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.actions input {
  width: 60px;
  padding: 5px;
}
.actions button {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
}
.add-to-cart {
  background: #007bff;
  color: #fff;
}
.buy-now {
  background: #e60023;
  color: #fff;
}

.product-tabs {
  margin-top: 30px;
}
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.tabs button {
  padding: 10px 20px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
}
.tabs button.active {
  background: #007bff;
  color: #fff;
}
.tab-content {
  border: 1px solid #eee;
  padding: 20px;
}
.review {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
