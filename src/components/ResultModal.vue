<template>
  <van-dialog
    v-model:show="visible"
    :title="title"
    :show-confirm-button="showConfirmButton"
    :confirm-button-text="confirmButtonText"
    :show-cancel-button="showCancelButton"
    :cancel-button-text="cancelButtonText"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    class="result-modal"
  >
    <div class="modal-content">
      <!-- 结果图标 -->
      <div class="result-icon">
        <span class="icon-emoji">{{ iconEmoji }}</span>
      </div>

      <!-- 结果文字 -->
      <div class="result-title">{{ resultTitle }}</div>

      <!-- 统计信息 -->
      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-value">{{ totalQuestions }}</div>
          <div class="stat-label">总题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value correct">{{ correctCount }}</div>
          <div class="stat-label">答对</div>
        </div>
        <div class="stat-item">
          <div class="stat-value wrong">{{ wrongCount }}</div>
          <div class="stat-label">答错</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ accuracy }}%</div>
          <div class="stat-label">正确率</div>
        </div>
      </div>

      <!-- 成就徽章 -->
      <div class="achievements-section" v-if="achievements.length > 0">
        <div class="achievements-title">🏆 获得成就</div>
        <div class="achievements-list">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="achievement-item"
          >
            <span class="achievement-icon">{{ achievement.icon }}</span>
            <span class="achievement-name">{{ achievement.name }}</span>
          </div>
        </div>
      </div>

      <!-- 鼓励语 -->
      <div class="encourage-text">{{ encourageText }}</div>

      <!-- 额外内容 -->
      <div class="extra-content" v-if="$slots.default">
        <slot></slot>
      </div>
    </div>
  </van-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  correctCount: {
    type: Number,
    default: 0
  },
  wrongCount: {
    type: Number,
    default: 0
  },
  achievements: {
    type: Array,
    default: () => []
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  }
})

const emit = defineEmits(['confirm', 'cancel', 'update:visible'])

const visible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const title = computed(() => {
  const titles = {
    success: '恭喜完成！',
    warning: '完成挑战',
    error: '挑战结束',
    info: '游戏结束'
  }
  return titles[props.type]
})

const iconEmoji = computed(() => {
  const icons = {
    success: '🎉',
    warning: '👍',
    error: '😅',
    info: '🎊'
  }
  return icons[props.type]
})

const resultTitle = computed(() => {
  const accuracy = props.totalQuestions > 0 ? (props.correctCount / props.totalQuestions) * 100 : 0
  
  if (accuracy === 100) return '完美通关！'
  if (accuracy >= 80) return '表现优秀！'
  if (accuracy >= 60) return '继续加油！'
  if (accuracy >= 40) return '再接再厉！'
  return '多多练习！'
})

const accuracy = computed(() => {
  if (props.totalQuestions === 0) return 0
  return Math.round((props.correctCount / props.totalQuestions) * 100)
})

const encourageText = computed(() => {
  const accuracy = props.totalQuestions > 0 ? (props.correctCount / props.totalQuestions) * 100 : 0
  
  if (accuracy === 100) return '太厉害了！你是答题高手！'
  if (accuracy >= 80) return '非常棒！继续保持！'
  if (accuracy >= 60) return '还不错！还有提升空间！'
  if (accuracy >= 40) return '继续努力，下次会更好！'
  return '没关系，多练习就能进步！'
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.result-modal :deep(.van-dialog) {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.result-modal :deep(.van-dialog__header) {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-white);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  padding: var(--spacing-xl);
  text-align: center;
}

.modal-content {
  padding: var(--spacing-xl);
  text-align: center;
}

.result-icon {
  margin-bottom: var(--spacing-lg);
}

.icon-emoji {
  font-size: 80px;
  display: block;
  animation: bounce 1s ease-in-out infinite;
}

.result-title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--radius-lg);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.stat-value.correct {
  color: var(--color-success);
}

.stat-value.wrong {
  color: var(--color-error);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.achievements-section {
  margin-bottom: var(--spacing-xl);
}

.achievements-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gold);
  margin-bottom: var(--spacing-md);
}

.achievements-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  border-radius: var(--radius-round);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.achievement-icon {
  font-size: var(--font-size-md);
}

.encourage-text {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

.extra-content {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
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