<template>
  <div class="answer-card" :class="{ 'correct': isCorrect, 'wrong': isWrong }">
    <div class="card-content">
      <!-- 题目 -->
      <div class="question-section">
        <div class="question-number">
          <span class="badge badge-primary">第 {{ currentIndex }} 题</span>
        </div>
        <div class="question-text">{{ question }}</div>
      </div>

      <!-- 提示（可选） -->
      <div class="hint-section" v-if="showHint && hint">
        <div class="hint-text">
          <span class="hint-icon">💡</span>
          {{ hint }}
        </div>
      </div>

      <!-- 用户输入区域 -->
      <div class="answer-section">
        <van-field
          v-model="userAnswer"
          :placeholder="placeholder"
          :readonly="readonly"
          @focus="handleFocus"
          @blur="handleBlur"
          class="answer-input"
          :error-message="errorMessage"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="action-section">
        <van-button
          v-if="!showAnswer && !readonly"
          type="primary"
          size="large"
          block
          @click="handleSubmit"
          :disabled="!userAnswer.trim() || submitting"
        >
          {{ submitText }}
        </van-button>

        <van-button
          v-if="showHintButton && !showHint && !showAnswer"
          type="default"
          size="normal"
          @click="handleShowHint"
          class="hint-button"
        >
          查看提示
        </van-button>

        <van-button
          v-if="showAnswerButton && !showAnswer"
          type="warning"
          size="normal"
          @click="handleShowAnswer"
          :disabled="!canShowAnswer"
          class="show-answer-button"
        >
          查看答案
        </van-button>

        <div v-if="showAnswer" class="answer-result">
          <div class="result-text" :class="resultClass">
            {{ resultText }}
          </div>
          <div class="correct-answer">
            <span class="answer-label">正确答案：</span>
            <span class="answer-value">{{ correctAnswer }}</span>
          </div>
        </div>

        <van-button
          v-if="showNextButton"
          type="primary"
          size="large"
          block
          @click="handleNext"
        >
          {{ nextButtonText }}
        </van-button>
      </div>

      <!-- 倒计时 -->
      <div class="countdown-section" v-if="showCountdown && !showAnswer">
        <div class="countdown-wrapper">
          <svg class="countdown-svg" viewBox="0 0 100 100">
            <circle
              class="countdown-bg"
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#ebedf0"
              stroke-width="6"
            />
            <circle
              class="countdown-progress"
              cx="50"
              cy="50"
              r="35"
              fill="none"
              :stroke="countdownColor"
              stroke-width="6"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              transform="rotate(-90 50 50)"
              stroke-linecap="round"
            />
          </svg>
          <div class="countdown-text">{{ countdownText }}</div>
        </div>
      </div>
    </div>

    <!-- 粒子效果容器 -->
    <div class="particle-container" ref="particleContainer"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  question: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  correctAnswer: {
    type: String,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 1
  },
  placeholder: {
    type: String,
    default: '请输入你的答案'
  },
  submitText: {
    type: String,
    default: '提交答案'
  },
  nextButtonText: {
    type: String,
    default: '下一题'
  },
  showHintButton: {
    type: Boolean,
    default: true
  },
  showAnswerButton: {
    type: Boolean,
    default: true
  },
  answerDelay: {
    type: Number,
    default: 5
  },
  countdownSeconds: {
    type: Number,
    default: 0
  },
  autoShowAnswer: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'showHint', 'showAnswer', 'next', 'focus', 'blur'])

const userAnswer = ref('')
const showHint = ref(false)
const showAnswer = ref(false)
const isCorrect = ref(false)
const isWrong = ref(false)
const submitting = ref(false)
const canShowAnswer = ref(false)
const showNextButton = ref(false)
const countdownText = ref('')
const particleContainer = ref(null)

const errorMessage = ref('')
const circumference = 2 * Math.PI * 35
const dashOffset = ref(0)
const remainingSeconds = ref(0)
let countdownInterval = null

const resultText = computed(() => {
  if (isCorrect.value) {
    const encouragements = ['太棒了！', '聪明！', '恭喜过关！', '答对了！']
    return encouragements[Math.floor(Math.random() * encouragements.length)]
  }
  return '再想想~'
})

const resultClass = computed(() => {
  return isCorrect.value ? 'correct' : 'wrong'
})

const countdownColor = computed(() => {
  if (remainingSeconds.value <= 5) return '#ee0a24'
  if (remainingSeconds.value <= 10) return '#ff976a'
  return '#ffd700'
})

watch(() => props.question, () => {
  resetCard()
})

watch(() => props.countdownSeconds, (newVal) => {
  if (newVal > 0) {
    startCountdown(newVal)
  } else {
    stopCountdown()
  }
})

