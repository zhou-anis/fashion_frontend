<template>
  <div class="register-container">
    <div class="register-card">
      <h2>用户注册</h2>
      <form @submit.prevent="handleSubmit">
        <!-- 用户名 -->
        <div class="form-group">
          <label>用户名</label>
          <input
              type="text"
              v-model.trim="form.username"
              @input="validateField('username')"
              placeholder="请输入用户名"
          />
          <span class="error" v-if="errors.username">{{ errors.username }}</span>
        </div>

        <!-- 邮箱 -->
        <div class="form-group">
          <label>邮箱</label>
          <input
              type="email"
              v-model.trim="form.email"
              @input="validateField('email')"
              placeholder="请输入邮箱"
          />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <!-- 密码 -->
        <div class="form-group">
          <label>密码</label>
          <input
              type="password"
              v-model.trim="form.password"
              @input="validateField('password')"
              placeholder="请输入密码"
          />
          <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <!-- 确认密码 -->
        <div class="form-group">
          <label>确认密码</label>
          <input
              type="password"
              v-model.trim="form.confirmPassword"
              @input="validateField('confirmPassword')"
              placeholder="请再次输入密码"
          />
          <span class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="submit-btn">注册</button>
      </form>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Footer from '@/views/layout/Footer.vue'
import { reactive } from "vue";
import { ElMessage } from 'element-plus'
import httpInstance from "@/requests/http.ts";
import {useRouter} from "vue-router";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const router = useRouter();

const form = reactive<RegisterForm>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive<Errors>({});

function validateField(field: keyof RegisterForm) {
  switch (field) {
    case "username":
      if (!form.username) {
        errors.username = "用户名不能为空";
      } else {
        delete errors.username;
      }
      break;
    case "email":
      if (!form.email) {
        errors.email = "邮箱不能为空";
      } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email)) {
        errors.email = "邮箱格式不正确";
      } else {
        delete errors.email;
      }
      break;
    case "password":
      if (!form.password) {
        errors.password = "密码不能为空";
      } else if (form.password.length < 6) {
        errors.password = "密码长度不能少于6位";
      } else {
        delete errors.password;
      }
      break;
    case "confirmPassword":
      if (!form.confirmPassword) {
        errors.confirmPassword = "请再次输入密码";
      } else if (form.confirmPassword !== form.password) {
        errors.confirmPassword = "两次输入的密码不一致";
      } else {
        delete errors.confirmPassword;
      }
      break;
  }
}

function validateAll(): boolean {
  (Object.keys(form) as (keyof RegisterForm)[]).forEach((key) =>
      validateField(key)
  );
  return Object.keys(errors).length === 0;
}


const logUp = async () => {
  const logUpRes = await httpInstance.post("/v1/user/logup", form)
  return logUpRes;
}



async function handleSubmit() {
  if (validateAll()) {
    const logUpRes = await logUp()
    if (logUpRes.data.success) {
      router.replace("/login")
      ElMessage.success(logUpRes.data.message);
    }
    else {
      if (logUpRes.data.code === 101) {
        ElMessage.error(logUpRes.data.message);
      }
      if (logUpRes.data.code === 102) {
        ElMessage.error(logUpRes.data.message);
      }
      if (logUpRes.data.code === 103) {
        ElMessage.error(logUpRes.data.message);
      }
    }
  }
}
</script>

<style scoped>
/* 页面布局 */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-image: url("@/assets/images/login.jpg");
}

/* 卡片 */
.register-card {
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 350px;
  opacity: 0.9;
}

/* 标题 */
.register-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* 表单组 */
.form-group {
  margin-bottom: 18px;
}

label {
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #66a6ff;
  box-shadow: 0 0 4px rgba(102, 166, 255, 0.4);
}

/* 错误提示 */
.error {
  display: block;
  font-size: 12px;
  color: red;
  margin-top: 4px;
}

/* 按钮 */
.submit-btn {
  width: 100%;
  padding: 10px;
  background: #66a6ff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background: #4e8cff;
}
</style>
