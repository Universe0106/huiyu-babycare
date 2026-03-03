const { v4: uuidv4 } = require('uuid')

// 模拟数据存储
const growthRecords = {}

class GrowthService {
  /**
   * 创建成长记录
   */
  createRecord(userId, { gender, birthDate, record }) {
    if (!growthRecords[userId]) {
      growthRecords[userId] = { gender, birthDate, records: [] }
    }

    const newRecord = {
      ...record,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    }

    growthRecords[userId].records.push(newRecord)
    return newRecord
  }

  /**
   * 获取用户成长记录
   */
  getUserRecords(userId) {
    return growthRecords[userId] || { records: [] }
  }

  /**
   * 删除成长记录
   */
  deleteRecord(userId, recordId) {
    if (!growthRecords[userId]) return false

    const index = growthRecords[userId].records.findIndex(r => r.id === recordId)
    if (index === -1) return false

    growthRecords[userId].records.splice(index, 1)
    return true
  }
}

module.exports = new GrowthService()
