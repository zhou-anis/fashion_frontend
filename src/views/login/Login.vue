<template>
  <div class="login-container">
    <div class="form-box">
      <h2>登录</h2>
      <form>
        <div class="form-group">
          <label for="username">用户名或邮箱</label>
          <input type="text" id="username" placeholder="请输入用户名或邮箱" />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" placeholder="请输入密码" />
        </div>
        <button type="submit">登录</button>
      </form>
      <p class="link">
        还没有账号？<a href="/register">立即注册</a>
      </p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Footer from "@/views/layout/Footer.vue";
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); /* Adjust for header height */
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
  ), url('../../assets/images/login.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-box {
  background-color: transparent; /* Slightly transparent for contrast */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: #555555 5px solid;
}

.form-box h2 {
  color: honeydew;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  color: honeydew;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #555;
}

.link {
  margin-top: 15px;
}

.link a {
  color: honeydew;
  text-decoration: none;
  font-weight: bold;
}

.link a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-box {
    margin: 10px;
    padding: 15px;
  }
}
</style>