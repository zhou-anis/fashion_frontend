<template>
  <div class="cart-page">
    <h2 class="title">我的购物车</h2>

    <div v-if="items.length === 0" class="empty">
      <p>购物车空空如也～</p>
      <router-link class="go-shopping" to="/">去逛逛</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-list">
        <div class="cart-item" v-for="item in items" :key="item.key">
          <img class="thumb" :src="fullImage(item.image)" alt="" />
          <div class="info">
            <h3 class="name">{{ item.name }}</h3>
            <p class="sku" v-if="item.spec || item.color">
              <span v-if="item.spec">规格：{{ item.spec }}</span>
              <span v-if="item.color" style="margin-left:8px;">颜色：{{ item.color }}</span>
            </p>
            <p class="price">￥{{ item.price }}</p>
          </div>

          <div class="qty">
            <button class="btn" @click="decrement(item)">-</button>
            <input class="input" type="number" min="1" v-model.number="item.quantity" @change="update(item)" />
            <button class="btn" @click="increment(item)">+</button>
          </div>

          <div class="subtotal">￥{{ (item.price * item.quantity).toFixed(2) }}</div>
          <button class="remove" @click="remove(item.key)">删除</button>
        </div>
      </div>

      <div class="summary">
        <p>共 <b>{{ totalCount }}</b> 件商品</p>
        <p>小计 <b>￥{{ totalPrice.toFixed(2) }}</b></p>
        <button class="checkout">去结算</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import { useCartStore } from '@/store/cartStore'
import useUserStore from "@/store/userStore.ts";

const user = useUserStore();
const cart = useCartStore()
const items = computed(() => cart.items)
const totalCount = computed(() => cart.totalCount)
const totalPrice = computed(() => cart.totalPrice)

const remove = (key: string) => cart.removeItem(key)
const update = (item: any) => cart.updateQuantity(item.key, item.quantity)
const increment = (item: any) => cart.updateQuantity(item.key, item.quantity + 1)
const decrement = (item: any) => cart.updateQuantity(item.key, Math.max(1, item.quantity - 1))

const fullImage = (img: string) => (img?.startsWith('http') ? img : `http://localhost:8000${img}`)
onMounted(() => {
  if (!user.userInfo.token){
    cart.clear()
  }
})
</script>

<style scoped>
.cart-page { max-width: 1100px; margin: 0 auto; padding: 20px; }
.title { font-size: 24px; font-weight: 700; margin-bottom: 16px; }

.empty { text-align: center; padding: 60px 0; color: #666; }
.go-shopping { display: inline-block; margin-top: 12px; padding: 8px 14px; background: #457b9d; color: #fff; border-radius: 8px; text-decoration: none; }

.cart-content { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
.cart-list { background: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.06); }

.cart-item { display: grid; grid-template-columns: 80px 1fr 160px 120px auto; align-items: center; gap: 14px; padding: 12px 8px; border-bottom: 1px solid #f0f0f0; }
.cart-item:last-child { border-bottom: none; }

.thumb { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; }
.info .name { font-size: 16px; margin: 4px 0; }
.info .sku { color: #777; font-size: 13px; }
.price { color: #e63946; font-weight: 600; }

.qty { display: flex; align-items: center; gap: 6px; }
.btn { width: 28px; height: 28px; border: 1px solid #ddd; background: #f8f8f8; border-radius: 6px; cursor: pointer; }
.input { width: 56px; height: 30px; text-align: center; border: 1px solid #ddd; border-radius: 6px; }

.subtotal { font-weight: 700; text-align: right; }
.remove { border: none; background: transparent; color: #888; cursor: pointer; }
.remove:hover { color: #e63946; }

.summary { height: fit-content; background: #fff; border-radius: 12px; padding: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.06); position: sticky; top: 16px; }
.summary p { display: flex; justify-content: space-between; margin: 10px 0; }
.checkout { width: 100%; padding: 10px 12px; border: none; border-radius: 10px; background: #457b9d; color: #fff; cursor: pointer; }
.checkout:hover { background: #1d3557; }

@media (max-width: 900px) {
  .cart-content { grid-template-columns: 1fr; }
  .cart-item { grid-template-columns: 70px 1fr; grid-auto-rows: auto; }
  .qty, .subtotal, .remove { justify-self: start; }
}
</style>
