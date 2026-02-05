# 春节主题小游戏项目生成提示词

## 项目概述

创建一个基于Vue 3的春节主题移动端小游戏集合，包含猜灯谜、脑筋急转弯和幸运大转盘三个游戏。

## 技术栈要求

- **Vue 3**: 使用Composition API和`<script setup>`语法
- **Vite**: 作为构建工具，配置代码分割和优化
- **Vant 4**: 移动端UI组件库
- **Vue Router**: 客户端路由
- **Pinia**: 状态管理
- **Axios**: HTTP请求
- **GitHub Actions**: 自动部署到GitHub Pages

## 核心功能需求

### 1. 基础游戏功能

#### 猜灯谜（Riddle Game）
- 20+传统中国灯谜
- 答题验证系统
- 提示功能
- 难度选择（简单/普通/困难）

#### 脑筋急转弯（Brain Teaser Game）
- 20+脑筋急转弯题目
- 答题验证系统
- 提示功能
- 难度选择（简单/普通/困难）

#### 幸运大转盘（Lottery Game）
- 圆形大转盘抽奖
- 5-15个可自定义奖项
- localStorage持久化配置
- 随机停止时间（3-5秒）
- 中奖扇区突出显示

### 2. 通用功能

#### 倒计时系统
- 三种模式：无倒计时、10秒、20秒
- 倒计时结束自动显示答案（禁止回答）
- 圆形进度指示器

#### 答题反馈
- 正确/错误音效（可开关）
- 视觉反馈动画
- 连续答对统计
- 正确率计算

#### 游戏设置
- 设置持久化（localStorage）
- 倒计时模式选择
- 音效开关
- 自动显示答案开关

## 设计要求

### 主题配色
- 主色：中国红 `#e60012`
- 辅色：金色 `#ffd700`
- 白色 `#ffffff`

### 移动端适配
- 屏幕尺寸：320px - 750px
- 触摸友好的交互
- 响应式布局

### 视觉设计
- 春节主题元素：灯笼、中国结、福字、烟花
- 丰富的动画效果
- 渐变背景
- 阴影和发光效果

## 详细实现规格

### 数据结构

#### 灯谜数据（data/riddles.json）
```json
[
  {
    "id": 1,
    "question": "题目内容",
    "answer": "答案",
    "hint": "提示信息",
    "type": "riddle"
  }
]
```

#### 脑筋急转弯数据（data/brainTeasers.json）
```json
[
  {
    "id": 1,
    "question": "题目内容",
    "answer": "答案",
    "hint": "提示信息",
    "type": "brainTeaser"
  }
]
```

### 转盘游戏详细规格

#### 转盘设计
- 使用SVG绘制扇形
- 扇形均分圆形
- 文字垂直于圆心显示（writing-mode: vertical-rl）
- 每个奖项最多5个字符

#### 转盘动画
- 三段式动画：加速 → 匀速 → 减速
- 旋转角度：1800-2520度（5-7圈）
- 使用requestAnimationFrame实现平滑动画

#### 中奖判定逻辑
```javascript
// 停止后计算12点钟方向对应的扇区
const anglePerSector = 360 / prizeList.value.length
const finalRotation = rotation.value % 360
const angleAt12Clock = (270 - finalRotation + 360) % 360
const sectorIndex = Math.floor((angleAt12Clock + 90) / anglePerSector) % count
```

#### 中奖扇区突出显示
- 中奖扇区半径增大（165px vs 正常150px）
- 亮度增强（1.6倍）
- 金色发光阴影
- 脉冲动画效果

#### 转盘配置
- 默认奖项：一等奖、二等奖、三等奖、谢谢参与、再来一次
- 自定义奖项：5-15个，每行一个
- localStorage键名：'lotteryPrizes'
- 去重处理

### 页面布局

#### 首页（HomeView）
- 游戏卡片选择（猜灯谜、脑筋急转弯、幸运大转盘）
- 设置按钮
- 关于按钮
- 返回按钮导航

#### 游戏页面通用结构
- 游戏头部（标题、返回按钮）
- 答题区域
- 倒计时组件
- 操作按钮
- 结果弹窗

### 状态管理（Pinia）

#### gameStore.js
```javascript
{
  gameSettings: {
    countdownMode: 'none' | '10' | '20',
    soundEnabled: boolean,
    answerDelay: number,
    autoShowAnswer: boolean
  },
  gameProgress: {
    correctCount: number,
    wrongCount: number,
    currentQuestionIndex: number
  }
}
```

## 装饰元素规格

### 背景装饰（App.vue）

#### 中国结
- SVG格式，红色# c41e3a
- 多层圆形和线条交织
- 摆动动画（3秒循环）
- 位置：左上角和右上角

#### 灯笼
- 红色椭圆，金色边框
- 金色流苏和光晕
- 摆动动画（2秒循环）
- 数量：4个，位置随机倾斜

#### 烟花
- 多个方向放射线条
- 不同颜色（粉色、红色、绿色、青色、紫色、橙色）
- 闪烁和爆发动画
- 数量：6个，随机位置和角度

