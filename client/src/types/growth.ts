// 成长记录相关类型

export interface GrowthRecord {
  id: string
  height?: number
  weight?: number
  headCircumference?: number
  remark?: string
  createdAt: string
}

export interface GrowthData {
  gender?: 'male' | 'female'
  birthDate?: string
  records: GrowthRecord[]
}

export interface CreateGrowthParams {
  userId: string
  gender?: 'male' | 'female'
  birthDate?: string
  record: Omit<GrowthRecord, 'id' | 'createdAt'>
}
