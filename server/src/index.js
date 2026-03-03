const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const app = express()
const PORT = 3000

// 中间件
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// 模拟数据存储
const consultations = []
const growthRecords = {}

// AI 问诊 API（这里只是模拟，实际需要接入图像理解能力）
app.post('/api/consult', upload.array('images', 5), (req, res) => {
  const { description } = req.body
  const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : []
  
  // 这里应该调用 AI 图像理解能力来分析图片
  // 实际开发时，会把图片和描述发送给 AI，然后返回诊断结果
  
  // 模拟返回结果
  const result = {
    id: uuidv4(),
    images,
    description,
    diagnosis: '根据图片和描述分析，可能是尿布疹（红屁股）',
    severity: '轻度',
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
  res.json(result)
})

// 获取问诊记录
app.get('/api/consult', (req, res) => {
  res.json(consultations)
})

// 发育记录 API
app.post('/api/growth', (req, res) => {
  const { userId, gender, birthDate, record } = req.body
  
  if (!growthRecords[userId]) {
    growthRecords[userId] = { gender, birthDate, records: [] }
  }
  
  growthRecords[userId].records.push({
    ...record,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  })
  
  res.json({ success: true })
})

app.get('/api/growth/:userId', (req, res) => {
  const { userId } = req.params
  res.json(growthRecords[userId] || { records: [] })
})

// 健康知识查询 API
app.get('/api/knowledge/:category', (req, res) => {
  const { category } = req.params
  // 这里应该从飞书知识库查询
  // 实际开发时，可以调用飞书 API 获取知识库内容
  res.json({
    category,
    message: '知识库查询功能开发中'
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
