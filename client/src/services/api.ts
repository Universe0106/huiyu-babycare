import Taro from '@tarojs/taro'
import { ChatRequest, ChatResponse } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * 发送聊天消息
 */
export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  const response = await Taro.request({
    url: `${BASE_URL}/api/chat`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data
  })
  
  return response.data
}

/**
 * 获取问诊列表
 */
export async function getConsultList() {
  const response = await Taro.request({
    url: `${BASE_URL}/api/consult`,
    method: 'GET'
  })
  return response.data
}

/**
 * 创建问诊
 */
export async function createConsult(description: string, images: string[]) {
  // TODO: 实现文件上传
  const response = await Taro.request({
    url: `${BASE_URL}/api/consult`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: { description, images }
  })
  return response.data
}

/**
 * 获取成长记录
 */
export async function getGrowthRecords(userId: string) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/growth/${userId}`,
    method: 'GET'
  })
  return response.data
}

/**
 * 添加成长记录
 */
export async function addGrowthRecord(data: {
  userId: string
  gender?: string
  birthDate?: string
  record: any
}) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/growth`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data
  })
  return response.data
}

/**
 * 获取知识库列表
 */
export async function getKnowledgeList(category: string) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/knowledge/${category}`,
    method: 'GET'
  })
  return response.data
}

// ==================== 宝宝管理 API ====================

/**
 * 获取宝宝列表
 */
export async function getBabyList() {
  const response = await Taro.request({
    url: `${BASE_URL}/api/baby`,
    method: 'GET'
  })
  return response.data
}

/**
 * 获取宝宝详情
 */
export async function getBabyDetail(babyId: string) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/baby/${babyId}`,
    method: 'GET'
  })
  return response.data
}

/**
 * 添加宝宝
 */
export async function addBaby(data: {
  name: string
  gender: 'male' | 'female'
  birthDate: string
  avatar?: string
}) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/baby`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data
  })
  return response.data
}

/**
 * 更新宝宝信息
 */
export async function updateBaby(babyId: string, data: {
  name?: string
  gender?: 'male' | 'female'
  birthDate?: string
  avatar?: string
}) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/baby/${babyId}`,
    method: 'PUT',
    header: {
      'Content-Type': 'application/json'
    },
    data
  })
  return response.data
}

/**
 * 删除宝宝
 */
export async function deleteBaby(babyId: string) {
  const response = await Taro.request({
    url: `${BASE_URL}/api/baby/${babyId}`,
    method: 'DELETE'
  })
  return response.data
}
