// pages/poet_detail/poet_detail.js
const poetsData = require('../../data/poets')
const poemsData = require('../../data/poems')

Page({
  data: {
    poet: null,
    works: [],          // 代表作列表（含诗词内容）
    activeTab: 'bio',   // bio | works
    masteredIds: [],
  },

  onLoad(options) {
    const id = options.id
    const poet = poetsData.getPoetById(id)
    if (!poet) {
      wx.showToast({ title: '诗人信息不存在', icon: 'none' })
      wx.navigateBack()
      return
    }

    wx.setNavigationBarTitle({ title: poet.name })

    // 从所有诗词中找出该诗人的所有作品
    const allPoems = poemsData.getAllPoems()
    const masteredIds = wx.getStorageSync('mastered_poem') || []

    // 筛选该作者的所有诗词，按 representative 顺序优先排列
    const poetWorks = allPoems.filter(p => p.author === poet.name)
    
    // 按 representative 顺序排序（如果有）
    const representativeSet = new Set(poet.representative)
    const sortedWorks = poetWorks.sort((a, b) => {
      const aInRep = representativeSet.has(a.title)
      const bInRep = representativeSet.has(b.title)
      if (aInRep && !bInRep) return -1
      if (!aInRep && bInRep) return 1
      return 0
    })

    const works = sortedWorks.map(poem => ({
      ...poem,
      preview: Array.isArray(poem.content) ? poem.content.slice(0, 2).join(' ') : '',
      isMastered: masteredIds.includes(poem.id),
    }))

    this.setData({ poet, works, masteredIds })
  },

  onShow() {
    // 刷新掌握状态
    const masteredIds = wx.getStorageSync('mastered_poem') || []
    const works = (this.data.works || []).map(w => ({
      ...w,
      isMastered: masteredIds.includes(w.id),
    }))
    this.setData({ works, masteredIds })
  },

  // 切换 tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 点击作品 → 跳转到该诗人全部诗词列表
  goWorksList() {
    const { poet } = this.data
    wx.navigateTo({
      url: `/pages/word_list/word_list?subject=poem&filter=all&author=${encodeURIComponent(poet.name)}`
    })
  },

  // 点击具体某首诗 → 跳转到古诗跟读详情页
  goPoetPoems(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/poem_read/poem_read?poemId=${id}`
    })
  },

  // 标记/取消掌握
  toggleMastered(e) {
    const id = e.currentTarget.dataset.id
    const isMastered = e.currentTarget.dataset.mastered === true || e.currentTarget.dataset.mastered === 'true'
    const key = 'mastered_poem'
    let arr = wx.getStorageSync(key) || []
    if (isMastered) {
      arr = arr.filter(x => x !== id)
    } else {
      if (!arr.includes(id)) arr.push(id)
    }
    wx.setStorageSync(key, arr)

    const works = this.data.works.map(w =>
      w.id === id ? { ...w, isMastered: !isMastered } : w
    )
    wx.showToast({ title: isMastered ? '已取消掌握' : '标记为已掌握 ✓', icon: 'none', duration: 800 })
    this.setData({ works })
  },

  goBack() {
    wx.navigateBack()
  },
})
