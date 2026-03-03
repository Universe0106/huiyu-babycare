// 问诊相关类型

export interface ConsultRecord {
  id: string
  images: string[]
  description: string
  diagnosis: string
  severity: '轻度' | '中度' | '重度'
  advice: string[]
  products: string[]
  warning: string
  createdAt: string
}

export interface ConsultRequest {
  description: string
  images?: string[]
}
