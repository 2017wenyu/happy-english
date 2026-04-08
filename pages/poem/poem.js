// pages/poem/poem.js
const poemsData = require('../../data/poems')

Page({
  data: {
    // 年级学期选择
    grades: poemsData.GRADES,
    terms: poemsData.TERMS,
    selectedGrade: 'grade1',
    selectedTerm: 'term1',
    // 统计数据
    poemCount: 0,
    masteredCount: 0,
    masteredPct: 0,
    // 玩法列表
    games: [
      { key: 'read', name: '古诗跟读', icon: '🔊', desc: '跟读闯关，纠正读音', color: '#52C41A' },
      { key: 'puzzle', name: '诗句拼图', icon: '🧩', desc: '拼接诗句，巩固记忆', color: '#FA8C16' },
      { key: 'chain', name: '古诗接龙', icon: '🔗', desc: '诗句接龙，趣味拓展', color: '#722ED1' },
      { key: 'guess', name: '情景猜诗', icon: '🎨', desc: '看图猜诗，理解含义', color: '#EB2F96' },
      { key: 'write', name: '古诗默写', icon: '✍️', desc: '默写练习，强化记忆', color: '#13C2C2' },
    ]
  },

  onLoad() {
    this._refreshStats()
  },

  onShow() {
    this._refreshStats()
  },

  // 选择年级
  selectGrade(e) {
    const grade = e.currentTarget.dataset.grade
    this.setData({ selectedGrade: grade })
    this._refreshStats()
  },

  // 选择学期
  selectTerm(e) {
    const term = e.currentTarget.dataset.term
    this.setData({ selectedTerm: term })
    this._refreshStats()
  },

  // 刷新统计数据
  _refreshStats() {
    const { selectedGrade, selectedTerm } = this.data
    const poems = poemsData.getPoems(selectedGrade, selectedTerm)
    const masteredKey = 'mastered_poem'
    const allMastered = wx.getStorageSync(masteredKey) || []
    const poemIds = poems.map(p => p.id)
    const mastered = allMastered.filter(id => poemIds.includes(id))
    
    const pCount = poems.length
    const mCount = mastered.length
    const pct = pCount > 0 ? Math.round(mCount * 100 / pCount) : 0
    
    this.setData({
      poemCount: pCount,
      masteredCount: mCount,
      masteredPct: pct
    })
    wx.setNavigationBarTitle({ title: '古诗学习' })
  },

  // 进入玩法
  goGame(e) {
    const game = e.currentTarget.dataset.game
    const { selectedGrade, selectedTerm } = this.data
    const url = `/pages/poem_${game}/poem_${game}?grade=${selectedGrade}&term=${selectedTerm}`
    wx.navigateTo({ url })
  },

  // 跳转到错题本
  goMistakes() {
    wx.navigateTo({ url: '/pages/mistakes/mistakes?subject=poem' })
  },

  // 跳转到诗人馆
  goPoets() {
    wx.navigateTo({ url: '/pages/poets/poets' })
  },

  // 跳转到经典拓展
  goClassic() {
    wx.navigateTo({ url: '/pages/classic_poems/classic_poems' })
  },

  // 跳转到词汇列表
  goWordList(e) {
    const filter = e.currentTarget.dataset.filter || 'all'
    const { selectedGrade, selectedTerm } = this.data
    wx.navigateTo({
      url: `/pages/word_list/word_list?subject=poem&filter=${filter}&grade=${selectedGrade}&term=${selectedTerm}`
    })
  },
})
