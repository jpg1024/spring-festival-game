import { ref, onMounted } from 'vue'
import axios from 'axios'

// 内置数据路径
const BUILT_IN_DATA = {
  riddle: '/data/riddles.json',
  'brain-teaser': '/data/brainTeasers.json'
}

export function useGameContent(gameType) {
  const questions = ref([])
  const loading = ref(false)
  const error = ref(null)
  const useLLM = ref(false)

  // 从内置数据加载
  const loadBuiltInData = async () => {
    try {
      loading.value = true
      error.value = null
      
      const dataPath = BUILT_IN_DATA[gameType]
      const response = await fetch(dataPath)
      
      if (!response.ok) {
        throw new Error(`Failed to load ${gameType} data`)
      }
      
      const data = await response.json()
      questions.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Error loading built-in data:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 从大模型加载（预留接口）
  const loadFromLLM = async (count = 10) => {
    try {
      loading.value = true
      error.value = null
      
      // 检查环境变量配置
      const apiKey = import.meta.env.VITE_LLM_API_KEY
      const endpoint = import.meta.env.VITE_LLM_ENDPOINT
      
      if (!apiKey || !endpoint) {
        throw new Error('LLM API not configured')
      }
      
      // 构建提示词
      const prompt = buildPrompt(gameType, count)
      
      // 调用大模型 API
      const response = await axios.post(
        endpoint,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一个春节主题游戏内容生成助手，请根据用户的要求生成符合格式的 JSON 数据。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      // 解析返回的内容
      const content = response.data.choices[0].message.content
      const data = parseLLMResponse(content)
      
      questions.value = data
      useLLM.value = true
      return data
    } catch (err) {
      error.value = err.message
      console.error('Error loading from LLM:', err)
      
      // 如果大模型加载失败，回退到内置数据
      console.log('Falling back to built-in data...')
      return loadBuiltInData()
    } finally {
      loading.value = false
    }
  }

  // 构建提示词
  const buildPrompt = (gameType, count) => {
    const prompts = {
      riddle: `请生成 ${count} 个春节主题的灯谜，格式要求：
1. 每个灯谜包含以下字段：
   - id: 数字，从1开始递增
   - question: 灯谜题目（中文）
   - answer: 谜底（中文，简洁）
   - hint: 提示信息（中文，简洁）
   - type: 固定为 "riddle"

2. 要求：
   - 内容要贴合春节主题（如年俗、食物、传统等）
   - 谜底要准确且常见
   - 提示要恰当不过于明显
   - 返回纯 JSON 数组格式，不要其他文字

示例格式：
[
  {
    "id": 1,
    "question": "红红脸儿像苹果，切开里面汁儿多。生吃熟食都可以，酸酸甜甜就是我。",
    "answer": "西红柿",
    "hint": "一种常见的蔬菜水果",
    "type": "riddle"
  }
]`,
      
      'brain-teaser': `请生成 ${count} 个有趣的脑筋急转弯，格式要求：
1. 每个脑筋急转弯包含以下字段：
   - id: 数字，从1开始递增
   - question: 题目（中文）
   - answer: 答案（中文，简洁有趣）
   - hint: 提示信息（中文，简洁）
   - type: 固定为 "brainTeaser"

2. 要求：
   - 题目要有创意和趣味性
   - 答案要出人意料又合乎逻辑
   - 提示要恰当不过于明显
   - 返回纯 JSON 数组格式，不要其他文字

示例格式：
[
  {
    "id": 1,
    "question": "什么东西早上四条腿，中午两条腿，晚上三条腿？",
    "answer": "人",
    "hint": "这是斯芬克斯之谜",
    "type": "brainTeaser"
  }
]`
    }
    
    return prompts[gameType] || ''
  }

  // 解析大模型返回的内容
  const parseLLMResponse = (content) => {
    try {
      // 尝试直接解析 JSON
      return JSON.parse(content)
    } catch (err) {
      // 如果直接解析失败，尝试提取 JSON 部分
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('Failed to parse LLM response')
    }
  }

  // 随机获取指定数量的题目
  const getRandomQuestions = (count) => {
    if (questions.value.length === 0) return []
    
    const shuffled = [...questions.value].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // 检查是否可以使用大模型
  const checkLLMAvailable = () => {
    return !!(
      import.meta.env.VITE_LLM_API_KEY &&
      import.meta.env.VITE_LLM_ENDPOINT
    )
  }

  // 加载游戏内容
  const loadContent = async (useLlmIfAvailable = true, count = 10) => {
    if (useLlmIfAvailable && checkLLMAvailable()) {
      return loadFromLLM(count)
    }
    return loadBuiltInData()
  }

  return {
    questions,
    loading,
    error,
    useLLM,
    loadBuiltInData,
    loadFromLLM,
    loadContent,
    getRandomQuestions,
    checkLLMAvailable
  }
}