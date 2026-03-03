import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getGrowthRecords, addGrowthRecord, getBabyList } from '../../services/api'
import { Baby, GrowthRecord } from '../../types'
import './index.scss'

export default function Growth() {
  const [babies, setBabies] = useState<Baby[]>([])
  const [activeBabyId, setActiveBabyId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'height' | 'weight' | 'head'>('height')
  const [records, setRecords] = useState<GrowthRecord[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRecord, setNewRecord] = useState({
    height: '',
    weight: '',
    headCircumference: '',
    remark: ''
  })

  // 加载宝宝列表
  useEffect(() => {
    loadBabies()
  }, [])

  // 加载成长记录
  useEffect(() => {
    if (activeBabyId) {
      loadRecords()
    }
  }, [activeBabyId])

  const loadBabies = async () => {
    // TODO: 实际从后端获取
    // 暂时用模拟数据
    const mockBabies: Baby[] = [
      { id: '1', name: 'Leo', gender: 'male', birthDate: '2024-06-01', age: '8个月12天' }
    ]
    setBabies(mockBabies)
    if (mockBabies.length > 0) {
      setActiveBabyId(mockBabies[0].id)
    }
  }

  const loadRecords = async () => {
    try {
      const data = await getGrowthRecords(activeBabyId)
      setRecords(data.records || [])
    } catch (error) {
      console.error('Failed to load records:', error)
    }
  }

  const handleAddRecord = async () => {
    if (!newRecord.height && !newRecord.weight && !newRecord.headCircumference) {
      Taro.showToast({ title: '请至少填写一项', icon: 'none' })
      return
    }

    try {
      await addGrowthRecord({
        userId: activeBabyId,
        record: {
          height: newRecord.height ? parseFloat(newRecord.height) : undefined,
          weight: newRecord.weight ? parseFloat(newRecord.weight) : undefined,
          headCircumference: newRecord.headCircumference ? parseFloat(newRecord.headCircumference) : undefined,
          remark: newRecord.remark
        }
      })
      Taro.showToast({ title: '记录成功', icon: 'success' })
      setShowAddModal(false)
      setNewRecord({ height: '', weight: '', headCircumference: '', remark: '' })
      loadRecords()
    } catch (error) {
      Taro.showToast({ title: '记录失败', icon: 'none' })
    }
  }

  const currentBaby = babies.find(b => b.id === activeBabyId)
  const latestRecord = records[records.length - 1]

  return (
    <ScrollView scrollY className="page-container growth-page">
      {/* Header */}
      <View className="growth-header">
        <View className="header-text">
          <Text className="title">{currentBaby?.name || '宝宝'}的成长</Text>
          <Text className="subtitle">{currentBaby?.age || '0个月'}</Text>
        </View>
        <Image className="baby-avatar" src="https://img.icons8.com/color/96/baby.png" />
      </View>

      {/* 宝宝切换 */}
      {babies.length > 1 && (
        <View className="baby-switch">
          <Picker 
            mode="selector" 
            range={babies} 
            rangeKey="name"
            onChange={(e) => setActiveBabyId(babies[e.detail.value].id)}
          >
            <View className="switch-btn">
              <Text>切换宝宝</Text>
              <Text>▼</Text>
            </View>
          </Picker>
        </View>
      )}

      {/* Metrics Row */}
      <View className="metrics-row">
        <View 
          className={`metric-card ${activeTab === 'height' ? 'active-metric' : ''}`}
          onClick={() => setActiveTab('height')}
        >
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/FF8F73/ruler.png" />
          </View>
          <Text className="metric-label">身高</Text>
          <Text className="metric-value">{latestRecord?.height || '--'} <Text className="unit">cm</Text></Text>
        </View>

        <View 
          className={`metric-card ${activeTab === 'weight' ? 'active-metric' : ''}`}
          onClick={() => setActiveTab('weight')}
        >
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/9CA3AF/scale.png" />
          </View>
          <Text className="metric-label">体重</Text>
          <Text className="metric-value">{latestRecord?.weight || '--'} <Text className="unit">kg</Text></Text>
        </View>

        <View 
          className={`metric-card ${activeTab === 'head' ? 'active-metric' : ''}`}
          onClick={() => setActiveTab('head')}
        >
          <View className="metric-icon-wrapper">
            <Image className="metric-icon" src="https://img.icons8.com/ios-filled/50/9CA3AF/measuring-tape.png" />
          </View>
          <Text className="metric-label">头围</Text>
          <Text className="metric-value">{latestRecord?.headCircumference || '--'} <Text className="unit">cm</Text></Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="tabs-row">
        {[
          { key: 'height', label: '身高' },
          { key: 'weight', label: '体重' },
          { key: 'head', label: '头围' }
        ].map(tab => (
          <View 
            key={tab.key} 
            className={`tab-btn ${activeTab === tab.key ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            <Text className="tab-text">{tab.label}</Text>
          </View>
        ))}
      </View>

      {/* Chart Section */}
      <View className="chart-section">
        <View className="chart-header">
          <Text className="chart-title">{activeTab === 'height' ? '身高' : activeTab === 'weight' ? '体重' : '头围'}增长曲线</Text>
        </View>
        
        {/* 简化版曲线展示 */}
        <View className="chart-container">
          {records.length > 0 ? (
            <View className="chart-placeholder">
              <Text className="chart-hint">曲线图区域 (需ECharts支持)</Text>
              <Text className="chart-data">共 {records.length} 条记录</Text>
            </View>
          ) : (
            <View className="chart-empty">
              <Text className="empty-text">暂无记录</Text>
              <Text className="empty-hint">点击下方 + 按钮添加第一条记录</Text>
            </View>
          )}
        </View>
      </View>

      {/* Records List */}
      <View className="records-section">
        <Text className="section-title">记录历史</Text>
        {records.length > 0 ? (
          records.slice().reverse().map((record, index) => (
            <View key={record.id || index} className="record-item">
              <View className="record-date">
                <Text>{record.createdAt?.split('T')[0] || '未知日期'}</Text>
              </View>
              <View className="record-values">
                {record.height && <Text>身高: {record.height}cm</Text>}
                {record.weight && <Text>体重: {record.weight}kg</Text>}
                {record.headCircumference && <Text>头围: {record.headCircumference}cm</Text>}
              </View>
              {record.remark && <Text className="record-remark">{record.remark}</Text>}
            </View>
          ))
        ) : (
          <View className="empty-records">
            <Text>还没有记录哦～</Text>
          </View>
        )}
      </View>

      {/* FAB - 添加记录 */}
      <View className="fab-btn" onClick={() => setShowAddModal(true)}>
        <Image className="fab-icon" src="https://img.icons8.com/ios-glyphs/60/ffffff/plus-math.png" />
      </View>

      {/* 添加记录弹窗 */}
      {showAddModal && (
        <View className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <View className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Text className="modal-title">添加成长记录</Text>
            
            <View className="form-item">
              <Text className="form-label">身高 (cm)</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  type="digit" 
                  placeholder="请输入身高"
                  value={newRecord.height}
                  onInput={(e) => setNewRecord({ ...newRecord, height: e.detail.value })}
                />
              </View>
            </View>

            <View className="form-item">
              <Text className="form-label">体重 (kg)</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  type="digit" 
                  placeholder="请输入体重"
                  value={newRecord.weight}
                  onInput={(e) => setNewRecord({ ...newRecord, weight: e.detail.value })}
                />
              </View>
            </View>

            <View className="form-item">
              <Text className="form-label">头围 (cm)</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  type="digit" 
                  placeholder="请输入头围"
                  value={newRecord.headCircumference}
                  onInput={(e) => setNewRecord({ ...newRecord, headCircumference: e.detail.value })}
                />
              </View>
            </View>

            <View className="form-item">
              <Text className="form-label">备注</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  placeholder="选填"
                  value={newRecord.remark}
                  onInput={(e) => setNewRecord({ ...newRecord, remark: e.detail.value })}
                />
              </View>
            </View>

            <View className="modal-actions">
              <View className="btn-cancel" onClick={() => setShowAddModal(false)}>
                <Text>取消</Text>
              </View>
              <View className="btn-confirm" onClick={handleAddRecord}>
                <Text>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}


