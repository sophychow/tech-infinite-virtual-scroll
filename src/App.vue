<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.list-container {
  height: 600px;
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
