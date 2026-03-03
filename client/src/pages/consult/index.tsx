import React, { useState } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import './index.scss'

export default function Consult() {
  const [inputText, setInputText] = useState('')

  const suggestions = [
    '睡眠训练技巧',
    '如何开始添加辅食',
    '什么时候该看儿科医生？'
  ]

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
        <Image className="info-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/info--v1.png" />
      </View>

      <ScrollView scrollY className="chat-scroll-area">
        {/* Welcome Section */}
        <View className="welcome-section">
          <Image className="sparkle-icon" src="https://img.icons8.com/ios-filled/50/FFB8A1/sparkling.png" />
          <Text className="welcome-title">今天我能帮您什么？</Text>
          <Text className="welcome-desc">可以问我关于喂养、睡眠或宝宝里程碑的任何问题。</Text>
        </View>

        {/* Chat Messages */}
        <View className="chat-messages">
          {/* AI Message 1 */}
          <View className="message-row ai-message">
            <Image className="msg-avatar" src="https://img.icons8.com/color/96/bot.png" />
            <View className="msg-bubble">
              <Text className="msg-text">你好！我是BabyPal，你的AI育儿助手。今天你想了解什么？</Text>
            </View>
          </View>

          {/* User Message */}
          <View className="message-row user-message">
            <View className="msg-bubble">
              <Text className="msg-text">3个月大的宝宝应该多久喂一次？</Text>
            </View>
          </View>

          {/* AI Message 2 */}
          <View className="message-row ai-message">
            <Image className="msg-avatar" src="https://img.icons8.com/color/96/bot.png" />
            <View className="msg-bubble">
              <Text className="msg-text">在3个月大的时候，大多数宝宝在24小时内大约吃6到8次。这通常意味着每3到4小时喂一次。但是，始终遵循宝宝的饥饿信号！</Text>
            </View>
          </View>
        </View>

        {/* Suggestions */}
        <View className="suggestions-section">
          <Text className="suggestions-title">示例问题</Text>
          <View className="suggestions-list">
            {suggestions.map((item, index) => (
              <View key={index} className="suggestion-chip">
                <Text className="chip-text">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View className="input-area-wrapper">
        <View className="input-box">
          <Image className="icon-btn" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/plus-math.png" />
          <Input 
            className="chat-input" 
            placeholder="输入消息..." 
            value={inputText}
            onInput={(e) => setInputText(e.detail.value)}
          />
          <Image className="icon-btn" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/microphone.png" />
          <View className="send-btn">
            <Image className="send-icon" src="https://img.icons8.com/ios-filled/50/ffffff/paper-plane.png" />
          </View>
        </View>
      </View>
    </View>
  )
}
