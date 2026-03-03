const { v4: uuidv4 } = require('uuid')
const { SEVERITY } = require('../constants')

// 模拟数据存储
const consultations = []

class ConsultService {
  /**
   * 创建问诊记录
   */
  createConsult(description, images) {
    const result = {
      id: uuidv4(),
      images,
      description,
      diagnosis: '根据图片和描述分析，可能是尿布疹（红屁股）',
      severity: SEVERITY.MILD,
      advice: [
        '保持臀部清洁干燥，及时更换尿布',
        '每次换尿布后用温水清洗臀部',
        '使用含氧化锌的护臀膏',
        '每天安排透气时间'
      ],
      products: [
        '拜耳护臀膏',
        '维蕾德金盏花护臀膏'
      ],
      warning: '仅供参考，如有加重请就医',
      createdAt: new Date().toISOString()
    }

    consultations.push(result)
    return result
  }

  /**
   * 获取问诊记录列表
   */
  getConsultList() {
    return consultations
  }

  /**
   * 获取单条问诊记录
   */
  getConsultById(id) {
    return consultations.find(c => c.id === id)
  }
}

module.exports = new ConsultService()
