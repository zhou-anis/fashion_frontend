<template>
  <div class="product-page">
    <h2 class="title">商品展示</h2>

    <!-- 商品列表 -->

    <div class="product-grid">
        <div
            class="product-card"
            v-for="product in CommodityStore.goods"
            :key="product.id"
            @click="goDetail(Number(product.id))"
        >
          <img :src="`http://localhost:8000${product.image}`" alt="product" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">￥{{ product.price }}</p>
          <button class="option-button" @click.stop="openOptionDialog(product)">加入购物车</button>
          <button class="option-button">立即购买</button>
        </div>
    </div>

    <OptionDialog
        v-model:visible="dialogVisible"
        :product="[selectedProduct, productName, productPrice, productImage]"
        :specs="['S', 'M', 'L', 'XL']"
        :colors="['白色', '黑色', '蓝色']"
        @add-cart="handleAddCart"
        @buy="handleBuy"></OptionDialog>

    <!-- 分页 -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
      <span>第 {{ currentPage }} / {{ CommodityStore?.resResponse?.total_pages }} 页</span>
      <button :disabled="currentPage === CommodityStore?.resResponse?.total_pages" @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionDialog from "./OptionDialog.vue";

import {onMounted, ref} from "vue";
import { useRouter, useRoute } from "vue-router";
import {useCommodityStore} from "../../store/commodityStore.ts";
import {useCartStore} from "../../store/cartStore.ts";
import {ElMessage} from "element-plus";


const router = useRouter();
const route = useRoute();
const CommodityStore = useCommodityStore();

// // 分页逻辑
const currentPage = ref<number>(1);

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await CommodityStore.getGoodsList(Number(route.params.first_cate_id),Number(route.params.id), currentPage.value)
    window.scrollTo(0, 0)
  }
};
const nextPage = async () => {
  if (currentPage.value < (CommodityStore?.resResponse?.total_pages || 1)) {
    currentPage.value++;
    await CommodityStore.getGoodsList(Number(route.params.first_cate_id),Number(route.params.id), currentPage.value);
    window.scrollTo(0, 0)
  }
};
const goDetail = (id: number) => {
  router.push(`/detail/${id}`);
}


const products = ref<any>([])

onMounted(async () => {
  await CommodityStore.getGoodsList(Number(route.params.first_cate_id), Number(route.params.id), 1)
  console.log(CommodityStore.goods)
  products.value = CommodityStore.goods;
})


const dialogVisible = ref(false);
const dialogTitle = ref("选择规格");
const specOptions = ref<string[]>([]); // 动态传入规格
const selectedProduct = ref<any>(null);
const productName = ref<string>("");
const productPrice = ref<number>(0);
const productImage = ref<string>("");

const openOptionDialog = (product: any) => {
  selectedProduct.value = product.id;
  productName.value = product.name;
  productPrice.value = product.price;
  productImage.value = product.image;
  dialogTitle.value = `选择 ${product.name} 的规格`;
  specOptions.value = ["S", "M", "L", "XL"]; // 这里可以根据 product 动态加载
  dialogVisible.value = true;
};
const cartStore = useCartStore();

const handleAddCart = (payload?: { spec?: string; color?: string; quantity?: number }) => {
  cartStore.addCart({
    productId: selectedProduct.value,
    name: productName.value,
    price: productPrice.value,
    image: productImage.value,
    spec: payload?.spec,
    color: payload?.color,
    quantity: payload?.quantity ?? 1,
  });
  dialogVisible.value = false
  ElMessage.success('已加入购物车')
}

</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  border-radius: 8px;
}

.product-name {
  font-size: 18px;
  margin: 10px 0;
}

.product-price {
  font-size: 16px;
  color: #e63946;
  margin-bottom: 10px;
}

.option-button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: #457b9d;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 5px;
}

.option-button:hover {
  background: #1d3557;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.pagination button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.2s;
}

.pagination button:hover {
  background: #e9ecef;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
