<template>
  <main class="product-detail-page">
    <!-- 面包屑 -->
    <nav class="breadcrumb">
      <a href="/">首页</a> /
      <a href="/products">商品列表</a> /
      <span>{{ product.name }}</span>
    </nav>

    <!-- 商品详情 -->
    <section class="product-detail">
      <div class="product-gallery">
        <img :src="selectedImage" :alt="product.name" class="main-image" />
        <div class="thumbnail-list">
          <img
              v-for="(img, index) in product.images"
              :key="index"
              :src="img"
              class="thumbnail"
              :class="{ active: img === selectedImage }"
              @click="selectedImage = img"
          />
        </div>
      </div>

      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="brand">品牌：{{ product.brand }}</p>
        <p class="price">￥{{ product.price }}</p>
        <p class="desc">{{ product.description }}</p>

        <div class="options">
          <div class="option">
            <span>颜色：</span>
            <button
                v-for="(color, idx) in product.colors"
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
                v-for="(size, idx) in product.sizes"
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

    <!-- 商品详情和评价 -->
    <section class="product-tabs">
      <div class="tabs">
        <button :class="{ active: activeTab === 'detail' }" @click="activeTab = 'detail'">商品详情</button>
        <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">用户评价</button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'detail'">
          <h2>商品详情</h2>
          <p>{{ product.detailText }}</p>
        </div>
        <div v-else>
          <h2>用户评价</h2>
          <div v-for="(review, index) in product.reviews" :key="index" class="review">
            <p><strong>{{ review.user }}</strong> ⭐ {{ review.rating }}/5</p>
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Product {
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  detailText: string;
  reviews: Review[];
}

const product = ref<Product>({
  name: "时尚夏季连衣裙",
  brand: "优雅女装",
  price: 299,
  description: "这款夏季连衣裙采用轻盈面料，透气舒适，展现优雅气质。",
  images: [
    "src/assets/images/pexels-freestocks-291762.jpg",
    "src/assets/images/pexels-freestocks-291762.jpg",
    "src/assets/images/pexels-freestocks-291762.jpg",
    "src/assets/images/pexels-freestocks-291762.jpg",
  ],
  colors: ["红色", "蓝色", "黑色"],
  sizes: ["S", "M", "L", "XL"],
  detailText: "面料柔软舒适，适合夏季穿着，轻松展现女性魅力。",
  reviews: [
    { user: "Alice", rating: 5, comment: "穿上很漂亮，布料很舒服！" },
    { user: "Bob", rating: 4, comment: "性价比高，尺码刚好。" },
  ],
});

const selectedImage = ref(product.value.images[0]);
const selectedColor = ref(product.value.colors[0]);
const selectedSize = ref(product.value.sizes[0]);
const quantity = ref<number>(1);
const activeTab = ref<"detail" | "reviews">("detail");
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
