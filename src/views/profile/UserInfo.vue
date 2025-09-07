<script setup lang="ts">
import { ref } from 'vue';
import useUserStore from "../../store/userStore.ts";
import httpInstance from "../../requests/http.ts";
import {ElMessage} from "element-plus";


interface activationType {
  code: number,
  success: boolean,
  message: string
  data: {}
}


// 存储用户的 Email 信息
const userStore = useUserStore();
const isActive = ref<string>("");
const userEmail = ref<string>("")
const userName = ref<string>("")
const isDisable = ref<boolean>(false);


if (userStore.userInfo?.username) {
  userName.value = userStore.userInfo.username;
}

if (userStore.userInfo?.email) {
  userEmail.value = userStore.userInfo.email;
}

if (userStore.userInfo?.is_active) {
  isActive.value = "已激活"
}
else {
  isActive.value = "未激活";
}


const recentItems = [
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/e3c3a5/000000&text=360+N6+Pro', price: '2699.00' },
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/cccccc/000000&text=360+N6+Pro', price: '2699.00' },
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/dd5555/000000&text=360+N6+Pro', price: '2699.00' },
  { name: 'Apple iPad', image: 'https://dummyimage.com/150x200/eeeeee/000000&text=iPad', price: '2699.00' },
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/e3c3a5/000000&text=360+N6+Pro', price: '2699.00' },
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/cccccc/000000&text=360+N6+Pro', price: '2699.00' },
  { name: '360手机 N6 Pro 全网通', image: 'https://dummyimage.com/150x200/dd5555/000000&text=360+N6+Pro', price: '2699.00' },
  { name: 'Apple iPad', image: 'https://dummyimage.com/150x200/eeeeee/000000&text=iPad', price: '2699.00' },
];


const sendActivation = async () => {
  const res = await httpInstance.get<activationType>(`/v1/user/activation?email=${userEmail.value}`)
  if (res.data.success) {
    isDisable.value = true;
    ElMessage.success(String(res.data.message))
    // TODO: 按钮显示倒计时：
  }
  else {
    ElMessage.error('发送请求失败，请重新发送')
  }
}
</script>

<template>
  <el-col :span="19">
    <!-- 基本信息 -->
    <div class="info">
      <h3>基本信息</h3>
      <el-form label-width="80px" class="info-form">
        <el-form-item label="用户名">
          <span>{{userName}}</span>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userEmail" placeholder="请输入Email" />
          <el-button type="primary" @click="sendActivation" :disabled="isDisable">激活</el-button>
        </el-form-item>
        <el-form-item label="状态">
          <el-button :disabled="true">{{ isActive }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 最近浏览 -->
    <div class="recent">
      <h3>最近浏览</h3>
      <el-row gutter={20}>
        <el-col :span="6" v-for="(item, index) in recentItems" :key="index">
          <el-card :body-style="{ padding: '20px' }">
            <img :src="item.image" class="item-image" />
            <div class="item-info">
              <p>{{ item.name }}</p>
              <p class="price">￥{{ item.price }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-col>
</template>

<style scoped>

</style>