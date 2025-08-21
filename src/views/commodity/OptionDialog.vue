<template>
  <div v-if="visible" class="dialog-overlay" @click.self="close">
    <div class="dialog-box">
      <!-- 顶部商品信息 -->
      <div class="product-info">
        <img :src="`http://localhost:8000${props.product[3]}`" class="product-img" />
        <div class="product-detail">
          <h3>{{ props.product[1] }}</h3>
          <p class="product-price">￥{{ props.product[2] }}</p>
        </div>
      </div>

      <!-- 规格选择 -->
      <div class="spec-section">
        <p class="label">规格：</p>
        <div class="options">
          <button
              v-for="(spec, index) in specs"
              :key="index"
              :class="['option-btn', { active: selectedSpec === spec }]"
              @click="selectedSpec = spec"
          >
            {{ spec }}
          </button>
        </div>
      </div>

      <!-- 颜色选择 -->
      <div class="spec-section">
        <p class="label">颜色：</p>
        <div class="options">
          <button
              v-for="(color, index) in colors"
              :key="index"
              :class="['option-btn', { active: selectedColor === color }]"
              @click="selectedColor = color"
          >
            {{ color }}
          </button>
        </div>
      </div>

      <!-- 数量选择 -->
      <div class="spec-section">
        <p class="label">数量：</p>
        <div class="quantity-box">
          <button @click="decrease">-</button>
          <span>{{ quantity }}</span>
          <button @click="increase">+</button>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="dialog-actions">
        <button class="cancel-btn" @click="close">取消</button>
        <button class="cart-btn" @click="addToCart">加入购物车</button>
        <button class="buy-btn" @click="buyNow">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from "vue";
import {useCommodityStore} from "../../store/commodityStore.ts";

const CommodityStore = useCommodityStore();

const props = defineProps<{
  visible: boolean;
  product: any[];
  specs?: string[];
  colors?: string[];
}>();

const emit = defineEmits(["update:visible", "add-cart", "buy"]);

const selectedSpec = ref<string>("");
const selectedColor = ref<string>("");
const quantity = ref<number>(1);

const close = () => {
  emit("update:visible", false);
};

const increase = () => {
  quantity.value++;
};

const decrease = () => {
  if (quantity.value > 1) quantity.value--;
};

const addToCart = () => {
  if (!selectedSpec.value || !selectedColor.value) {
    alert("请选择规格和颜色！");
    return;
  }
  emit("add-cart", {
    product: CommodityStore.goods,
    spec: selectedSpec.value,
    color: selectedColor.value,
    quantity: quantity.value,
  });
  close();
};

const buyNow = () => {
  if (!selectedSpec.value || !selectedColor.value) {
    alert("请选择规格和颜色！");
    return;
  }
  emit("buy", {
    spec: selectedSpec.value,
    color: selectedColor.value,
    quantity: quantity.value,
  });
  close();
};

</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.dialog-box {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 420px;
  max-width: 90%;
}

/* 顶部商品信息 */
.product-info {
  display: flex;
  gap: 15px;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.product-img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.product-detail h3 {
  margin: 0;
  font-size: 18px;
}

.product-price {
  color: #e63946;
  font-size: 20px;
  margin-top: 6px;
}

/* 规格 & 颜色 */
.spec-section {
  margin: 15px 0;
}

.label {
  font-weight: bold;
  margin-bottom: 6px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-btn {
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: #f8f9fa;
}

.option-btn.active {
  background: #457b9d;
  color: #fff;
  border-color: #457b9d;
}

/* 数量选择 */
.quantity-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-box button {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

/* 底部按钮 */
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.cancel-btn {
  background: #ccc;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.cart-btn {
  background: #1d3557;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.buy-btn {
  background: #e63946;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}
</style>
