import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { sendChatMessage } from '../../services'
import { Message } from '../../types'
import './index.scss'

export default function Consult() {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: '你好！我是BabyPal，你的AI育儿助手。今天你想了解什么？'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  const suggestions = [
    '睡眠训练技巧',
    '如何开始添加辅食',
    '什么时候该看儿科医生？'
  ]

  // 自动滚动到底部
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const result = await sendChatMessage({
        message: userMessage.content,
        history: messages
      })

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: result.answer
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <View className="page-container chat-page">
      {/* Top Bar */}
      <View className="chat-topbar">
        <View className="agent-info">
          <Image className="agent-avatar" src="https://img.icons8.com/color/96/bot.png" />
          <View className="agent-text">
            <Text className="agent-name">BabyPal</Text>
            <View className="agent-status">
              <View className="status-dot"></View>
              <Text className="status-text">在线</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView scrollY className="chat-scroll-area">
        {/* Chat Messages */}
        <View className="chat-messages">
          {messages.map((msg) => (
            msg.role === 'ai' ? (
              <View key={msg.id} className="message-row ai-message">
                <Image className="msg-avatar" src="https://img.icons8.com/color/96/bot.png" />
                <View className="msg-bubble">
                  <Text className="msg-text">{msg.content}</Text>
                </View>
              </View>
            ) : (
              <View key={msg.id} className="message-row user-message">
                <View className="msg-bubble">
                  <Text className="msg-text">{msg.content}</Text>
                </View>
              </View>
            )
          ))}
          
          {isLoading && (
            <View className="message-row ai-message">
              <Image className="msg-avatar" src="https://img.icons8.com/color/96/bot.png" />
              <View className="msg-bubble loading">
                <Text className="msg-text">正在思考中...</Text>
              </View>
            </View>
          )}
          
          <View ref={scrollRef} />
        </View>

        {/* Suggestions */}
        <View className="suggestions-section">
          <Text className="suggestions-title">试试这样问</Text>
          <View className="suggestions-list">
            {suggestions.map((item, index) => (
              <View 
                key={index} 
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(item)}
              >
                <Text className="chip-text">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View className="input-area-wrapper">
        <View className="input-box">
          <Input 
            className="chat-input" 
            placeholder="输入消息..." 
            value={inputText}
            onInput={(e) => setInputText(e.detail.value)}
            onConfirm={handleSend}
            confirmType="send"
            disabled={isLoading}
          />
          <View 
            className={`send-btn ${inputText.trim() ? 'active' : ''}`}
            onClick={handleSend}
          >
            <Text className="send-icon">➤</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
