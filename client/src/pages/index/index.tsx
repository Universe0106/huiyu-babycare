import React from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

export default function Index() {
  return (
    <View className="page-container">
      {/* Header */}
      <View className="header">
        <View className="header-text">
          <Text className="title">早上好，妈妈！</Text>
          <Text className="subtitle">你今天做得很棒。</Text>
        </View>
        <View className="bell-icon-wrapper">
          <Image className="bell-icon" src="https://img.icons8.com/ios-filled/50/FFB8A1/bell.png" />
        </View>
      </View>

      {/* Baby Info Card */}
      <View className="baby-card">
        <Image className="baby-avatar" src="https://img.icons8.com/color/96/baby.png" />
        <View className="baby-info">
          <Text className="baby-name">宝宝 Liam</Text>
          <Text className="baby-age">6个月，12天</Text>
        </View>
      </View>

      {/* Today's Tasks */}
      <View className="section">
        <Text className="section-title">今日任务</Text>
        <View className="tasks-row">
          <View className="task-card task-feeding">
            <View className="task-icon-wrapper feeding-icon">
              <Image className="task-icon" src="https://img.icons8.com/ios-filled/50/FFB8A1/baby-bottle.png" />
            </View>
            <Text className="task-name">喂养</Text>
            <Text className="task-time">10:30 AM</Text>
          </View>
          <View className="task-card task-diaper">
            <View className="task-icon-wrapper diaper-icon">
              <Image className="task-icon" src="https://img.icons8.com/ios-filled/50/A3C2FF/nappy.png" />
            </View>
            <Text className="task-name">换尿布</Text>
            <Text className="task-time">DRY 2H</Text>
          </View>
          <View className="task-card task-sleep">
            <View className="task-icon-wrapper sleep-icon">
              <Image className="task-icon" src="https://img.icons8.com/ios-filled/50/C6B9FF/crescent-moon.png" />
            </View>
            <Text className="task-name">睡眠</Text>
            <Text className="task-time">NAPPING</Text>
          </View>
        </View>
      </View>

      {/* Recent Records */}
      <View className="section">
        <Text className="section-title">最近记录</Text>
        <View className="recent-record-card">
          <View className="record-left">
            <View className="record-icon-wrapper">
              <Image className="record-icon" src="https://img.icons8.com/ios-filled/50/ffffff/baby-bottle.png" />
            </View>
            <View className="record-info">
              <Text className="record-label">上次喂养</Text>
              <Text className="record-time">07:45 AM</Text>
            </View>
          </View>
          <View className="record-right">
            <Text className="record-label">总量</Text>
            <Text className="record-amount">180 ml</Text>
          </View>
        </View>
      </View>

      {/* Parenting Tips */}
      <View className="section">
        <View className="section-header">
          <Text className="section-title" style={{marginBottom: 0}}>育儿建议</Text>
          <Text className="see-all">查看全部</Text>
        </View>
        <ScrollView scrollX className="tips-scroll" enableFlex>
          <View className="tips-row">
            <View className="tip-card">
              <Image className="tip-image" src="https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" mode="aspectFill" />
              <View className="tip-content">
                <Text className="tip-title">更好的睡眠习惯</Text>
                <Text className="tip-desc">今晚为你的小宝宝建立一个平静的睡前规律...</Text>
              </View>
            </View>
            <View className="tip-card">
              <Image className="tip-image" src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" mode="aspectFill" />
              <View className="tip-content">
                <Text className="tip-title">引入辅食</Text>
                <Text className="tip-desc">用这些营养的辅食食谱开启固体食物之旅...</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}