const resetCard = () => {
  userAnswer.value = ''
  showHint.value = false
  showAnswer.value = false
  isCorrect.value = false
  isWrong.value = false
  submitting.value = false
  canShowAnswer.value = false
  showNextButton.value = false
  errorMessage.value = ''
  remainingSeconds.value = 0
  stopCountdown()
  
  // 重新启动倒计时
  if (props.countdownSeconds > 0) {
    startCountdown(props.countdownSeconds)
  }
  
  // 启用查看答案按钮的延迟
  if (props.showAnswerButton) {
    setTimeout(() => {
      canShowAnswer.value = true
    }, props.answerDelay * 1000)
  }
}

const handleSubmit = () => {
  if (submitting.value) return
  submitting.value = true

  const answer = userAnswer.value.trim().toLowerCase()
  const correct = props.correctAnswer.toLowerCase()

  // 简单的答案匹配（可以优化为更智能的匹配）
  isCorrect.value = answer === correct || answer.includes(correct)
  isWrong.value = !isCorrect.value

  if (isCorrect.value) {
    createParticles()
  }

  emit('submit', {
    answer: userAnswer.value,
    correct: isCorrect.value
  })

  showAnswer.value = true
  showNextButton.value = true
  stopCountdown()
  
  submitting.value = false
}

const handleShowHint = () => {
  showHint.value = true
  emit('showHint')
}

const handleShowAnswer = () => {
  if (!canShowAnswer.value) return
  isWrong.value = true
  showAnswer.value = true
  showNextButton.value = true
  stopCountdown()
  emit('showAnswer', false)
}

const handleNext = () => {
  emit('next')
}

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

const startCountdown = (seconds) => {
  remainingSeconds.value = seconds
  countdownText.value = seconds.toString()
  dashOffset.value = 0

  clearInterval(countdownInterval)
  countdownInterval = setInterval(() => {
    remainingSeconds.value--
    countdownText.value = remainingSeconds.value.toString()
    
    const progress = 1 - (remainingSeconds.value / seconds)
    dashOffset.value = circumference * progress

    if (remainingSeconds.value <= 0) {
      stopCountdown()
      // 倒计时结束时显示答案
      isWrong.value = true
      showAnswer.value = true
      showNextButton.value = true
      emit('showAnswer', false)
    }
  }, 1000)
}

const stopCountdown = () => {
  clearInterval(countdownInterval)
  countdownInterval = null
}

const createParticles = () => {
  if (!particleContainer.value) return

  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1']
  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      --tx: ${(Math.random() - 0.5) * 200}px;
      --ty: ${(Math.random() - 0.5) * 200}px;
    `
    particleContainer.value.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 1000)
  }
}

const showCountdown = computed(() => {
  return props.countdownSeconds > 0
})

// 组件挂载时启动倒计时
onMounted(() => {
  if (props.countdownSeconds > 0) {
    startCountdown(props.countdownSeconds)
  }
  
  // 启用查看答案按钮的延迟
  if (props.showAnswerButton) {
    setTimeout(() => {
      canShowAnswer.value = true
    }, props.answerDelay * 1000)
  }
})

// 组件卸载时清理倒计时
onUnmounted(() => {
  stopCountdown()
})
</script>

<style scoped>
.answer-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

.answer-card.correct {
  border: 2px solid var(--color-success);
  animation: correctPulse 0.6s ease;
}

.answer-card.wrong {
  animation: shake 0.5s ease;
}

.card-content {
  position: relative;
  z-index: 1;
}

.question-section {
  margin-bottom: var(--spacing-lg);
}

.question-number {
  margin-bottom: var(--spacing-md);
}

.question-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: 1.6;
}

.hint-section {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--bg-color-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-gold);
}

.hint-text {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.hint-icon {
  font-size: var(--font-size-lg);
}

.answer-section {
  margin-bottom: var(--spacing-lg);
}

.answer-input {
  background: var(--bg-color-light);
  border-radius: var(--radius-md);
}

.answer-input :deep(.van-field__control) {
  font-size: var(--font-size-lg);
  padding: var(--spacing-md);
}

.action-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hint-button,
.show-answer-button {
  width: 100%;
}

.answer-result {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.result-text {
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
}

.result-text.correct {
  color: var(--color-success);
  animation: encourageBounce 0.8s ease;
}

.result-text.wrong {
  color: var(--color-warning);
}

.correct-answer {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.answer-label {
  color: var(--text-secondary);
  margin-right: var(--spacing-sm);
}

.answer-value {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

.countdown-section {
  position: absolute;
  top: 0;
  right: var(--spacing-sm);
  z-index: 10;
}

.countdown-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
}

.countdown-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.countdown-bg {
  stroke: var(--border-color);
  stroke-width: 6;
}

.countdown-progress {
  transition: stroke-dashoffset 1s linear;
  stroke-width: 6;
}

.countdown-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

@keyframes correctPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes encourageBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>