import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

export default function Growth() {
  const [activeTab, setActiveTab] = useState('height')

  return (
    <ScrollView scrollY className="page-container growth-page">
      {/* Header */}
      <View className="growth-header">
        <View className="header-text">
          <Text className="title">Leo的成长</Text>
          <Text className="subtitle">8个月，12天</Text>
        </View>
        <Image className="baby-avatar" src="https://img.icons8.com/color/96/baby.png" />
      </View>

      {/* Metrics Row */}
      <View className="metrics-row">
        <View className="metric-card active-metric">
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/FF8F73/ruler.png" />
          </View>
          <Text className="metric-label">身高</Text>
          <Text className="metric-value">71.5 <Text className="unit">cm</Text></Text>
          <Text className="metric-diff">+1.2 cm</Text>
        </View>

        <View className="metric-card">
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/9CA3AF/scale.png" />
          </View>
          <Text className="metric-label">体重</Text>
          <Text className="metric-value">8.4 <Text className="unit">kg</Text></Text>
          <Text className="metric-diff">+0.3 kg</Text>
        </View>

        <View className="metric-card">
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/9CA3AF/measuring-tape.png" />
          </View>
          <Text className="metric-label">头围</Text>
          <Text className="metric-value">44.2 <Text className="unit">cm</Text></Text>
          <Text className="metric-diff">+0.5 cm</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="tabs-row">
        {['height', 'weight', 'head'].map(tab => {
          const tabNames: Record<string, string> = { height: '身高', weight: '体重', head: '头围' }
          const isActive = activeTab === tab
          return (
            <View 
              key={tab} 
              className={`tab-btn ${isActive ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <Text className="tab-text">{tabNames[tab]}</Text>
            </View>
          )
        })}
      </View>

      {/* Chart Section */}
      <View className="chart-section">
        <View className="chart-header">
          <Text className="chart-title">身高增长曲线</Text>
          <View className="chart-legend">
            <View className="legend-dot"></View>
            <Text className="legend-text">百分位数 (50th)</Text>
          </View>
        </View>
        <View className="chart-placeholder">
          {/* Mock line chart using an image */}
          <Image className="chart-image" src="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" mode="aspectFill" />
        </View>
        <View className="chart-x-axis">
          <Text>3m</Text>
          <Text>4m</Text>
          <Text>5m</Text>
          <Text>6m</Text>
          <Text>7m</Text>
          <Text>8m</Text>
        </View>
      </View>

      {/* Growth Trend */}
      <View className="trend-section">
        <View className="trend-header">
          <Image className="trend-icon" src="https://img.icons8.com/ios-filled/50/FF8F73/sparkling.png" />
          <Text className="trend-title">成长趋势</Text>
        </View>
        <Text className="trend-text">
          Leo目前的身高处于第75百分位。这与他之前的测量结果一致。
        </Text>
      </View>

      {/* FAB */}
      <View className="fab-btn">
        <Image className="fab-icon" src="https://img.icons8.com/ios-glyphs/60/ffffff/plus-math.png" />
      </View>
    </ScrollView>
  )
}
