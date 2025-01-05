# Tech Infinite Virtual Scroll

📜 High-performance infinite scroll list component for Vue.js with virtual rendering | 基于 Vue.js 的高性能虚拟滚动列表组件

## 功能特点

- 🚀 **虚拟列表渲染**: 只渲染可视区域内的数据，大幅提升性能
- 🔄 **无限滚动**: 支持上拉加载更多数据
- 💫 **平滑滚动**: 优化的滚动体验，无卡顿
- 📱 **响应式设计**: 自适应不同屏幕尺寸
- ⚡ **高性能**: 即使处理数万条数据也能保持流畅
- 🛠 **可配置性**: 支持自定义项高度、缓冲区大小等参数

## 技术栈

- Vue.js 3.x
- JavaScript/TypeScript
- CSS3

## 快速开始

### 环境要求

- Node.js >= 14.x
- npm >= 6.x

### 安装

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd tech-infinite-virtual-scroll

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run serve
```

### 生产构建

```bash
# 构建生产版本
npm run build
```

### 代码检查

```bash
# 运行代码检查
npm run lint
```

## 使用方法

### 基础用法

```vue
<template>
  <virtual-scroll
    :items="items"
    :itemHeight="50"
    @load-more="loadMore"
  >
    <template #item="{ item }">
      <div class="list-item">
        {{ item.content }}
      </div>
    </template>
  </virtual-scroll>
</template>
```

### 配置参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 列表数据数组 | Array | [] |
| itemHeight | 每项的高度(px) | Number | 50 |
| bufferSize | 上下缓冲区域的项数 | Number | 5 |
| loadThreshold | 触发加载的阈值(px) | Number | 100 |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load-more | 滚动到底部时触发 | - |
| scroll | 列表滚动时触发 | event |

## 性能优化

1. **虚拟滚动实现**
   - 只渲染可视区域的列表项
   - 动态计算并维护可视区域的数据
   - 使用 transform 进行位置偏移

2. **内存优化**
   - 及时清理不可见区域的 DOM
   - 优化数据结构
   - 使用防抖处理滚动事件

## 注意事项

1. 确保提供准确的 itemHeight 值以获得最佳性能
2. 大数据量场景建议使用分页加载
3. 避免在列表项中使用过于复杂的组件

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交代码
4. 创建 Pull Request

## 许可证

[MIT License](LICENSE)
