// 对话相关类型

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

export interface ChatRequest {
  message: string
  history?: Message[]
}

export interface ChatResponse {
  answer: string
  suggestions: string[]
}
