const express = require('express')
const { babyService } = require('../services')

const router = express.Router()

// 默认用户ID（1.0版本简化处理）
const DEFAULT_USER_ID = 'default_user'

// 获取宝宝列表
router.get('/', (req, res) => {
  try {
    const babyList = babyService.getBabyList(DEFAULT_USER_ID)
    res.json(babyList)
  } catch (error) {
    console.error('Get babies error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 创建宝宝
router.post('/', (req, res) => {
  try {
    const { name, gender, birthDate, avatar } = req.body

    if (!name || !gender || !birthDate) {
      return res.status(400).json({ error: '参数不完整' })
    }

    const baby = babyService.createBaby(DEFAULT_USER_ID, { name, gender, birthDate, avatar })
    res.json(baby)
  } catch (error) {
    console.error('Create baby error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 获取宝宝详情
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const baby = babyService.getBabyById(id)
    
    if (!baby) {
      return res.status(404).json({ error: '宝宝不存在' })
    }
    
    res.json(baby)
  } catch (error) {
    console.error('Get baby error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 更新宝宝信息
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { name, gender, birthDate, avatar } = req.body
    
    const baby = babyService.updateBaby(id, { name, gender, birthDate, avatar })
    
    if (!baby) {
      return res.status(404).json({ error: '宝宝不存在' })
    }
    
    res.json(baby)
  } catch (error) {
    console.error('Update baby error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 删除宝宝
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const success = babyService.deleteBaby(id)
    
    if (!success) {
      return res.status(404).json({ error: '宝宝不存在' })
    }
    
    res.json({ success: true })
  } catch (error) {
    console.error('Delete baby error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

module.exports = router
