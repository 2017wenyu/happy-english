// pages/index/index.js
const wordsData = require('../../data/words')

Page({
  data: {
    levels: [
      { key: 'level1', name: '一级', desc: '低年级', emoji: '🌱', color: '#52C41A', total: 0, mastered: 0 },
      { key: 'level2', name: '二级', desc: '一年级', emoji: '🌿', color: '#1890FF', total: 0, mastered: 0 },
      { key: 'level3', name: '三级', desc: '二年级', emoji: '🌳', color: '#722ED1', total: 0, mastered: 0 },
      { key: 'level4', name: '四级', desc: '三年级', emoji: '⭐', color: '#FA8C16', total: 0, mastered: 0 },
      { key: 'level5', name: '五级', desc: '四~六年级', emoji: '🏆', color: '#F5222D', total: 0, mastered: 0 }
    ],
    selectedLevel: null,
    totalMastered: 0,
    totalMasteredPct: 0,
    totalWords: 220,
    todayCount: 0
  },

  onShow() {
    this.loadStats()
  },

  loadStats() {
    const masteredWords = wx.getStorageSync('masteredWords') || []
    const studyRecords = wx.getStorageSync('studyRecords') || []
    const today = new Date().toLocaleDateString('zh-CN')
    const todayRecord = studyRecords.find(r => r.date === today)

    // 统计每个等级的词数和掌握数
    const levels = this.data.levels.map(lv => {
      const levelWords = wordsData.wordList.filter(w => w.level === lv.key)
      const masteredCount = levelWords.filter(w => masteredWords.includes(w.id)).length
      return {
        ...lv,
        total: levelWords.length,
        mastered: masteredCount,
        progress: levelWords.length > 0 ? Math.round(masteredCount / levelWords.length * 100) : 0
      }
    })

    this.setData({
      levels,
      totalMastered: masteredWords.length,
      totalMasteredPct: Math.round(masteredWords.length / 220 * 100),
      todayCount: todayRecord ? todayRecord.count : 0
    })
  },

  selectLevel(e) {
    const levelKey = e.currentTarget.dataset.level
    this.setData({ selectedLevel: levelKey })
  },

  goFlashcard() {
    if (!this.data.selectedLevel) {
      wx.showToast({ title: '请先选择级别', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: `/pages/flashcard/flashcard?level=${this.data.selectedLevel}`
    })
  },

  goSpelling() {
    if (!this.data.selectedLevel) {
      wx.showToast({ title: '请先选择级别', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: `/pages/spelling/spelling?level=${this.data.selectedLevel}`
    })
  },

  goAllFlashcard() {
    wx.navigateTo({ url: '/pages/flashcard/flashcard?level=all' })
  }
})
