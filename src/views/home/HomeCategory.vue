<script setup lang="ts">
import {categoryStore} from "../../store/categoryStore.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


const cateStore = categoryStore();
const listData = ref([]);
const router = useRouter();



onMounted(async ()=>{
  await cateStore.getCategoryList()
  if(cateStore?.categoryList?.success) {
    listData.value = cateStore.FirstCateList;
    console.log(listData.value);
  }

})


const goCommodities = (first_cate_id: number, itemId: number) => {
  router.push(`/commodities/${first_cate_id}/${ itemId>9 ? itemId-9 : itemId }`);
}

</script>

<template>
  <div class="product-grid" v-for="first_cate in listData" :key="first_cate?.id">
    <h2>{{first_cate.name}}</h2>
    <div class="products">
      <div class="product-card" v-for="item in first_cate.secondary_category" :key="item.id" @click="goCommodities(first_cate?.id, item.id)">
        <img :src="`http://127.0.0.1:8000${item.image}`" style="height: 300px" alt="男士上衣" />
        <h3>{{item.category_name}}</h3>
<!--        <p>{{item}}</p>-->
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>





