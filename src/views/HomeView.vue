<template>
  <div class="home-view">
    <!-- 顶部装饰 -->
    <div class="top-decoration">
      <div class="lantern left">🏮</div>
      <div class="lantern right">🏮</div>
    </div>

    <!-- 标题区域 -->
    <div class="header-section">
      <h1 class="main-title">🎊 春节小游戏 🎊</h1>
      <p class="sub-title">欢欢喜喜过大年，趣味答题乐翻天</p>
    </div>

    <!-- 游戏选择区域 -->
    <div class="games-section">
      <div class="game-card" @click="goToGame('riddle')">
        <div class="game-icon">🧩</div>
        <h3 class="game-title">猜灯谜</h3>
        <p class="game-desc">传统春节文化，考验智慧</p>
        <div class="game-info">
          <span class="game-count">{{ riddleCount }} 题</span>
          <van-icon name="arrow" class="game-arrow" />
        </div>
      </div>

      <div class="game-card" @click="goToGame('brain-teaser')">
        <div class="game-icon">💡</div>
        <h3 class="game-title">脑筋急转弯</h3>
        <p class="game-desc">趣味思维挑战，欢乐无限</p>
        <div class="game-info">
          <span class="game-count">{{ brainTeaserCount }} 题</span>
          <van-icon name="arrow" class="game-arrow" />
        </div>
      </div>

      <div class="game-card" @click="goToGame('lottery')">
        <div class="game-icon">🎰</div>
        <h3 class="game-title">幸运大转盘</h3>
        <p class="game-desc">转动幸运，惊喜不断</p>
        <div class="game-info">
          <span class="game-count">自定义奖项</span>
          <van-icon name="arrow" class="game-arrow" />
        </div>
      </div>
    </div>

    <!-- 功能按钮区域 -->
    <div class="features-section">
      <div class="feature-item" @click="showSettings = true">
        <van-icon name="setting-o" size="24" />
        <span>游戏设置</span>
      </div>
      <div class="feature-item" @click="showAbout = true">
        <van-icon name="info-o" size="24" />
        <span>关于我们</span>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="bottom-decoration">
      <div class="firework">🎆</div>
      <div class="firework">🎇</div>
      <div class="firework">🎆</div>
    </div>

    <!-- 设置弹窗 -->
    <van-popup v-model:show="showSettings" position="bottom" round>
      <div class="settings-popup">
        <div class="popup-header">
          <h3>游戏设置</h3>
          <van-icon name="cross" @click="showSettings = false" />
        </div>
        
        <div class="settings-content">
          <!-- 倒计时模式 -->
          <div class="setting-item">
            <div class="setting-label">
              <van-icon name="clock-o" />
              <span>倒计时模式</span>
            </div>
            <van-radio-group v-model="settings.countdownMode" direction="horizontal">
              <van-radio name="none">无倒计时</van-radio>
              <van-radio name="10">10秒</van-radio>
              <van-radio name="20">20秒</van-radio>
            </van-radio-group>
          </div>

          <!-- 音效开关 -->
          <div class="setting-item">
            <div class="setting-label">
              <van-icon name="volume-o" />
              <span>音效</span>
            </div>
            <van-switch v-model="settings.soundEnabled" />
          </div>
        </div>

        <div class="popup-footer">
          <van-button type="primary" block @click="saveSettings">保存设置</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 关于弹窗 -->
    <van-popup v-model:show="showAbout" position="bottom" round>
      <div class="about-popup">
        <div class="popup-header">
          <h3>关于我们</h3>
          <van-icon name="cross" @click="showAbout = false" />
        </div>
        
        <div class="about-content">
          <div class="about-icon">🎮</div>
          <h4 class="about-title">春节小游戏</h4>
          <p class="about-version">版本 1.0.0</p>
          
          <div class="about-description">
            <p>这是一个专为春节打造的趣味答题小游戏，包含猜灯谜和脑筋急转弯两大玩法。</p>
            <p>让您在欢乐的春节氛围中，感受传统文化的魅力，锻炼思维能力，度过一个难忘的春节！</p>
          </div>

          <div class="about-features">
            <div class="feature-tag" @click="goToGame('riddle')">🧩 猜灯谜</div>
            <div class="feature-tag" @click="goToGame('brain-teaser')">💡 脑筋急转弯</div>
            <div class="feature-tag" @click="goToGame('lottery')">🎰 幸运大转盘</div>
          </div>
        </div>

        <div class="popup-footer">
          <van-button type="primary" block @click="showAbout = false">我知道了</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { showToast } from 'vant'

