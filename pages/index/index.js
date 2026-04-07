// pages/index/index.js
Page({
  data: {
    subjects: [
      {
        key: 'english',
        name: '英语高频词',
        desc: '220个必学英语单词',
        emoji: '🔤',
        color: '#4876FF',
        gradient: 'linear-gradient(135deg, #4876FF, #722ED1)',
        tag: '闪卡 · 默写 · 测评',
        available: true
      },
      {
        key: 'chinese',
        name: '汉字生字词',
        desc: '小学语文必学生字',
        emoji: '📖',
        color: '#F5222D',
        gradient: 'linear-gradient(135deg, #F5222D, #FF7A45)',
        tag: '选字 · 听写 · 组词',
        available: true
      },
      {
        key: 'poem',
        name: '古诗学习',
        desc: '小学必背古诗词',
        emoji: '📜',
        color: '#722ED1',
        gradient: 'linear-gradient(135deg, #722ED1, #B37FEB)',
        tag: '朗读 · 背诵 · 理解',
        available: false
      },
      {
        key: 'idiom',
        name: '成语学习',
        desc: '常用成语释义与用法',
        emoji: '🏮',
        color: '#FA8C16',
        gradient: 'linear-gradient(135deg, #FA8C16, #FFC53D)',
        tag: '释义 · 故事 · 练习',
        available: false
      }
    ]
  },

  goSubject(e) {
    const key = e.currentTarget.dataset.key
    const available = e.currentTarget.dataset.available

    if (available === true || available === 'true') {
      const routes = {
        english: '/pages/english/english',
        chinese: '/pages/chinese/chinese',
      }
      const url = routes[key]
      if (url) {
        wx.navigateTo({ url })
      } else {
        wx.showToast({ title: '功能开发中，敬请期待 🚀', icon: 'none', duration: 2000 })
      }
    } else {
      wx.showToast({ title: '功能开发中，敬请期待 🚀', icon: 'none', duration: 2000 })
    }
  }
})
