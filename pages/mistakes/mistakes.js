// pages/mistakes/mistakes.js
const wordsData = require('../../data/words')
const voice = require('../../utils/voice')

// 各学科配置
const SUBJECT_CONFIG = {
  english: {
    title: '英语错题本',
    icon: '📝',
    color: '#4876FF',
    gradient: 'linear-gradient(135deg, #4876FF, #722ED1)',
    storageKey: 'wrongWords',
    flashcardLevel: 'mistakes',
    spellingLevel: 'mistakes',
    hasVoice: true
  },
  chinese: {
    title: '汉字错题本',
    icon: '📖',
    color: '#FF4D4F',
    gradient: 'linear-gradient(135deg, #FF7875, #FF4D4F)',
    storageKey: 'wrongWords_chinese',
    flashcardLevel: null,
    spellingLevel: null,
    hasVoice: false
  },
  poem: {
    title: '古诗错题本',
    icon: '📜',
    color: '#722ED1',
    gradient: 'linear-gradient(135deg, #9254DE, #722ED1)',
    storageKey: 'wrongWords_poem',
    flashcardLevel: null,
    spellingLevel: null,
    hasVoice: false
  },
  idiom: {
    title: '成语错题本',
    icon: '🏮',
    color: '#FA8C16',
    gradient: 'linear-gradient(135deg, #FA8C16, #FFA940)',
    storageKey: 'wrongWords_idiom',
    flashcardLevel: null,
    spellingLevel: null,
    hasVoice: false
  }
}

Page({
  data: {
    subject: 'english',
    subjectConfig: SUBJECT_CONFIG.english,
    wrongWordList: [],
    isEmpty: false
  },

  onLoad(options) {
    const subject = options.subject || 'english'
    const subjectConfig = SUBJECT_CONFIG[subject] || SUBJECT_CONFIG.english
    this.setData({ subject, subjectConfig })
    // 动态设置导航栏标题
    wx.setNavigationBarTitle({ title: subjectConfig.title })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: subject === 'english' ? '#4876FF' : subjectConfig.color
    })
  },

  onShow() {
    this.loadMistakes()
  },

  loadMistakes() {
    const { subject, subjectConfig } = this.data
    const storageKey = subjectConfig.storageKey
    const wrongIds = wx.getStorageSync(storageKey) || []

    let wrongWordList = []

    if (subject === 'english') {
      // 英语：从 wordsData 匹配单词详情
      const masteredIds = wx.getStorageSync('masteredWords') || []
      wrongWordList = wrongIds.map(id => {
        const word = wordsData.wordList.find(w => w.id === id)
        if (!word) return null
        return {
          ...word,
          levelName: wordsData.levelName[word.level] || '',
          levelColor: wordsData.levelColor[word.level] || '#888',
          isMastered: masteredIds.includes(id)
        }
      }).filter(Boolean)
    } else {
      // 汉字/古诗/成语等：storageKey 存的是完整对象数组
      const rawList = wx.getStorageSync(storageKey) || []
      wrongWordList = Array.isArray(rawList) ? rawList.filter(Boolean) : []
    }

    this.setData({
      wrongWordList,
      isEmpty: wrongWordList.length === 0
    })
  },

  // 播放发音（仅英语有）
  playSound(e) {
    const word = e.currentTarget.dataset.word
    voice.playWordVoice(word)
  },

  // 标记为已掌握（从错题本移除）
  markMastered(e) {
    const { subject, subjectConfig } = this.data
    const id = e.currentTarget.dataset.id

    if (subject === 'english') {
      const masteredWords = wx.getStorageSync('masteredWords') || []
      if (!masteredWords.includes(id)) {
        masteredWords.push(id)
        wx.setStorageSync('masteredWords', masteredWords)
      }
    }

    const wrongWords = wx.getStorageSync(subjectConfig.storageKey) || []
    let filtered
    if (subject === 'english') {
      // 英语：wrongWords 是 id 数组
      filtered = wrongWords.filter(wid => wid !== id)
    } else {
      // 汉字等：wrongWords 是对象数组
      filtered = wrongWords.filter(item => item && item.id !== id)
    }
    wx.setStorageSync(subjectConfig.storageKey, filtered)

    wx.showToast({ title: '已掌握，移出错题本 ✓', icon: 'none' })
    this.loadMistakes()
  },

  // 复习全部错题（闪卡）
  reviewAllMistakes() {
    const { wrongWordList, subjectConfig } = this.data
    if (wrongWordList.length === 0) {
      wx.showToast({ title: '错题本是空的', icon: 'none' })
      return
    }
    if (!subjectConfig.flashcardLevel) {
      wx.showToast({ title: '该功能即将上线', icon: 'none' })
      return
    }
    wx.navigateTo({ url: `/pages/flashcard/flashcard?level=${subjectConfig.flashcardLevel}` })
  },

  // 错题默写
  spellMistakes() {
    const { wrongWordList, subjectConfig } = this.data
    if (wrongWordList.length === 0) {
      wx.showToast({ title: '错题本是空的', icon: 'none' })
      return
    }
    if (!subjectConfig.spellingLevel) {
      wx.showToast({ title: '该功能即将上线', icon: 'none' })
      return
    }
    wx.navigateTo({ url: `/pages/spelling/spelling?level=${subjectConfig.spellingLevel}` })
  },

  // 清空错题本
  clearAll() {
    wx.showModal({
      title: '确认清空',
      content: '清空后不可恢复，确定要清空全部错题吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync(this.data.subjectConfig.storageKey, [])
          this.loadMistakes()
          wx.showToast({ title: '已清空错题本', icon: 'success' })
        }
      }
    })
  },

  onUnload() {
    voice.cleanup()
  },

  onHide() {
    voice.cleanup()
  }
})
