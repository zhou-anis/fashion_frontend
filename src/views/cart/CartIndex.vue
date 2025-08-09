<script setup lang="ts">
import httpInstance from "@/requests/http.ts";
import {onMounted, ref} from "vue";

interface CategoryResponse {}

interface ReqResponse {}

const category_list = ref<CategoryResponse>({});
const req_list = ref<ReqResponse>({});

const getCategories = async () => {
  const cate_res = await httpInstance.get("/v1/cate/ls");
  return cate_res;
}

onMounted(async () => {
  const res_ = await getCategories();
  req_list.value = res_.data;
  console.log(req_list.value)
})

</script>

<template>
<h1 style="margin-top: 300px">购物车</h1>
</template>

<style scoped>

</style>