export default {
  pages: [
    'pages/index/index',
    'pages/consult/index',
    'pages/growth/index',
    'pages/knowledge/index',
    'pages/product/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '慧育宝宝',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#94A3B8',
    selectedColor: '#FFA98F',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '首页', iconPath: 'assets/home.png', selectedIconPath: 'assets/home-active.png' },
      { pagePath: 'pages/consult/index', text: '对话', iconPath: 'assets/chat.png', selectedIconPath: 'assets/chat-active.png' },
      { pagePath: 'pages/growth/index', text: '成长', iconPath: 'assets/growth.png', selectedIconPath: 'assets/growth-active.png' },
      { pagePath: 'pages/profile/index', text: '我的', iconPath: 'assets/profile.png', selectedIconPath: 'assets/profile-active.png' }
    ]
  }
}
