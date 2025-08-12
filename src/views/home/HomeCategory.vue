<script setup lang="ts">
import {categoryStore} from "@/store/categoryStore.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


const cateStore = categoryStore();
const listData = ref([]);
const router = useRouter();

onMounted(async ()=>{
  await cateStore.getCategoryList()
  console.log(cateStore.categoryList)
  if(cateStore.categoryList.success) {
    listData.value = cateStore.cateList
  }
})

const goConcrete = (itemId) => {
  router.push(`/concrete/${itemId}`)
}
</script>

<template>
  <div class="product-grid" v-for="i in 3" :key="i">
    <h2>男士专区</h2>
    <div class="products">
      <div class="product-card" v-for="item in listData" :key="item.id" @click="goConcrete(item.id)">
        <img :src="`http://localhost:8000${item.image}`" style="height: 300px" alt="男士上衣" />
        <h3>{{item.category_name}}</h3>
<!--        <p>{{item}}</p>-->
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>