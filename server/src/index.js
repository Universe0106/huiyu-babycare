const express = require('express')
const cors = require('cors')
const path = require('path')
const config = require('./config')
const routes = require('./routes')

const app = express()

// 中间件
app.use(cors(config.cors))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// 路由
app.use('/api/chat', routes.chatRouter)
app.use('/api/consult', routes.consultRouter)
app.use('/api/growth', routes.growthRouter)
app.use('/api/knowledge', routes.knowledgeRouter)

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 启动服务器
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})
