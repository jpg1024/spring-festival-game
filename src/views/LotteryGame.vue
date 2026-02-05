<template>
  <div class="lottery-game">
    <game-header 
      :show-info="false"
      title="幸运大转盘"
      @back="handleBack"
    />

    <div class="lottery-container">
      <!-- 转盘区域 -->
      <div class="wheel-wrapper">
        <svg viewBox="0 0 320 320" class="wheel-svg">
          <!-- 扇形区域 -->
          <g :style="{ transform: `rotate(${rotation}deg)`, transformOrigin: '160px 160px' }">
            <path
              v-for="(prize, index) in prizeList"
              :key="index"
              :d="getSectorPath(index, index === winningPrizeIndex)"
              :fill="getPrizeColor(index)"
              :stroke="getPrizeColor(index)"
              stroke-width="2"
              :class="{ 'highlight-sector': index === winningPrizeIndex }"
            />
            <!-- 文字 -->
            <text
              v-for="(prize, index) in prizeList"
              :key="'text-' + index"
              :transform="getTextTransform(index)"
              fill="white"
              :font-size="getPrizeFontSize"
              text-anchor="middle"
              dominant-baseline="central"
              font-weight="bold"
              style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); writing-mode: vertical-rl; text-orientation: upright;"
            >{{ truncateText(prize, 5) }}</text>
          </g>
        </svg>

        <!-- 开始按钮 -->
        <div :class="{ 'disabled': isSpinning }" class="start-button" @click="handleStart">
          <div class="button-icon">🏮</div>
          <span class="button-text">{{ isSpinning ? '抽奖中' : '开始' }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <van-button icon="setting-o" type="default" @click="showCustomize = true">
          自定义奖项
        </van-button>
      </div>

      <!-- 中奖提示 -->
      <van-popup v-model:show="showResult" round>
        <div class="result-popup">
          <div class="result-icon">🎉</div>
          <h3 class="result-title">恭喜你！</h3>
          <p class="result-text">你抽中了：<span class="prize-name">{{ currentPrize }}</span></p>
          <van-button block type="primary" @click="showResult = false">确定</van-button>
        </div>
      </van-popup>

      <!-- 自定义奖项弹窗 -->
      <van-popup v-model:show="showCustomize" position="bottom" round>
        <div class="customize-popup">
          <div class="popup-header">
            <h3>自定义奖项</h3>
            <van-icon name="cross" @click="showCustomize = false" />
          </div>
          
          <div class="customize-content">
            <p class="customize-tip">每行输入一个奖项（至少5个，最多15个）</p>
            <van-field
              v-model="customPrizes"
              type="textarea"
              :rows="8"
              placeholder="一等奖&#10;二等奖&#10;三等奖&#10;谢谢参与&#10;再来一次"
              maxlength="750"
              show-word-limit
            />
          </div>

          <div class="popup-footer">
            <van-button block type="primary" @click="saveCustomPrizes">保存</van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import GameHeader from '../components/GameHeader.vue'

const router = useRouter()

// 状态
const isSpinning = ref(false)
const rotation = ref(0)
const showResult = ref(false)
const showCustomize = ref(false)
const currentPrize = ref('')
const customPrizes = ref('')
const winningPrizeIndex = ref(-1)

// 默认奖项
const defaultPrizes = [
  '一等奖',
  '二等奖',
  '三等奖',
  '谢谢参与',
  '再来一次'
]

// 奖项列表
const prizeList = ref([])

// 转盘颜色
const wheelColors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce',
  '#85c1e9', '#f8b739', '#52b788', '#ff85a1', '#7fb069',
  '#ffb347', '#87ceeb', '#ff6347', '#9370db', '#20b2aa'
]

// 计算属性
const getPrizeColor = (index) => {
  return wheelColors[index % wheelColors.length]
}

const getPrizeFontSize = computed(() => {
  const count = prizeList.value.length
  if (count <= 5) return '16px'
  if (count <= 8) return '14px'
  if (count <= 12) return '12px'
  return '10px'
})

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) : text
}

// 计算扇形路径
const getSectorPath = (index, isHighlight = false) => {
  const count = prizeList.value.length
  const anglePerSector = 360 / count
  const startAngle = index * anglePerSector - 90
  const endAngle = (index + 1) * anglePerSector - 90

  const cx = 160
  const cy = 160
  // 突出显示的扇形半径更大
  const r = isHighlight ? 165 : 150

  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)

  const largeArcFlag = anglePerSector > 180 ? 1 : 0

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

// 计算文字位置和旋转（垂直于圆心）
const getTextTransform = (index) => {
  const count = prizeList.value.length
  const anglePerSector = 360 / count
  
  // 扇区的中心角度（从12点钟方向开始，顺时针）
  const sectorCenterAngle = index * anglePerSector + anglePerSector / 2 - 90
  
  // 文字距离圆心的距离（半径的 60%）
  const distance = 90
  
  // 计算文字的位置
  const cx = 160
  const cy = 160
  const rad = (sectorCenterAngle * Math.PI) / 180
  
  const x = cx + distance * Math.cos(rad)
  const y = cy + distance * Math.sin(rad)
  
  // 文字旋转角度：让文字从圆心向外辐射
  // 加上90度让文字竖排方向正确
  let rotation = sectorCenterAngle + 90
  
  // 如果文字在左侧（90到270度），需要调整旋转角度以保持可读
  if (sectorCenterAngle > 90 && sectorCenterAngle < 270) {
    rotation = sectorCenterAngle - 90
  }
  
  return `translate(${x}, ${y}) rotate(${rotation})`
}

