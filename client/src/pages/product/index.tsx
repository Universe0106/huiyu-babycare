import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface Product {
  id: number
  name: string
  category: string
  rating: number
  price: number
  desc: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: '拜耳护臀膏', category: '护肤', rating: 4.8, price: 89, desc: '含泛醇，修复皮肤' },
  { id: 2, name: '维蕾德金盏花护臀膏', category: '护肤', rating: 4.7, price: 128, desc: '天然成分，舒缓抗炎' },
  { id: 3, name: 'Sudocrem 护臀膏', category: '护肤', rating: 4.6, price: 99, desc: '含氧化锌，防水隔离' },
  { id: 4, name: '丝塔芙大白罐', category: '护肤', rating: 4.9, price: 168, desc: '保湿效果好' },
]

export default function Product() {
  return (
    <View className="product">
      <View className="header">
        <Text className="title">好物推荐</Text>
        <Text className="desc">真实使用体验分享</Text>
      </View>

      <View className="product-list">
        {PRODUCTS.map(item => (
          <View key={item.id} className="product-card">
            <View className="product-info">
              <Text className="product-name">{item.name}</Text>
              <Text className="product-desc">{item.desc}</Text>
              <View className="product-meta">
                <Text className="category">{item.category}</Text>
                <Text className="rating">⭐ {item.rating}</Text>
              </View>
            </View>
            <View className="product-price">
              <Text className="price">¥{item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="notice">
        <Text className="notice-text">
          💡 推荐仅供参考，请根据宝宝实际情况选择
        </Text>
      </View>
    </View>
  )
}
