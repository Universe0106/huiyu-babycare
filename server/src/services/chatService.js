const knowledgeService = require('./knowledgeService')

class ChatService {
  /**
   * 处理用户对话
   */
  handleChat(message, history = []) {
    // 调用知识库服务获取回答
    const result = knowledgeService.searchAnswer(message)

    return {
      message: message,
      answer: result.answer,
      suggestions: result.suggestions,
      timestamp: new Date().toISOString()
    }
  }
}

module.exports = new ChatService()
