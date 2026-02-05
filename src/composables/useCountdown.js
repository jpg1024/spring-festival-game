import { ref, computed, watch, onUnmounted } from 'vue'

export function useCountdown(initialSeconds = 0, autoStart = true, onComplete = null) {
  const remainingSeconds = ref(initialSeconds)
  const isRunning = ref(false)
  const isCompleted = ref(false)
  
  let timer = null

  const start = () => {
    if (isRunning.value || remainingSeconds.value <= 0) return
    
    isRunning.value = true
    isCompleted.value = false
    
    timer = setInterval(() => {
      remainingSeconds.value--
      
      if (remainingSeconds.value <= 0) {
        stop()
        isCompleted.value = true
        if (onComplete && typeof onComplete === 'function') {
          onComplete()
        }
      }
    }, 1000)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isRunning.value = false
  }

  const pause = () => {
    stop()
  }

  const resume = () => {
    start()
  }

  const reset = (newSeconds = initialSeconds) => {
    stop()
    remainingSeconds.value = newSeconds
    isCompleted.value = false
    
    if (autoStart) {
      start()
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = computed(() => {
    if (initialSeconds === 0) return 0
    return 1 - (remainingSeconds.value / initialSeconds)
  })

  const percentage = computed(() => {
    if (initialSeconds === 0) return 0
    return Math.round((1 - (remainingSeconds.value / initialSeconds)) * 100)
  })

  // 监听初始秒数变化
  watch(() => initialSeconds, (newVal) => {
    remainingSeconds.value = newVal
    isCompleted.value = false
    if (autoStart) {
      start()
    }
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    stop()
  })

  return {
    remainingSeconds,
    isRunning,
    isCompleted,
    progress,
    percentage,
    formatTime,
    start,
    stop,
    pause,
    resume,
    reset
  }
}

// 倒计时模式的配置
export const COUNTDOWN_MODES = {
  NONE: 'none',
  SHORT: '10',
  LONG: '20'
}

// 根据模式获取倒计时秒数
export function getCountdownSeconds(mode) {
  switch (mode) {
    case COUNTDOWN_MODES.SHORT:
      return 10
    case COUNTDOWN_MODES.LONG:
      return 20
    case COUNTDOWN_MODES.NONE:
    default:
      return 0
  }
}