const router = useRouter()
const gameStore = useGameStore()

const showSettings = ref(false)
const showAbout = ref(false)

const riddleCount = ref(0)
const brainTeaserCount = ref(0)

const settings = ref({
  countdownMode: 'none',
  soundEnabled: true
})

onMounted(async () => {
  // 加载游戏数据统计
  await loadGameData()
  
  // 加载用户设置
  loadSettings()
})

const loadGameData = async () => {
  try {
    // 这里应该从 API 或本地文件加载数据
    // 暂时使用模拟数据
    riddleCount.value = 15
    brainTeaserCount.value = 15
  } catch (error) {
    console.error('加载游戏数据失败:', error)
  }
}

const loadSettings = () => {
  const savedSettings = localStorage.getItem('gameSettings')
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings)
  }
}

const saveSettings = () => {
  localStorage.setItem('gameSettings', JSON.stringify(settings.value))
  gameStore.updateSettings(settings.value)
  showSettings.value = false
  showToast({
    type: 'success',
    message: '设置已保存'
  })
}

const goToGame = (gameType) => {
  if (gameType === 'riddle') {
    router.push('/riddle')
  } else if (gameType === 'brain-teaser') {
    router.push('/brain-teaser')
  } else if (gameType === 'lottery') {
    router.push('/lottery')
  }
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  padding: var(--spacing-xl);
  padding-bottom: calc(var(--spacing-xxl) + env(safe-area-inset-bottom));
}

/* 顶部装饰 */
.top-decoration {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
}

.lantern {
  font-size: 40px;
  animation: swing 3s ease-in-out infinite;
}

.lantern.left {
  animation-delay: 0s;
}

.lantern.right {
  animation-delay: 1.5s;
}

@keyframes swing {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

/* 标题区域 */
.header-section {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.main-title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.sub-title {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 游戏选择区域 */
.games-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.game-card {
  background: linear-gradient(135deg, #fff 0%, #fff8f0 100%);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-gold) 50%, var(--color-primary) 100%);
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.game-card:active {
  transform: translateY(-2px);
}

.game-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-md);
}

.game-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.game-desc {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-count {
  font-size: var(--font-size-sm);
  color: var(--color-gold);
  font-weight: var(--font-weight-bold);
  background: var(--color-primary);
  padding: 4px 12px;
  border-radius: var(--radius-round);
}

.game-arrow {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
}

/* 功能按钮区域 */
.features-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: var(--spacing-xxl);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex: 1;
  margin: 0 var(--spacing-sm);
}

.feature-item:hover {
  background: var(--bg-color-light);
  transform: translateY(-2px);
}

.feature-item span {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

/* 底部装饰 */
.bottom-decoration {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.firework {
  font-size: 32px;
  animation: blink 2s ease-in-out infinite;
}

.firework:nth-child(2) {
  animation-delay: 0.5s;
}

.firework:nth-child(3) {
  animation-delay: 1s;
}

/* 弹窗样式 */
.settings-popup,
.about-popup {
  padding: var(--spacing-xl);
  max-height: 80vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.popup-header h3 {
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.popup-header .van-icon {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  cursor: pointer;
}

.settings-content {
  margin-bottom: var(--spacing-lg);
}

.setting-item {
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-color);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.about-content {
  text-align: center;
}

.about-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-md);
}

.about-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.about-version {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.about-description {
  text-align: left;
  margin-bottom: var(--spacing-lg);
}

.about-description p {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.about-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.feature-tag {
  padding: var(--spacing-xs) var(--spacing-md);
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: var(--color-primary);
  border-radius: var(--radius-round);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.feature-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.feature-tag:active {
  transform: translateY(0);
}

.popup-footer {
  margin-top: var(--spacing-lg);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>