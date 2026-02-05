import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // 状态
  const currentGame = ref(null)
  const questions = ref([])
  const currentIndex = ref(0)
  const correctCount = ref(0)
  const wrongCount = ref(0)
  const answerHistory = ref([])
  const isGameStarted = ref(false)
  const isGameCompleted = ref(false)
  const gameSettings = ref({
    countdownMode: 'none', // 'none', '10', '20'
    soundEnabled: true,
    answerDelay: 5,
    autoShowAnswer: false
  })
  const achievements = ref([])
  const continuousCorrectCount = ref(0)
  const maxContinuousCorrectCount = ref(0)

  // 计算属性
  const totalQuestions = computed(() => questions.value.length)
  const remainingQuestions = computed(() => totalQuestions.value - currentIndex.value - 1)
  const accuracy = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((correctCount.value / (currentIndex.value + 1)) * 100)
  })
  const currentQuestion = computed(() => questions.value[currentIndex.value] || null)

  // Actions
  const setGame = (gameType) => {
    currentGame.value = gameType
    resetGame()
  }

  const setQuestions = (newQuestions) => {
    questions.value = shuffleArray([...newQuestions])
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const startGame = () => {
    isGameStarted.value = true
    isGameCompleted.value = false
    currentIndex.value = 0
    correctCount.value = 0
    wrongCount.value = 0
    answerHistory.value = []
    continuousCorrectCount.value = 0
    maxContinuousCorrectCount.value = 0
  }

  const submitAnswer = (answer, isCorrect) => {
    const result = {
      questionId: currentQuestion.value.id,
      question: currentQuestion.value.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.value.answer,
      isCorrect: isCorrect,
      timestamp: new Date().toISOString()
    }

    answerHistory.value.push(result)

    if (isCorrect) {
      correctCount.value++
      continuousCorrectCount.value++
      if (continuousCorrectCount.value > maxContinuousCorrectCount.value) {
        maxContinuousCorrectCount.value = continuousCorrectCount.value
      }
      checkAchievements()
    } else {
      wrongCount.value++
      continuousCorrectCount.value = 0
    }

    return result
  }

  const nextQuestion = () => {
    if (currentIndex.value < totalQuestions.value - 1) {
      currentIndex.value++
      return true
    } else {
      completeGame()
      return false
    }
  }

  const completeGame = () => {
    isGameCompleted.value = true
    isGameStarted.value = false
    
    // 保存游戏记录
    saveGameRecord()
  }

  const resetGame = () => {
    currentGame.value = null
    questions.value = []
    currentIndex.value = 0
    correctCount.value = 0
    wrongCount.value = 0
    answerHistory.value = []
    isGameStarted.value = false
    isGameCompleted.value = false
    continuousCorrectCount.value = 0
    maxContinuousCorrectCount.value = 0
    achievements.value = []
  }

  const updateSettings = (newSettings) => {
    gameSettings.value = { ...gameSettings.value, ...newSettings }
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings.value))
  }

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('gameSettings')
    if (savedSettings) {
      gameSettings.value = JSON.parse(savedSettings)
    }
  }

  const checkAchievements = () => {
    const newAchievements = []

    // 连续答对3题
    if (continuousCorrectCount.value >= 3 && !hasAchievement('连续答对3题')) {
      newAchievements.push({
        id: 'continuous-3',
        name: '连续答对3题',
        icon: '🎯',
        description: '连续答对3道题目'
      })
    }

    // 连续答对5题
    if (continuousCorrectCount.value >= 5 && !hasAchievement('连续答对5题')) {
      newAchievements.push({
        id: 'continuous-5',
        name: '连续答对5题',
        icon: '🔥',
        description: '连续答对5道题目'
      })
    }

    // 正确率达到80%
    if (accuracy >= 80 && currentIndex.value >= 5 && !hasAchievement('正确率80%')) {
      newAchievements.push({
        id: 'accuracy-80',
        name: '正确率80%',
        icon: '📊',
        description: '答题正确率达到80%'
      })
    }

    // 完美通关（正确率100%）
    if (accuracy === 100 && isGameCompleted.value && !hasAchievement('完美通关')) {
      newAchievements.push({
        id: 'perfect-score',
        name: '完美通关',
        icon: '🏆',
        description: '全部答对，完美通关！'
      })
    }

    // 添加新成就
    newAchievements.forEach(achievement => {
      if (!achievements.value.find(a => a.id === achievement.id)) {
        achievements.value.push(achievement)
      }
    })
  }

  const hasAchievement = (name) => {
    return achievements.value.some(a => a.name === name)
  }

  const saveGameRecord = () => {
    const record = {
      gameType: currentGame.value,
      totalQuestions: totalQuestions.value,
      correctCount: correctCount.value,
      wrongCount: wrongCount.value,
      accuracy: accuracy.value,
      maxContinuousCorrect: maxContinuousCorrectCount.value,
      achievements: achievements.value,
      completedAt: new Date().toISOString()
    }

    const records = JSON.parse(localStorage.getItem('gameRecords') || '[]')
    records.push(record)
    
    // 只保留最近10条记录
    if (records.length > 10) {
      records.splice(0, records.length - 10)
    }

    localStorage.setItem('gameRecords', JSON.stringify(records))
  }

  const getGameRecords = () => {
    return JSON.parse(localStorage.getItem('gameRecords') || '[]')
  }

  const getBestRecord = (gameType) => {
    const records = getGameRecords()
    const gameRecords = records.filter(r => r.gameType === gameType)
    
    if (gameRecords.length === 0) return null

    return gameRecords.reduce((best, current) => {
      if (current.accuracy > best.accuracy) return current
      return best
    })
  }

  const getTotalGamesPlayed = () => {
    return getGameRecords().length
  }

  const getTotalCorrectAnswers = () => {
    const records = getGameRecords()
    return records.reduce((total, record) => total + record.correctCount, 0)
  }

  return {
    // State
    currentGame,
    questions,
    currentIndex,
    correctCount,
    wrongCount,
    answerHistory,
    isGameStarted,
    isGameCompleted,
    gameSettings,
    achievements,
    continuousCorrectCount,
    maxContinuousCorrectCount,
    
    // Computed
    totalQuestions,
    remainingQuestions,
    accuracy,
    currentQuestion,
    
    // Actions
    setGame,
    setQuestions,
    startGame,
    submitAnswer,
    nextQuestion,
    completeGame,
    resetGame,
    updateSettings,
    loadSettings,
    checkAchievements,
    hasAchievement,
    saveGameRecord,
    getGameRecords,
    getBestRecord,
    getTotalGamesPlayed,
    getTotalCorrectAnswers
  }
})