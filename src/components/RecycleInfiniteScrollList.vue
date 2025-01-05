<template>
  <div class="app-container">
    <h1>无限滚动 + 虚拟列表示例</h1>
    
    <!-- 使用 RecycleScroller 替换原来的 virtual-list -->
    <RecycleScroller
      class="list-container"
      :items="items"
      :item-size="60"
      key-field="id"
      v-slot="{ item }"
      v-infinite-scroll="handleLoadMore"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <div class="list-item">
        <div class="item-id">#{{ item.id }}</div>
        <div class="item-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </RecycleScroller>

    <!-- 加载状态 -->
    <div class="loading-container" v-if="loading">
      加载中...
    </div>

    <!-- 错误提示 -->
    <div class="error-container" v-if="error">
      {{ error }}
      <button @click="handleRetry">重试</button>
    </div>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

export default {
  name: 'RecycleInfiniteScrollList',
  components: {
    RecycleScroller
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleLoadMore() {
      this.$emit('load-more')
    },
    handleRetry() {
      this.$emit('retry')
    }
  }
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
