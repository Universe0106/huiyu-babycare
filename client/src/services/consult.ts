import { api } from './api'
import type { ConsultRecord, ConsultRequest } from '../types'

export const consultApi = {
  /**
   * 创建问诊
   */
  createConsult(data: ConsultRequest): Promise<ConsultRecord> {
    return api.post<ConsultRecord>('/api/consult', data)
  },

  /**
   * 获取问诊记录列表
   */
  getConsultList(): Promise<ConsultRecord[]> {
    return api.get<ConsultRecord[]>('/api/consult')
  }
}
