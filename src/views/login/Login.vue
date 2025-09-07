<template>
  <div class="login-container">
    <div class="form-box">
      <h2>登录</h2>
      <form>
        <div class="form-group">
          <label for="username">用户名或邮箱</label>
          <input
              type="text"
              id="username"
              placeholder="请输入用户名或邮箱"
              v-model="formData.username"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              type="password"
              id="password"
              placeholder="请输入密码"
              v-model="formData.password"
          />
        </div>
        <button type="button" @click="formSubmit">登录</button>
      </form>

      <!-- 新增 QQ 登录 -->
      <div class="oauth-login">
        <p>或使用第三方账号登录</p>
          <img src="@/assets/icons/QQ.svg" alt="QQ" class="qq-icon"/>
          <span @click="goQQOauth" class="qq-login">QQ 登录</span>
      </div>

      <p class="link">
        还没有账号？<a href="/register">立即注册</a>
      </p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import useUserStore from "../../store/userStore.js";
import Footer from "../layout/Footer.vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import httpInstance from "../../requests/http.ts";

interface formType {
  username: string;
  password: string;
}
interface OauthResponse {
  code: number;
  message: string;
  success: boolean;
  oauthUrl: string;
}


const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const formData = ref<formType>({
  username: "",
  password: "",
});

const validateAll = (): boolean => {
  if (formData.value.username && formData.value.password) {
    return true;
  } else {
    return false;
  }
};

const formSubmit = async () => {
  if (validateAll()) {
    // 发送ajax请求
    await userStore.login(formData.value);
    const { reqInfo } = storeToRefs(userStore);
    if ((reqInfo.value as any).code === 303) {
      ElMessage.error((reqInfo.value as any).message);
    }
    if ((reqInfo.value as any).code === 302) {
      ElMessage.error((reqInfo.value as any).message);
    }
    if ((reqInfo.value as any).code === 301) {
      ElMessage.error((reqInfo.value as any).message);
    }
    if ((reqInfo.value as any).success === true) {
      ElMessage.success((reqInfo.value as any).message);
      router.replace("/");
    }
  } else {
    ElMessage.error("用户名或密码为空!");
  }
};




const goQQOauth = async () => {
  const res = await httpInstance.get<OauthResponse>(`/v1/user/qq_login?next=${encodeURIComponent(route.fullPath)}`)
  if (res.data.success) {
    window.open(res.data.oauthUrl,'_blank');
  }

}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
  ),
  url("../../assets/images/login.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-box {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  opacity: 0.9;
}

.form-box h2 {
  color: #555;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #555;
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
  background-color: #66a6ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #4e8cff;
}

.link {
  margin-top: 15px;
}

.link a {
  color: #555;
  text-decoration: none;
  font-weight: bold;
}

.link a:hover {
  text-decoration: underline;
}

/* 新增 QQ 登录按钮样式 */
.oauth-login {
  margin: 20px 0;
}


.qq-login:hover {
  color: #12b7f5;
}

.qq-icon {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .form-box {
    margin: 10px;
    padding: 15px;
  }
}
</style>
