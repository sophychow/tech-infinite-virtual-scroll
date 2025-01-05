<template>
  <div class="app-container">
    <h1>无限滚动 + 虚拟列表示例</h1>
    
    <!-- 使用虚拟滚动列表包装器 -->
    <virtual-list
      class="list-container"
      :data-key="'id'"
      :data-sources="items"
      :data-component="itemComponent"
      :keeps="30"
      :estimate-size="60"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
    </virtual-list>

    <!-- 加载状态 -->
    <div class="loading-container" v-if="loading">
      加载中...
    </div>

    <!-- 错误提示 -->
    <div class="error-container" v-if="error">
      {{ error }}
      <button @click="retryLoading">重试</button>
    </div>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

// 列表项组件
const ListItem = {
  name: 'ListItem',
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  render(h) {
    return h('div', { class: 'list-item' }, [
      h('div', { class: 'item-id' }, ['#' + this.source.id]),
      h('div', { class: 'item-content' }, [
        h('h3', this.source.title),
        h('p', this.source.content)
      ])
    ])
  }
}

export default {
  name: 'App',
  components: {
    VirtualList
  },
  data() {
    return {
      items: [], // 列表数据
      page: 1, // 当前页码
      loading: false, // 加载状态
      error: null, // 错误信息
      busy: false, // 是否正在加载
      itemComponent: ListItem // 列表项组件
    }
  },
  methods: {
    // 模拟API请求
    async fetchData() {
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 生成模拟数据
      const pageSize = 20
      const startId = (this.page - 1) * pageSize + 1
      
      return Array.from({ length: pageSize }, (_, index) => ({
        id: startId + index,
        title: '标题 ' + (startId + index),
        content: '这是第 ' + (startId + index) + ' 条内容，包含一些示例文本。这里可以是很长的描述信息。'
      }))
    },
    
    // 加载更多数据
    async loadMore() {
      if (this.loading || this.error) return
      
      this.loading = true
      this.busy = true
      
      try {
        const newItems = await this.fetchData()
        this.items = [...this.items, ...newItems]
        this.page += 1
        this.error = null
      } catch (err) {
        this.error = '加载失败，请重试'
        console.error('加载数据失败:', err)
      } finally {
        this.loading = false
        this.busy = false
      }
    },
    
    // 重试加载
    retryLoading() {
      this.error = null
      this.loadMore()
    }
  },
  
  // 组件挂载时加载初始数据
  mounted() {
    this.loadMore()
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
  overflow-y: auto;
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
