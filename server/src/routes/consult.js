const express = require('express')
const multer = require('multer')
const { consultService } = require('../services')

const router = express.Router()

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// 创建问诊
router.post('/', upload.array('images', 5), (req, res) => {
  try {
    const { description } = req.body
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : []

    const result = consultService.createConsult(description, images)
    res.json(result)
  } catch (error) {
    console.error('Consult error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

// 获取问诊列表
router.get('/', (req, res) => {
  try {
    const list = consultService.getConsultList()
    res.json(list)
  } catch (error) {
    console.error('Get consults error:', error)
    res.status(500).json({ error: '服务出错啦' })
  }
})

module.exports = router
