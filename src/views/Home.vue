<template>
  <div class="home-container">
    <RecycleInfiniteScrollList 
      :items="items"
      :loading="loading"
      :error="error"
      :busy="busy"
      @load-more="throttledLoadMore"
      @retry="retryLoading"
    />
  </div>
</template>

<script>
import RecycleInfiniteScrollList from '../components/RecycleInfiniteScrollList.vue'
import { throttle } from 'lodash-es'

export default {
  name: 'HomePage',
  components: {
    RecycleInfiniteScrollList
  },
  data() {
    return {
      items: [], // 列表数据
      page: 1, // 当前页码
      loading: false, // 加载状态
      error: null, // 错误信息
      busy: false, // 是否正在加载
      hasMore: true, // 是否还有更多数据
      cache: new Map(), // 数据缓存
      maxCachePages: 50, // 最大缓存页数
    }
  },
  created() {
    // 创建节流函数
    this.throttledLoadMore = throttle(this.loadMore, 1000, {
      leading: true,
      trailing: false
    })
  },
  methods: {
    // 模拟API请求
    async fetchData() {
      // 检查缓存
      const cacheKey = `page_${this.page}`
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)
      }

      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 生成模拟数据
      const pageSize = 20
      const startId = (this.page - 1) * pageSize + 1
      
      // 模拟数据到达上限
      if (startId > 200) {
        this.hasMore = false
        return []
      }

      const data = Array.from({ length: pageSize }, (_, index) => ({
        id: startId + index,
        title: '标题 ' + (startId + index),
        content: '这是第 ' + (startId + index) + ' 条内容，包含一些示例文本。这里可以是很长的描述信息。'
      }))

      // 缓存数据
      this.cacheData(cacheKey, data)
      
      return data
    },

    // 缓存数据管理
    cacheData(key, data) {
      // 如果缓存达到上限，删除最早的缓存
      if (this.cache.size >= this.maxCachePages) {
        const firstKey = this.cache.keys().next().value
        this.cache.delete(firstKey)
      }
      this.cache.set(key, data)
    },
    
    // 加载更多数据
    async loadMore() {
      if (this.loading || this.error || !this.hasMore || this.busy) return
      
      this.loading = true
      this.busy = true
      
      try {
        const newItems = await this.fetchData()
        if (newItems.length === 0) {
          this.hasMore = false
        } else {
          this.items = [...this.items, ...newItems]
          this.page += 1
        }
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
      this.hasMore = true // 重置hasMore状态
      this.throttledLoadMore()
    }
  },
  
  // 组件挂载时加载初始数据
  mounted() {
    this.throttledLoadMore()
  },

  // 组件销毁时清理
  beforeDestroy() {
    // 取消未执行的节流函数
    if (this.throttledLoadMore && this.throttledLoadMore.cancel) {
      this.throttledLoadMore.cancel()
    }
    // 清理缓存
    this.cache.clear()
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
}
</style>