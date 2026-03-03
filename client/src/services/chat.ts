import { api } from './api'
import type { ChatRequest, ChatResponse, Message } from '../types'

export const chatApi = {
  /**
   * 发送聊天消息
   */
  sendMessage(message: string, history: Message[] = []): Promise<ChatResponse> {
    return api.post<ChatResponse>('/api/chat', {
      message,
      history
    } as ChatRequest)
  }
}
