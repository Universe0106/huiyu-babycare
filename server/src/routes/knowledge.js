const express = require('express')
const { knowledgeService } = require('../services')

const router = express.Router()

// 获取分类下的知识列表
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params
    const list = knowledgeService.getCategoryList(category)
    res.json({
      category,
      list,
      message: list.length > 0 ? '' : '知识库查询功能开发中'
    })
  } catch (error) {
    console.error('Get knowledge error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

module.exports = router