// 生命周期
onMounted(() => {
  loadPrizes()
})

// 方法
const loadPrizes = () => {
  const savedPrizes = localStorage.getItem('lotteryPrizes')
  if (savedPrizes) {
    try {
      const prizes = JSON.parse(savedPrizes)
      if (Array.isArray(prizes) && prizes.length >= 5) {
        prizeList.value = prizes.slice(0, 15)
        customPrizes.value = prizes.join('\n')
        return
      }
    } catch (error) {
      console.error('加载奖项失败:', error)
    }
  }
  // 使用默认奖项
  prizeList.value = [...defaultPrizes]
  customPrizes.value = defaultPrizes.join('\n')
}

const saveCustomPrizes = () => {
  const prizes = customPrizes.value
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    // 去除重复项
    .filter((item, index, arr) => arr.indexOf(item) === index)

  if (prizes.length < 5) {
    showToast({
      type: 'fail',
      message: '请至少输入5个奖项'
    })
    return
  }

  if (prizes.length > 15) {
    showToast({
      type: 'fail',
      message: '最多只能设置15个奖项'
    })
    return
  }

  prizeList.value = prizes.slice(0, 15)
  localStorage.setItem('lotteryPrizes', JSON.stringify(prizeList.value))
  
  showToast({
    type: 'success',
    message: '奖项保存成功'
  })
  
  showCustomize.value = false
}

const handleStart = () => {
  if (isSpinning.value) return

  isSpinning.value = true
  winningPrizeIndex.value = -1  // 重置中奖扇区

  // 随机旋转角度（5-7圈，即1800-2520度）
  const targetAngle = 1800 + Math.random() * 720

  // 旋转动画参数
  const totalRotation = targetAngle
  const duration = 3000 + Math.random() * 2000 // 3-5秒随机时间

  const startTime = Date.now()
  const startRotation = rotation.value

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 三段式动画：加速 → 匀速 → 减速
    let easeProgress
    if (progress < 0.2) {
      // 加速阶段 (0-20%)
      easeProgress = 0.5 * Math.pow(progress / 0.2, 2)
    } else if (progress < 0.7) {
      // 匀速阶段 (20-70%)
      easeProgress = 0.2 + 0.5 * (progress - 0.2) / 0.5
    } else {
      // 减速阶段 (70-100%)
      easeProgress = 0.7 + 0.3 * (1 - Math.pow(1 - (progress - 0.7) / 0.3, 2))
    }

    rotation.value = startRotation + totalRotation * easeProgress

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // 停止抽奖，计算12点钟方向对应的扇区
      isSpinning.value = false

      const count = prizeList.value.length
      const anglePerSector = 360 / count

      // 计算最终旋转角度（0-360范围）
      const finalRotation = rotation.value % 360

      // 12点钟方向是270度，需要计算哪个扇区在270度位置
      // 扇区范围：index * anglePerSector - 90 到 (index + 1) * anglePerSector - 90
      // 反向计算：270 - finalRotation 得到原始坐标系中的角度
      const angleAt12Clock = (270 - finalRotation + 360) % 360

      // 找到对应的扇区索引
      const sectorIndex = Math.floor((angleAt12Clock + 90) / anglePerSector) % count

      winningPrizeIndex.value = sectorIndex
      currentPrize.value = prizeList.value[sectorIndex]
      showResult.value = true
    }
  }

  requestAnimationFrame(animate)
}

const handleBack = () => {
  router.push('/')
}
</script>

<style scoped>
.lottery-game {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%);
  padding-bottom: 20px;
}

.lottery-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wheel-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 40px 0;
}

.wheel-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(230, 0, 18, 0.3));
}

.highlight-sector {
  filter: brightness(1.6) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 69, 0, 0.6));
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    filter: brightness(1.6) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 69, 0, 0.6));
  }
  50% {
    filter: brightness(1.8) drop-shadow(0 0 35px rgba(255, 215, 0, 1)) drop-shadow(0 0 50px rgba(255, 69, 0, 0.8));
  }
}

.start-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ff6b35 0%, #ffd700 50%, #ffed4e 100%);
  border: 5px solid #fff;
  box-shadow: 0 6px 20px rgba(230, 0, 18, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.start-button:hover:not(.disabled) {
  transform: translate(-50%, -50%) scale(1.08);
  box-shadow: 0 8px 24px rgba(230, 0, 18, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.start-button:active:not(.disabled) {
  transform: translate(-50%, -50%) scale(0.95);
}

.start-button.disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%);
  color: #999999;
  cursor: not-allowed;
}

.button-icon {
  font-size: 28px;
  margin-bottom: 2px;
  animation: swing 2s ease-in-out infinite;
}

@keyframes swing {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

.button-text {
  font-size: 16px;
  font-weight: bold;
  color: #e60012;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.action-buttons {
  margin-top: 20px;
}

.result-popup,
.customize-popup {
  padding: 20px;
  min-width: 300px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.popup-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: #e60012;
}

.popup-header .van-icon {
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.customize-content {
  margin-bottom: 20px;
}

.customize-tip {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.result-icon {
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
}

.result-title {
  font-size: 24px;
  font-weight: bold;
  color: #e60012;
  text-align: center;
  margin-bottom: 10px;
}

.result-text {
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.prize-name {
  font-size: 20px;
  font-weight: bold;
  color: #ffd700;
}

.popup-footer {
  margin-top: 20px;
}
</style>