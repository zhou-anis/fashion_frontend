<script setup lang="ts">
import {categoryStore} from "@/store/categoryStore.ts";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";


const cateStore = categoryStore();
const listData = ref([]);
const router = useRouter();



onMounted(async ()=>{
  await cateStore.getCategoryList()
  if(cateStore.categoryList.success) {
    listData.value = cateStore.cateList
    console.log(cateStore.categoryList.first_cate_name)
  }

})

// 按 first_category.id 分组，返回一个对象，key 是 first_category.id
const groupedData = computed(() => {
  return listData.value.reduce((acc, item) => {
    const key = item.first_category.id;
    if (!acc[key]) {
      acc[key] = {
        name: item.first_category.name,
        categories: []
      };
    }
    acc[key].categories.push(item);
    return acc;
  }, {} as Record<
      number,
      { name: string; categories: typeof listData.value }
  >);
});

const goConcrete = (itemId) => {
  router.push(`/concrete/${itemId}`)
}
</script>

<template>
  <div class="product-grid" v-for="(group, key) in groupedData" :key="key">
    <h2>{{group.name}}</h2>
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





