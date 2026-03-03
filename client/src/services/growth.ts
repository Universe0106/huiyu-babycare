import { api } from './api'
import type { GrowthData, CreateGrowthParams, GrowthRecord } from '../types'

export const growthApi = {
  /**
   * 创建成长记录
   */
  createRecord(params: CreateGrowthParams): Promise<GrowthRecord> {
    const { userId, ...data } = params
    return api.post<GrowthRecord>(`/api/growth`, {
      userId,
      ...data
    })
  },

  /**
   * 获取成长记录
   */
  getRecords(userId: string): Promise<GrowthData> {
    return api.get<GrowthData>(`/api/growth/${userId}`)
  },

  /**
   * 删除成长记录
   */
  deleteRecord(userId: string, recordId: string): Promise<{ success: boolean }> {
    return api.delete<{ success: boolean }>(`/api/growth/${userId}/${recordId}`)
  }
}
