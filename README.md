# 🎊 春节小游戏

> 🤖 **这是一个由AI辅助生成的项目**，完整的项目生成提示词请查看 [ai_prompt.md](./ai_prompt.md) 文件。

一个基于 Vue 3 + Vite + Vant 4 构建的春节主题移动端小游戏集合，包含猜灯谜、脑筋急转弯等互动玩法。

## ✨ 特性

- 🎮 **两大游戏模式**：猜灯谜（20题）+ 脑筋急转弯（20题）
- 🎨 **春节主题设计**：中国红 + 金色配色，灯笼/鞭炮/福字视觉元素
- 📱 **移动端优化**：完美适配 320px~750px 屏幕尺寸
- 🎯 **三种难度**：简单（5题）、普通（10题）、困难（15题）
- ⏱️ **三种倒计时模式**：无倒计时、10秒、20秒
- 🎉 **丰富的动画效果**：粒子爆炸、红包雨、抖动反馈等
- 🏆 **成就系统**：连续答对奖励、正确率成就
- 📊 **答题统计**：实时显示正确率、答题进度
- 🔊 **音效支持**：答题正确/错误音效（可关闭）
- 🌙 **夜间模式**：护眼模式，舒适游戏体验
- 🤖 **大模型接入**：预留 API 接口，支持从大模型加载题目

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue 3** | 3.4+ | Composition API + `<script setup>` |
| **Vite** | 7.3+ | 构建工具 |
| **Vant 4** | 4.7+ | 移动端 UI 组件库 |
| **Vue Router** | 4.x | 路由管理 |
| **Pinia** | 2.x | 状态管理 |
| **Axios** | 1.x | HTTP 请求 |

## 📁 项目结构

```
spring-festival-game/
├── public/                      # 静态资源
├── src/
│   ├── assets/                  # 资源文件
│   │   ├── images/             # 图片资源
│   │   ├── sounds/             # 音效资源
│   │   └── styles/             # 全局样式
│   │       ├── variables.css   # CSS 变量
│   │       ├── theme.css       # 主题样式
│   │       ├── common.css      # 通用样式
│   │       ├── animations.css  # 动画效果
│   │       └── index.css       # 样式入口
│   ├── components/             # 通用组件
│   │   ├── GameHeader.vue      # 游戏头部
│   │   ├── AnswerCard.vue      # 答题卡片
│   │   └── ResultModal.vue     # 结果弹窗
│   ├── views/                  # 页面视图
│   │   ├── HomeView.vue        # 首页
│   │   ├── RiddleGame.vue      # 猜灯谜游戏
│   │   └── BrainTeaserGame.vue # 脑筋急转弯
│   ├── composables/            # 组合式函数
│   │   ├── useCountdown.js     # 倒计时逻辑
│   │   ├── useGameContent.js   # 游戏内容管理
│   │   └── useAnimation.js     # 动画效果
│   ├── stores/                 # Pinia 状态
│   │   └── gameStore.js        # 游戏状态管理
│   ├── router/                 # 路由配置
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── data/                       # 游戏数据
│   ├── riddles.json           # 灯谜数据（20题）
│   └── brainTeasers.json      # 脑筋急转弯（20题）
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages 部署
├── .env.dev                   # 开发环境变量
├── .env.prod                  # 生产环境变量
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 pnpm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📱 部署

### GitHub Pages 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 自动部署完成后，访问：**https://jpg1024.github.io/spring-festival-game/**

🎉 **在线体验地址**：https://jpg1024.github.io/spring-festival-game/

### 手动部署

1. 构建项目：

```bash
npm run build
```

2. 将 `dist` 目录上传到你的服务器或 CDN

## 🎮 游戏玩法

### 猜灯谜

1. 选择难度（简单/普通/困难）
2. 阅读灯谜题目
3. 输入你的答案
4. 点击"提交答案"
5. 查看结果，进入下一题

### 脑筋急转弯

1. 选择难度（简单/普通/困难）
2. 阅读脑筋急转弯题目
3. 输入你的答案
4. 点击"提交答案"
5. 查看结果，进入下一题

### 功能说明

- **查看提示**：点击"查看提示"按钮获取提示信息
- **查看答案**：5秒后可点击"查看答案"直接查看正确答案
- **倒计时**：根据设置，倒计时结束自动显示答案
- **退出游戏**：点击左上角返回按钮，确认后退出游戏

## ⚙️ 配置说明

### 环境变量

创建 `.env.dev` 或 `.env.prod` 文件：

```env
# Vite 基础路径
VITE_BASE_PATH=/

# 大模型 API 配置（可选）
VITE_LLM_API_KEY=your-api-key-here
VITE_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions

# 游戏配置
VITE_DEFAULT_COUNTDOWN_MODE=none
VITE_DEFAULT_SOUND_ENABLED=true
VITE_DEFAULT_ANSWER_DELAY=5
```

### 游戏设置

游戏内可配置：

- **倒计时模式**：无倒计时 / 10秒 / 20秒
- **音效开关**：开启 / 关闭
- **夜间模式**：开启 / 关闭

## 🎨 主题定制

### 颜色变量

在 `src/assets/styles/variables.css` 中修改颜色变量：

```css
:root {
  --color-primary: #e60012;      /* 中国红 */
  --color-gold: #ffd700;         /* 金色 */
  --color-white: #ffffff;        /* 白色 */
  /* ... 更多变量 */
}
```

## 🤖 大模型接入

### 配置步骤

1. 在 `.env` 文件中配置 API Key 和 Endpoint
2. 游戏启动时会自动检测配置
3. 如果配置正确，会从大模型加载题目
4. 如果加载失败，会回退到内置数据

### 数据格式

大模型需要返回符合以下格式的 JSON：

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

## 📝 开发说明

### 添加新题目

编辑 `data/riddles.json` 或 `data/brainTeasers.json`：

```json
{
  "id": 21,
  "question": "你的题目",
  "answer": "答案",
  "hint": "提示",
  "type": "riddle"
}
```

### 添加新游戏模式

1. 在 `data/` 目录创建新的数据文件
2. 在 `src/views/` 创建新的游戏页面
3. 在 `src/router/index.js` 添加路由
4. 在首页添加游戏入口

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Vant 4 - 轻量、可靠的移动端组件库
- Pinia - Vue 状态管理库

## 📮 联系方式

如有问题或建议，欢迎提 Issue 或 Pull Request。

---

祝您春节快乐，游戏愉快！🎉
