<template>
  <div class="app-root">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 重置默认样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

/* 根容器样式 */
.app-root {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 列表相关样式 */
.list-container {
  border: 1px solid #eee;
  border-radius: 4px;
}

.list-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: flex-start;
}

.item-id {
  flex-shrink: 0;
  width: 50px;
  color: #999;
}

.item-content {
  flex-grow: 1;
}

.item-content h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #333;
}

.item-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.loading-container {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error-container {
  text-align: center;
  padding: 20px;
  color: #ff4444;
}

.error-container button {
  margin-top: 10px;
  padding: 5px 15px;
  border: none;
  background: #ff4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.error-container button:hover {
  background: #ff6666;
}
</style>
