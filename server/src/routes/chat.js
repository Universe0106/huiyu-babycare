const express = require('express')
const { chatService } = require('../services')

const router = express.Router()

// 对话接口
router.post('/', (req, res) => {
  try {
    const { message, history = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: '消息不能为空' })
    }

    const result = chatService.handleChat(message, history)
    res.json(result)
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: '服务出错啦，稍后再试～' })
  }
})

module.exports = router