#### 福字
- 红色方形背景，圆角
- 金色"福"字，衬线字体
- 金色装饰点缀
- 浮动动画
- 数量：4个，不同位置和倾斜角度

### 动画效果

#### swing动画
```css
@keyframes swing {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
```

#### twinkle动画
```css
@keyframes twinkle {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
```

#### float动画
```css
@keyframes float {
  0%, 100% { transform: translateY(-50%) translateY(0); }
  50% { transform: translateY(-50%) translateY(-10px); }
}
```

## 部署配置

### Vite配置（vite.config.js）
```javascript
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/spring-festival-game/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vant': ['vant'],
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
```

### GitHub Actions配置

#### deploy.yml
- 触发条件：push到main分支
- Node.js版本：20
- 构建命令：npm run build
- 环境变量：VITE_BASE_PATH=/spring-festival-game/
- 部署目标：GitHub Pages

## 重要修复记录

### 转盘抽奖逻辑修复

#### 问题1：指针方向理解错误
- 原始问题：指针指向的奖项与显示结果不一致
- 原因：SVG坐标系中，0°在3点钟方向，12点钟方向是270°
- 解决：正确使用270°作为指针位置

#### 问题2：角度计算公式错误
- 原始问题：奖项中心角度计算不正确
- 解决：从"index * anglePerSector + anglePerSector / 2"改为"index * anglePerSector - 90 + anglePerSector / 2"

#### 问题3：负角度转换问题
- 原始问题：计算出的角度为负数导致后续计算错误
- 解决：添加角度转换：`if (prizeCenterAngle < 0) prizeCenterAngle += 360`

#### 问题4：最终方案
- 改为随机旋转，停止后计算12点钟方向的扇区
- 公式：`sectorIndex = Math.floor((angleAt12Clock + 90) / anglePerSector) % count`
- 优点：逻辑简单，无需预先选择奖项，更符合真实抽奖

### Vant组件注册
- 问题：组件解析失败
- 解决：在main.js中注册Vant

### Toast API变更
- 问题：Toast.success不是函数
- 解决：改为`showToast({ type: 'success', message: '...' })`

### 倒计时自动启动
- 问题：倒计时不启动
- 解决：在onMounted中调用startCountdown

### 转盘transform-origin
- 问题：旋转时转盘消失
- 解决：设置transformOrigin: '160px 160px'

### Node.js版本
- 问题：Vite 7.3.1需要Node.js 20.19+
- 解决：GitHub Actions使用Node.js 20

## 项目文件结构

```
spring-festival-game/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── sounds/
│   │   ├── styles/
│   │   │   ├── animations.css
│   │   │   ├── common.css
│   │   │   ├── index.css
│   │   │   ├── theme.css
│   │   │   └── variables.css
│   │   └── vue.svg
│   ├── components/
│   │   ├── AnswerCard.vue
│   │   ├── GameHeader.vue
│   │   ├── HelloWorld.vue
│   │   └── ResultModal.vue
│   ├── composables/
│   │   ├── useAnimation.js
│   │   ├── useCountdown.js
│   │   └── useGameContent.js
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   └── gameStore.js
│   ├── views/
│   │   ├── BrainTeaserGame.vue
│   │   ├── HomeView.vue
│   │   ├── LotteryGame.vue
│   │   └── RiddleGame.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── data/
│   ├── brainTeasers.json
│   └── riddles.json
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── .vscode/
│   └── extensions.json
├── .env.dev
├── .env.prod
├── ai_prompt.md
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 开发和调试

### 本地开发
```bash
npm install
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 部署
- 推送到GitHub main分支
- GitHub Actions自动构建和部署
- 访问：https://jpg1024.github.io/spring-festival-game/

## 注意事项

1. **Vue 3语法**：必须使用Composition API和`<script setup>`
2. **Vant 4组件**：需要注册后使用
3. **SVG坐标系**：0°在3点钟，顺时针方向增加
4. **localStorage**：JSON序列化/反序列化时注意异常处理
5. **动画性能**：使用CSS transform而非left/top
6. **移动端兼容**：测试不同屏幕尺寸和浏览器
7. **GitHub Pages路径**：构建时需设置正确的base路径

## 迭代历史

### 初始版本
- 基础游戏框架
- 猜灯谜和脑筋急转弯功能
- 倒计时系统
- 答题反馈

### 第二版
- 移除暗黑模式
- 添加幸运大转盘
- 优化转盘显示

### 第三版
- 重写转盘逻辑
- 添加扇区突出显示
- 增强视觉效果

### 第四版
- 添加春节背景装饰
- 优化转盘动画
- 增强中奖效果

### 最终版本
- 完整的春节主题装饰
- 优化的转盘抽奖逻辑
- 完善的部署配置
- 详细的项目文档

## 总结

本项目是一个完整的春节主题移动端小游戏，采用现代前端技术栈，具有良好的用户体验和视觉效果。通过多次迭代优化，实现了稳定的功能和精美的设计。项目已成功部署到GitHub Pages，可供在线访问和体验。