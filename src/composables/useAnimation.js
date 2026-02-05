import { ref, nextTick } from 'vue'

export function useAnimation() {
  const isAnimating = ref(false)
  const particleContainer = ref(null)

  // 创建粒子爆炸效果
  const createParticles = (container, options = {}) => {
    const {
      count = 20,
      colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
      size = 10,
      spread = 200
    } = options

    if (!container) return

    const particles = []

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      const angle = (Math.PI * 2 * i) / count
      const distance = Math.random() * spread
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
        animation: particleFloat 1s ease-out forwards;
      `
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // 清理粒子
    setTimeout(() => {
      particles.forEach(p => p.remove())
    }, 1000)
  }

  // 创建红包雨效果
  const createRedPacketRain = (container, options = {}) => {
    const {
      count = 10,
      duration = 3000
    } = options

    if (!container) return

    const packets = []

    for (let i = 0; i < count; i++) {
      const packet = document.createElement('div')
      packet.className = 'red-packet'
      packet.textContent = '🧧'
      
      packet.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: -50px;
        font-size: 32px;
        animation: redPacketFall ${duration + Math.random() * 1000}ms linear forwards;
        animation-delay: ${i * 200}ms;
        z-index: 9999;
        pointer-events: none;
      `
      
      document.body.appendChild(packet)
      packets.push(packet)
    }

    // 清理红包
    setTimeout(() => {
      packets.forEach(p => p.remove())
    }, duration + count * 200)
  }

  // 添加抖动动画
  const addShakeAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 500,
      intensity = 10
    } = options

    element.style.animation = `shake ${duration}ms ease`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-${intensity}px); }
        20%, 40%, 60%, 80% { transform: translateX(${intensity}px); }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 添加脉冲动画
  const addPulseAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 600,
      scale = 1.1
    } = options

    element.style.animation = `pulse ${duration}ms ease`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(${scale}); }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 添加弹跳动画
  const addBounceAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 800,
      distance = 20
    } = options

    element.style.animation = `bounce ${duration}ms ease`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-${distance}px); }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 添加旋转动画
  const addRotateAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 500,
      degrees = 360
    } = options

    element.style.animation = `rotate ${duration}ms ease`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(${degrees}deg); }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 添加淡入动画
  const addFadeInAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 300
    } = options

    element.style.opacity = '0'
    element.style.animation = `fadeIn ${duration}ms ease forwards`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.opacity = ''
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 添加淡出动画
  const addFadeOutAnimation = (element, options = {}) => {
    if (!element) return

    const {
      duration = 300,
      onComplete = null
    } = options

    element.style.animation = `fadeOut ${duration}ms ease forwards`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
      if (onComplete && typeof onComplete === 'function') {
        onComplete()
      }
    }, duration)
  }

  // 滑动进入动画
  const addSlideInAnimation = (element, options = {}) => {
    if (!element) return

    const {
      direction = 'up',
      duration = 300,
      distance = 100
    } = options

    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`
    }

    element.style.animation = `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration}ms ease forwards`
    
    // 创建动态 keyframes
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} {
        from {
          transform: ${transforms[direction]};
          opacity: 0;
        }
        to {
          transform: translate(0, 0);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(styleSheet)

    setTimeout(() => {
      element.style.animation = ''
      styleSheet.remove()
    }, duration)
  }

  // 播放音效（预留）
  const playSound = (soundType) => {
    // 检查是否启用了音效
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false'
    if (!soundEnabled) return

    // 这里可以添加实际的音效播放逻辑
    // 例如使用 Web Audio API 或播放音频文件
    console.log(`Playing sound: ${soundType}`)
    
    // 示例：使用 Web Audio API 创建简单的音效
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (soundType) {
        case 'correct':
          oscillator.frequency.value = 523.25 // C5
          oscillator.type = 'sine'
          break
        case 'wrong':
          oscillator.frequency.value = 196.00 // G3
          oscillator.type = 'sawtooth'
          break
        case 'click':
          oscillator.frequency.value = 800
          oscillator.type = 'square'
          break
      }

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  return {
    isAnimating,
    particleContainer,
    createParticles,
    createRedPacketRain,
    addShakeAnimation,
    addPulseAnimation,
    addBounceAnimation,
    addRotateAnimation,
    addFadeInAnimation,
    addFadeOutAnimation,
    addSlideInAnimation,
    playSound
  }
}