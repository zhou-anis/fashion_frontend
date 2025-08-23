<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/resized-removebg-preview.png" style="width: 50px;" alt="">
          <svg width="120" height="50" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">
              AniesFashion
            </text>
          </svg>
        </router-link>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/brand" class="dispatch-link">品牌</router-link></li>
          <li><router-link to="/event" class="dispatch-link">活动</router-link></li>
          <li><router-link to="#" class="dispatch-link">展示</router-link></li>
        </ul>
      </nav>

      <!-- Search Bar -->
      <div class="search-box">
        <input type="text" placeholder="搜索商品..." />
        <button>搜索</button>
      </div>

      <!-- Cart Icon -->
      <div class="cart-icon">
        <a href="/cart">
          <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </a>
      </div>



      <!-- User Actions -->
      <div class="user-actions">
        <template v-if="isLoggedIn">
          <div class="user-dropdown">
            <span class="username">你好，{{ userName ? userName : email }}</span>
            <ul class="dropdown-menu">
              <li><router-link to="/profile">个人中心</router-link></li>
              <li><router-link to="/orders">我的订单</router-link></li>
              <li @click="logOut" style="margin-left: 10px">退出登录</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="login-link">登录</router-link>
          <router-link to="/register" class="reg-link">注册</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import useUserStore from "@/store/userStore.js";
import { ElMessage, ElMessageBox } from 'element-plus'


const userStore = useUserStore();

const isLoggedIn = ref<boolean>(false);
const userName = ref<string>('')
const email = ref<string>('')

if (userStore.isLogin) {
  isLoggedIn.value = true;
  userName.value = userStore.userInfo.username;
  email.value = userStore.userInfo.email;
}


const logOut = () => {
  ElMessageBox.confirm(
      '确认退出吗?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        userStore.logout()
        if (!userStore.userInfo.token) {
          isLoggedIn.value = false;
          ElMessage({
            type: 'success',
            message: '已退出登录!',
          })
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
}


</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.logo svg {
  height: 50px;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-right: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.search-box {
  display: flex;
  flex: 1;
  margin: 0 20px;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-box button {
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.cart-icon svg {
  height: 30px;
}

/* 登录状态下的用户信息下拉 */
.user-actions{
  margin-left: 10px;
}
.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* 紧贴 username 下方 */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  width: 120px;
  display: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2000;
}

.user-dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
  color: skyblue;
}

.dropdown-menu li a {
  display: block;
  width: 100%;
  height: 100%;
  color: #333;
  text-decoration: none;
}

.dropdown-menu li a:hover {
  background-color: #f0f0f0;
  color: skyblue;
}

.user-actions a,
.user-actions .logout-btn {
  margin-left: 10px;
  text-decoration: none;
  color: #333;
}
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

/* Hover Colors */
.login-link:hover,
.reg-link:hover,
.dispatch-link:hover {
  color: skyblue !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-menu {
    width: 100%;
    margin-top: 10px;
  }

  .nav-menu ul {
    flex-direction: column;
  }

  .nav-menu li {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-box {
    width: 100%;
    margin: 10px 0;
  }

  .cart-icon,
  .user-actions {
    margin-top: 10px;
  }

  .dropdown-menu {
    right: auto;
    left: 0;
  }
}

.username:hover{
  color: skyblue;
}

</style>
