const express = require('express')
const { growthService } = require('../services')

const router = express.Router()

// 创建成长记录
router.post('/', (req, res) => {
  try {
    const { userId, gender, birthDate, record } = req.body

    if (!userId || !record) {
      return res.status(400).json({ error: '参数不完整' })
    }

    const result = growthService.createRecord(userId, { gender, birthDate, record })
    res.json(result)
  } catch (error) {
    console.error('Create growth record error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 获取成长记录
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const result = growthService.getUserRecords(userId)
    res.json(result)
  } catch (error) {
    console.error('Get growth records error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 删除成长记录
router.delete('/:userId/:recordId', (req, res) => {
  try {
    const { userId, recordId } = req.params
    const success = growthService.deleteRecord(userId, recordId)
    res.json({ success })
  } catch (error) {
    console.error('Delete growth record error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

module.exports = router
