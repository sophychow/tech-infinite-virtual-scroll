<template>
  <div class="list-root">
    <h1 class="list-title">无限滚动 + 虚拟列表示例</h1>
    
    <!-- 使用 RecycleScroller 替换原来的 virtual-list -->
    <RecycleScroller
      ref="scroller"
      class="list-container"
      :items="items"
      :item-size="60"
      key-field="id"
      v-slot="{ item }"
      v-infinite-scroll="handleLoadMore"
      :infinite-scroll-disabled="scrollDisabled"
      :infinite-scroll-distance="10"
      :infinite-scroll-immediate="false"
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
      <div class="loading-spinner"></div>
      <div class="loading-text">加载中...</div>
    </div>

    <!-- 错误提示 -->
    <div class="error-container" v-if="error">
      {{ error }}
      <button @click="handleRetry">重试</button>
    </div>

    <!-- 无更多数据提示 -->
    <div class="no-more" v-if="!loading && !error && items.length > 0 && busy">
      没有更多数据了
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
  computed: {
    scrollDisabled() {
      return this.loading || this.error || this.busy
    }
  },
  methods: {
    handleLoadMore() {
      if (this.scrollDisabled) return
      this.$emit('load-more')
    },
    handleRetry() {
      this.$emit('retry')
    },
    // 重置滚动位置
    resetScroll() {
      if (this.$refs.scroller) {
        this.$refs.scroller.scrollToItem(0)
      }
    }
  }
}
</script>

<style scoped>
.list-root {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.list-title {
  margin: 0 0 20px 0;
  font-size: 24px;
  padding: 0 20px;
}

.list-container {
  flex: 1;
  border: 1px solid #eee;
  border-radius: 4px;
  min-height: 0; /* 重要：让flex布局中的滚动正常工作 */
}

.list-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: flex-start;
  background: #fff;
  transition: background-color 0.2s;
}

.list-item:hover {
  background: #f9f9f9;
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
  line-height: 1.5;
}

.loading-container {
  text-align: center;
  padding: 20px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 14px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  transition: background-color 0.2s;
}

.error-container button:hover {
  background: #ff6666;
}

.no-more {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
  background: #f9f9f9;
}
</style>