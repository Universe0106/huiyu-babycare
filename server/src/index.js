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

// 模拟知识库 QA 数据（等飞书知识库接入后替换）
const knowledgeBase = {
  '睡眠': '3个月大的宝宝通常每天睡14-16小时，包括白天的小睡。夜醒是正常的，因为宝宝的胃很小，需要频繁喂养。',
  '喂养': '3个月大的宝宝一般每3-4小时喂一次，每天6-8次。母乳喂养的宝宝按需喂养即可。',
  '辅食': '建议6个月开始添加辅食，最早不早于4个月。先从含铁米粉开始。',
  '疫苗': '3个月大的宝宝应该接种脊髓灰质炎疫苗第二针、乙肝疫苗第三针、百白破疫苗第一针。',
  '发烧': '3个月以下宝宝发烧应立即就医。3个月以上宝宝发烧超过38.5°C可以给退烧药，注意观察精神状态。',
  '红屁股': '保持臀部干燥，勤换尿布，每次换尿布后用温水清洗，涂抹含氧化锌的护臀膏。',
  '湿疹': '湿疹要注意保湿，使用温和的洗护产品，避免过热。如果严重需要就医。',
  '腹泻': '腹泻要注意补充水分，防止脱水。如果伴随发热、呕吐或大便带血要及时就医。',
  '便秘': '便秘可以给宝宝多喝水，适当按摩肚子。如果是添加辅食后可以吃些蔬菜泥。',
  '感冒': '感冒多休息，补充水分，鼻子不通可以用生理盐水滴鼻。症状严重或持续时间过长需就医。'
}

// 对话 API
app.post('/api/chat', (req, res) => {
  const { message, history = [] } = req.body
  
  // 简单的关键词匹配回答（等知识库接入后替换为向量搜索）
  let answer = '抱歉，我不太明白这个问题。你可以试着问一些关于宝宝喂养、睡眠、辅食、疫苗等方面的问题～'
  
  const lowerMessage = message.toLowerCase()
  
  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(keyword)) {
      answer = response
      break
    }
  }
  
  // 返回对话结果
  res.json({
    answer,
    suggestions: ['宝宝晚上睡不好怎么办？', '什么时候开始添加辅食？', '宝宝发烧了怎么处理？']
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
