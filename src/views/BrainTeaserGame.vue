<template>
  <div class="brain-teaser-game">
    <!-- 游戏头部 -->
    <GameHeader
      title="脑筋急转弯"
      :current-index="gameStore.currentIndex + 1"
      :total="gameStore.totalQuestions"
      :correct-count="gameStore.correctCount"
      @back="handleBack"
    />

    <!-- 游戏内容区域 -->
    <div class="game-content" v-if="gameStore.isGameStarted && !gameStore.isGameCompleted">
      <AnswerCard
        v-if="gameStore.currentQuestion"
        :question="gameStore.currentQuestion.question"
        :hint="gameStore.currentQuestion.hint"
        :correct-answer="gameStore.currentQuestion.answer"
        :current-index="gameStore.currentIndex + 1"
        :placeholder="'请输入答案'"
        :submit-text="'提交答案'"
        :next-button-text="'下一题'"
        :show-hint-button="true"
        :show-answer-button="true"
        :answer-delay="gameStore.gameSettings.answerDelay"
        :countdown-seconds="countdownSeconds"
        :auto-show-answer="gameStore.gameSettings.autoShowAnswer"
        @submit="handleSubmit"
        @show-hint="handleShowHint"
        @show-answer="handleShowAnswer"
        @next="handleNext"
      />
    </div>

    <!-- 游戏开始界面 -->
    <div class="game-start" v-else-if="!gameStore.isGameStarted">
      <div class="start-container">
        <div class="game-icon">💡</div>
        <h2 class="game-title">脑筋急转弯</h2>
        <p class="game-description">趣味思维挑战，欢乐无限</p>
        
        <div class="game-info">
          <div class="info-card">
            <div class="info-label">题目数量</div>
            <div class="info-value">{{ totalQuestions }} 题</div>
          </div>
          <div class="info-card">
            <div class="info-label">倒计时模式</div>
            <div class="info-value">{{ countdownModeText }}</div>
          </div>
        </div>

        <div class="difficulty-select">
          <h3 class="select-title">选择难度</h3>
          <van-radio-group v-model="selectedDifficulty" direction="horizontal">
            <van-radio name="easy">简单</van-radio>
            <van-radio name="normal">普通</van-radio>
            <van-radio name="hard">困难</van-radio>
          </van-radio-group>
        </div>

        <van-button
          type="primary"
          size="large"
          block
          class="start-button"
          @click="startGame"
          :loading="loading"
        >
          开始挑战
        </van-button>
      </div>
    </div>

    <!-- 游戏结果弹窗 -->
    <ResultModal
      v-model:visible="showResultModal"
      :type="resultType"
      :total-questions="gameStore.totalQuestions"
      :correct-count="gameStore.correctCount"
      :wrong-count="gameStore.wrongCount"
      :achievements="gameStore.achievements"
      @confirm="handleResultConfirm"
    />

    <!-- 加载状态 -->
    <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { useGameContent } from '../composables/useGameContent'
import { getCountdownSeconds, COUNTDOWN_MODES } from '../composables/useCountdown'
import { useAnimation } from '../composables/useAnimation'
import { showToast, showDialog } from 'vant'
import GameHeader from '../components/GameHeader.vue'
import AnswerCard from '../components/AnswerCard.vue'
import ResultModal from '../components/ResultModal.vue'

const router = useRouter()
const gameStore = useGameStore()
const { questions, loading, loadContent } = useGameContent('brain-teaser')
const { playSound } = useAnimation()

const showResultModal = ref(false)
const selectedDifficulty = ref('normal')
const allQuestions = ref([])

const totalQuestions = computed(() => {
  switch (selectedDifficulty.value) {
    case 'easy': return 5
    case 'normal': return 10
    case 'hard': return 15
    default: return 10
  }
})

const countdownModeText = computed(() => {
  switch (gameStore.gameSettings.countdownMode) {
    case COUNTDOWN_MODES.SHORT: return '10秒'
    case COUNTDOWN_MODES.LONG: return '20秒'
    case COUNTDOWN_MODES.NONE: return '无倒计时'
    default: return '无倒计时'
  }
})

const countdownSeconds = computed(() => {
  return getCountdownSeconds(gameStore.gameSettings.countdownMode)
})

const resultType = computed(() => {
  const accuracy = gameStore.accuracy
  if (accuracy === 100) return 'success'
  if (accuracy >= 80) return 'success'
  if (accuracy >= 60) return 'warning'
  return 'error'
})

onMounted(async () => {
  gameStore.loadSettings()
  gameStore.setGame('brain-teaser')
  
  try {
    allQuestions.value = await loadContent()
  } catch (error) {
    showToast({
      type: 'fail',
      message: '加载题目失败，请刷新重试'
    })
  }
})

onUnmounted(() => {
  gameStore.resetGame()
})

const startGame = async () => {
  if (allQuestions.value.length === 0) {
    showToast({
      type: 'fail',
      message: '题目加载失败'
    })
    return
  }

  // 随机选择指定数量的题目
  const selectedQuestions = getRandomQuestions(allQuestions.value, totalQuestions.value)
  gameStore.setQuestions(selectedQuestions)
  gameStore.startGame()
  
  playSound('click')
}

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, questions.length))
}

const handleSubmit = (result) => {
  gameStore.submitAnswer(result.answer, result.correct)
  
  if (result.correct) {
    playSound('correct')
  } else {
    playSound('wrong')
  }
}

const handleShowHint = () => {
  playSound('click')
}

const handleShowAnswer = (correct) => {
  if (!correct) {
    gameStore.submitAnswer('', false)
  }
  playSound('click')
}

const handleNext = () => {
  const hasNext = gameStore.nextQuestion()
  
  if (!hasNext) {
    showResultModal.value = true
  }
  
  playSound('click')
}

const handleResultConfirm = () => {
  showResultModal.value = false
  router.back()
}

const handleBack = () => {
  if (gameStore.isGameStarted && !gameStore.isGameCompleted) {
    showDialog({
      title: '确认退出',
      message: '游戏正在进行中，确定要退出吗？当前进度将不会保存。',
      showCancelButton: true,
      confirmButtonText: '确定退出',
      cancelButtonText: '继续游戏'
    }).then(() => {
      router.push('/')
    }).catch(() => {
      // 用户选择继续游戏
    })
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.brain-teaser-game {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--bg-color) 0%, #fff5e8 100%);
  padding-bottom: calc(var(--spacing-xxl) + env(safe-area-inset-bottom));
}

.game-content {
  padding: var(--spacing-lg);
  margin-top: 120px;
}

.game-start {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.start-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.game-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-lg);
  animation: bounce 2s ease-in-out infinite;
}

.game-title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.game-description {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.game-info {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.info-card {
  flex: 1;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.info-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.info-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.difficulty-select {
  text-align: left;
  margin-bottom: var(--spacing-xl);
}

.select-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.start-button {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border: none;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-md);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>