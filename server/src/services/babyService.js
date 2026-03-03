const { v4: uuidv4 } = require('uuid')

// 模拟数据存储
const babies = {}
const babyGrowthRecords = {}

// 计算宝宝年龄
function calculateAge(birthDate) {
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  const days = Math.floor((now - birth) / (1000 * 60 * 60 * 24)) % 30
  
  if (months < 1) {
    return `${days}天`
  } else if (months < 24) {
    return `${months}个月${days > 0 ? days + '天' : ''}`
  } else {
    const years = Math.floor(months / 12)
    const remainMonths = months % 12
    return `${years}岁${remainMonths > 0 ? remainMonths + '个月' : ''}`
  }
}

class BabyService {
  /**
   * 创建宝宝
   */
  createBaby(userId, { name, gender, birthDate, avatar }) {
    const id = uuidv4()
    const baby = {
      id,
      userId,
      name,
      gender,
      birthDate,
      avatar,
      age: calculateAge(birthDate),
      createdAt: new Date().toISOString()
    }
    
    babies[id] = baby
    babyGrowthRecords[id] = []
    
    return baby
  }

  /**
   * 获取用户的宝宝列表
   */
  getBabyList(userId) {
    return Object.values(babies).filter(b => b.userId === userId)
  }

  /**
   * 获取宝宝详情
   */
  getBabyById(babyId) {
    return babies[babyId]
  }

  /**
   * 更新宝宝信息
   */
  updateBaby(babyId, updates) {
    if (!babies[babyId]) return null
    
    const baby = babies[babyId]
    Object.assign(baby, updates)
    
    if (updates.birthDate) {
      baby.age = calculateAge(updates.birthDate)
    }
    
    return baby
  }

  /**
   * 删除宝宝
   */
  deleteBaby(babyId) {
    if (!babies[babyId]) return false
    delete babies[babyId]
    delete babyGrowthRecords[babyId]
    return true
  }
}

module.exports = new BabyService()
