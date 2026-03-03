// 宝宝相关类型

export interface Baby {
  id: string
  name: string
  gender: 'male' | 'female'
  birthDate: string  // "2024-01-01"
  avatar?: string
  age?: string  // 计算得出的年龄，如 "8个月12天"
  createdAt?: string
}

export interface CreateBabyParams {
  name: string
  gender: 'male' | 'female'
  birthDate: string
  avatar?: string
}

export interface UpdateBabyParams extends Partial<CreateBabyParams> {
  id: string
}
