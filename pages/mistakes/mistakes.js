// pages/mistakes/mistakes.js
const wordsData = require('../../data/words')

Page({
  data: {
    wrongWordList: [],
    isEmpty: false,
    showDeleteConfirm: false,
    selectedId: null
  },

  onShow() {
    this.loadMistakes()
  },

  loadMistakes() {
    const wrongIds = wx.getStorageSync('wrongWords') || []
    const masteredIds = wx.getStorageSync('masteredWords') || []
    
    const wrongWordList = wrongIds.map(id => {
      const word = wordsData.wordList.find(w => w.id === id)
      if (!word) return null
      return {
        ...word,
        levelName: wordsData.levelName[word.level] || '',
        levelColor: wordsData.levelColor[word.level] || '#888',
        isMastered: masteredIds.includes(id)
      }
    }).filter(Boolean)

    this.setData({
      wrongWordList,
      isEmpty: wrongWordList.length === 0
    })
  },

  // 播放发音
  playSound(e) {
    const word = e.currentTarget.dataset.word
    const ctx = wx.createInnerAudioContext()
    ctx.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`
    ctx.autoplay = true
  },

  // 标记为已掌握（从错题本移除）
  markMastered(e) {
    const id = e.currentTarget.dataset.id
    // 加入掌握列表
    const masteredWords = wx.getStorageSync('masteredWords') || []
    if (!masteredWords.includes(id)) {
      masteredWords.push(id)
      wx.setStorageSync('masteredWords', masteredWords)
    }
    // 从错题本移除
    const wrongWords = wx.getStorageSync('wrongWords') || []
    const filtered = wrongWords.filter(wid => wid !== id)
    wx.setStorageSync('wrongWords', filtered)

    wx.showToast({ title: '已掌握，移出错题本 ✓', icon: 'none' })
    this.loadMistakes()
  },

  // 复习全部错题（跳转到闪卡模式，仅错题）
  reviewAllMistakes() {
    const { wrongWordList } = this.data
    if (wrongWordList.length === 0) {
      wx.showToast({ title: '错题本是空的', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/flashcard/flashcard?level=mistakes' })
  },

  // 错题默写
  spellMistakes() {
    const { wrongWordList } = this.data
    if (wrongWordList.length === 0) {
      wx.showToast({ title: '错题本是空的', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/spelling/spelling?level=mistakes' })
  },

  // 清空错题本
  clearAll() {
    wx.showModal({
      title: '确认清空',
      content: '清空后不可恢复，确定要清空全部错题吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('wrongWords', [])
          this.loadMistakes()
          wx.showToast({ title: '已清空错题本', icon: 'success' })
        }
      }
    })
  }
})
