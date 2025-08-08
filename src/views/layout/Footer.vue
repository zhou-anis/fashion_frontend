<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-section">
        <h3>关于我们</h3>
        <ul>
          <li><a href="#">公司简介</a></li>
          <li><a href="#">加入我们</a></li>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">隐私政策</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>客户服务</h3>
        <ul>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">售后政策</a></li>
          <li><a href="#">退货流程</a></li>
          <li><a href="#">发票说明</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>关注我们</h3>
        <div class="social-icons">
          <a href="#"><i class="icon icon-wechat"></i></a>
          <a href="#"><i class="icon icon-weibo"></i></a>
          <a href="#"><i class="icon icon-facebook"></i></a>
          <a href="#"><i class="icon icon-twitter"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>联系我们</h3>
        <p>客服电话：400-123-4567</p>
        <p>邮箱：support@example.com</p>
        <p>地址：广东省广州市天河区电商路88号</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} 电商平台 | 版权所有 | 粤ICP备2025000001号</p>
    </div>
  </footer>
</template>

<script setup>
// 无需 JS 逻辑
</script>

<style scoped>
.footer {
  background-color: black;
  color: #ffffff;
  font-size: 14px;
  padding: 40px 20px 20px;
}

.footer a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover {
  color: #fff;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.footer-section {
  flex: 1 1 200px;
  min-width: 100px;
}

.footer-section h3 {
  color: #fff;
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.icon:hover {
  opacity: 1;
}

/* 示例图标，可自行替换为 svg 或真实图标 */
.icon-wechat {
  background-image: url('https://cdn-icons-png.flaticon.com/512/733/733635.png');
}
.icon-weibo {
  background-image: url('https://cdn-icons-png.flaticon.com/512/733/733579.png');
}
.icon-facebook {
  background-image: url('https://cdn-icons-png.flaticon.com/512/733/733547.png');
}
.icon-twitter {
  background-image: url('https://cdn-icons-png.flaticon.com/512/733/733579.png');
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 15px;
  font-size: 13px;
  color: #888;
}

@media (max-width: 500px) {
  .footer-top {
    flex-direction: column;
  }
}
</style>
