import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getBabyList, addBaby, deleteBaby } from '../../services/api'
import { Baby } from '../../types'
import './index.scss'

export default function Profile() {
  const [babies, setBabies] = useState<Baby[]>([])
  const [activeBaby, setActiveBaby] = useState<Baby | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newBaby, setNewBaby] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    birthDate: ''
  })

  useEffect(() => {
    loadBabies()
  }, [])

  const loadBabies = async () => {
    try {
      const list = await getBabyList()
      setBabies(list)
      if (list.length > 0) {
        setActiveBaby(list[0])
      }
    } catch (error) {
      console.error('Failed to load babies:', error)
    }
  }

  const handleAddBaby = async () => {
    if (!newBaby.name || !newBaby.birthDate) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    try {
      await addBaby(newBaby)
      Taro.showToast({ title: '添加成功', icon: 'success' })
      setShowAddModal(false)
      setNewBaby({ name: '', gender: 'male', birthDate: '' })
      loadBabies()
    } catch (error) {
      Taro.showToast({ title: '添加失败', icon: 'none' })
    }
  }

  const handleDeleteBaby = async (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个宝宝吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await deleteBaby(id)
            Taro.showToast({ title: '已删除', icon: 'success' })
            loadBabies()
          } catch (error) {
            Taro.showToast({ title: '删除失败', icon: 'none' })
          }
        }
      }
    })
  }

  return (
    <ScrollView scrollY className="page-container profile-page">
      {/* Top Bar */}
      <View className="profile-topbar">
        <Text className="topbar-title">我的</Text>
      </View>

      {/* User Info */}
      <View className="user-info-section">
        <View className="avatar-wrapper">
          <Image 
            className="user-avatar" 
            src={activeBaby?.avatar || "https://img.icons8.com/color/96/baby.png"} 
          />
        </View>
        <Text className="user-name">{activeBaby?.name || '添加宝宝'}</Text>
        <Text className="user-desc">
          {activeBaby ? `${activeBaby.age || ''} • ${activeBaby.gender === 'male' ? '男' : '女'}` : '点击下方添加宝宝'}
        </Text>
        
        <View className="baby-list">
          {babies.map(baby => (
            <View 
              key={baby.id} 
              className={`baby-chip ${activeBaby?.id === baby.id ? 'active' : ''}`}
              onClick={() => setActiveBaby(baby)}
            >
              <Text className="chip-name">{baby.name}</Text>
            </View>
          ))}
          <View className="baby-chip add-btn" onClick={() => setShowAddModal(true)}>
            <Text className="chip-name">+ 添加</Text>
          </View>
        </View>
      </View>

      {/* Menus */}
      <View className="menu-group">
        <Text className="group-title">信息</Text>
        <View className="menu-card">
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-blue">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/3B82F6/babys-room.png" />
              </View>
              <Text className="menu-text">宝宝信息</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
          <View className="menu-divider" />
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-yellow">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/F59E0B/trophy.png" />
              </View>
              <Text className="menu-text">成长里程碑</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
        </View>
      </View>

      <View className="menu-group">
        <Text className="group-title">应用</Text>
        <View className="menu-card">
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-pink">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/EC4899/history.png" />
              </View>
              <Text className="menu-text">问答历史</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
          <View className="menu-divider" />
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-purple">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/8B5CF6/gallery.png" />
              </View>
              <Text className="menu-text">回忆</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
          <View className="menu-divider" />
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-gray">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/6B7280/settings.png" />
              </View>
              <Text className="menu-text">设置</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
        </View>
      </View>

      {/* 添加宝宝弹窗 */}
      {showAddModal && (
        <View className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <View className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Text className="modal-title">添加宝宝</Text>
            
            <View className="form-item">
              <Text className="form-label">姓名</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  placeholder="请输入宝宝姓名"
                  value={newBaby.name}
                  onInput={(e) => setNewBaby({ ...newBaby, name: e.detail.value })}
                />
              </View>
            </View>

            <View className="form-item">
              <Text className="form-label">性别</Text>
              <View className="gender-select">
                <View 
                  className={`gender-option ${newBaby.gender === 'male' ? 'active' : ''}`}
                  onClick={() => setNewBaby({ ...newBaby, gender: 'male' })}
                >
                  <Text>男</Text>
                </View>
                <View 
                  className={`gender-option ${newBaby.gender === 'female' ? 'active' : ''}`}
                  onClick={() => setNewBaby({ ...newBaby, gender: 'female' })}
                >
                  <Text>女</Text>
                </View>
              </View>
            </View>

            <View className="form-item">
              <Text className="form-label">出生日期</Text>
              <View className="form-input-wrapper">
                <Input 
                  className="form-input" 
                  placeholder="格式: 2024-01-01"
                  value={newBaby.birthDate}
                  onInput={(e) => setNewBaby({ ...newBaby, birthDate: e.detail.value })}
                />
              </View>
            </View>

            <View className="modal-actions">
              <View className="btn-cancel" onClick={() => setShowAddModal(false)}>
                <Text>取消</Text>
              </View>
              <View className="btn-confirm" onClick={handleAddBaby}>
                <Text>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

// 修复 JSX - Taro 使用 Input 组件需要从 @tarojs/components 导入
import { Input } from '@tarojs/components'
