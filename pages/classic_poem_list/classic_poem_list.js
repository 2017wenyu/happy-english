// pages/classic_poem_list/classic_poem_list.js
// 经典拓展 - 诗人诗词列表页

const classicData = require('../../data/classic_poems')

Page({
  data: {
    poet: null,
    poems: [],
    masteredIds: [],
  },

  onLoad(options) {
    const { poetId, poetName } = options
    
    let poet = null
    if (poetId) {
      poet = classicData.getClassicPoetById(poetId)
    }
    
    // 如果没有找到诗人信息，创建一个简单的对象
    if (!poet && poetName) {
      poet = {
        id: '',
        name: decodeURIComponent(poetName),
        dynasty: '',
        title: '',
        avatar: '📜',
        color: '#722ED1',
        gradient: 'linear-gradient(135deg, #722ED1, #531DAB)',
      }
    }

    if (poet) {
      wx.setNavigationBarTitle({ title: `${poet.name}的诗词` })
      
      // 获取该诗人的所有诗词
      const poems = classicData.getClassicPoemsByAuthor(poet.name).map(p => ({
        ...p,
        preview: Array.isArray(p.content) ? p.content.slice(0, 2).join(' ') : '',
      }))
      
      // 获取掌握状态（使用独立的存储key）
      const masteredIds = wx.getStorageSync('mastered_classic_poem') || []
      
      this.setData({ 
        poet, 
        poems: poems.map(p => ({
          ...p,
          isMastered: masteredIds.includes(p.id),
        })),
        masteredIds 
      })
    }
  },

  onShow() {
    // 刷新掌握状态
    const masteredIds = wx.getStorageSync('mastered_classic_poem') || []
    const poems = (this.data.poems || []).map(p => ({
      ...p,
      isMastered: masteredIds.includes(p.id),
    }))
    this.setData({ poems, masteredIds })
  },

  // 跳转到诗词详情/学习页面
  goPoemDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/poem_read/poem_read?poemId=${id}&source=classic`
    })
  },

  // 标记/取消掌握
  toggleMastered(e) {
    const id = e.currentTarget.dataset.id
    const isMastered = e.currentTarget.dataset.mastered === true || e.currentTarget.dataset.mastered === 'true'
    const key = 'mastered_classic_poem'
    let arr = wx.getStorageSync(key) || []
    
    if (isMastered) {
      arr = arr.filter(x => x !== id)
    } else {
      if (!arr.includes(id)) arr.push(id)
    }
    
    wx.setStorageSync(key, arr)

    const poems = this.data.poems.map(p =>
      p.id === id ? { ...p, isMastered: !isMastered } : p
    )
    
    wx.showToast({ title: isMastered ? '已取消掌握' : '标记为已掌握 ✓', icon: 'none', duration: 800 })
    this.setData({ poems, masteredIds: arr })
  },

  goBack() {
    wx.navigateBack()
  },
})
