import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface KnowledgeCategory {
  id: string
  title: string
  icon: string
  items: string[]
}

const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  { id: 'daily', title: '日常护理', icon: '🧴', items: ['红屁股', '脐带护理', '湿疹', '睡眠', '耳朵护理', '口腔护理'] },
  { id: 'symptom', title: '常见症状', icon: '🤒', items: ['发烧', '感冒', '皮疹', '腹泻', '便秘'] },
  { id: 'growth', title: '发育监测', icon: '📈', items: ['身高体重', '大运动'] },
  { id: 'feed', title: '喂养指导', icon: '🍼', items: ['奶粉选择', '辅食添加'] },
  { id: 'health', title: '健康防护', icon: '💉', items: ['疫苗接种', '常见用药'] },
]

export default function Knowledge() {
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('daily')

  const handleSearch = () => {
    if (searchText) {
      Taro.showToast({ title: '搜索功能开发中', icon: 'none' })
    }
  }

  const currentItems = KNOWLEDGE_CATEGORIES.find(c => c.id === activeCategory)?.items || []

  return (
    <View className="knowledge">
      <View className="header">
        <Text className="title">知识库</Text>
      </View>

      <View className="search-box">
        <Input 
          className="search-input"
          placeholder="搜索育儿知识"
          value={searchText}
          onInput={(e) => setSearchText(e.detail.value)}
          onConfirm={handleSearch}
        />
      </View>

      <View className="categories">
        {KNOWLEDGE_CATEGORIES.map(cat => (
          <View 
            key={cat.id}
            className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <Text className="cat-icon">{cat.icon}</Text>
            <Text className="cat-title">{cat.title}</Text>
          </View>
        ))}
      </View>

      <View className="article-list">
        {currentItems.map((item, idx) => (
          <View key={idx} className="article-item">
            <Text className="article-title">{item}</Text>
            <Text className="arrow">›</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
