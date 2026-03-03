// 服务器配置
module.exports = {
  port: process.env.PORT || 3000,
  cors: {
    origin: '*',
    credentials: true
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  }
}
