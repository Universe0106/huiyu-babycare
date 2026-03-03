import React from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

export default function Profile() {
  return (
    <ScrollView scrollY className="page-container profile-page">
      {/* Top Bar */}
      <View className="profile-topbar">
        <Image className="icon-btn" src="https://img.icons8.com/ios-glyphs/60/1F2937/arrow-left.png" />
        <Text className="topbar-title">我的</Text>
        <Image className="icon-btn bell-icon" src="https://img.icons8.com/ios-filled/50/FFB8A1/bell.png" />
      </View>

      {/* User Info */}
      <View className="user-info-section">
        <View className="avatar-wrapper">
          <Image className="user-avatar" src="https://img.icons8.com/color/96/baby.png" />
          <View className="edit-badge">
            <Image className="edit-icon" src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" />
          </View>
        </View>
        <Text className="user-name">宝宝 Liam</Text>
        <Text className="user-desc">8个月 • 男</Text>
        
        <View className="switch-btn">
          <Image className="switch-icon" src="https://img.icons8.com/ios-glyphs/60/FF8F73/refresh.png" />
          <Text className="switch-text">切换宝宝</Text>
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
        <Text className="group-title">个性化</Text>
        <View className="menu-card">
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-pink">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/EC4899/like.png" />
              </View>
              <Text className="menu-text">收藏</Text>
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
        </View>
      </View>

      <View className="menu-group">
        <Text className="group-title">应用</Text>
        <View className="menu-card">
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-gray">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/6B7280/settings.png" />
              </View>
              <Text className="menu-text">设置</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
          <View className="menu-divider" />
          <View className="menu-item">
            <View className="menu-left">
              <View className="menu-icon-wrapper bg-gray">
                <Image className="menu-icon" src="https://img.icons8.com/ios-filled/50/6B7280/help.png" />
              </View>
              <Text className="menu-text">帮助与支持</Text>
            </View>
            <Image className="arrow-icon" src="https://img.icons8.com/ios-glyphs/60/9CA3AF/chevron-right.png" />
          </View>
        </View>
      </View>

      {/* Logout */}
      <View className="logout-btn">
        <Text className="logout-text">退出登录</Text>
      </View>

    </ScrollView>
  )
}
