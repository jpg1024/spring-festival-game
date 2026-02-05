<template>
  <div class="game-header">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="handleBack"
      :fixed="true"
      :placeholder="true"
    />
    <div class="game-info" v-if="showInfo">
      <div class="info-item">
        <span class="info-label">当前题号</span>
        <span class="info-value">{{ currentIndex }} / {{ total }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">正确率</span>
        <span class="info-value">{{ accuracy }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '游戏'
  },
  currentIndex: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 10
  },
  correctCount: {
    type: Number,
    default: 0
  },
  showInfo: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['back'])

const router = useRouter()

const accuracy = computed(() => {
  if (props.currentIndex === 0) return 0
  return Math.round((props.correctCount / props.currentIndex) * 100)
})

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
.game-header {
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
}

.game-info {
  display: flex;
  justify-content: space-around;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.info-label {
  font-size: var(--font-size-xs);
  opacity: 0.9;
}

.info-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gold);
}
</style>