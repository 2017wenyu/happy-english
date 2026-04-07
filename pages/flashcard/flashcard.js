// pages/flashcard/flashcard.js
const wordsData = require('../../data/words')
const voice = require('../../utils/voice')
const app = getApp()

Page({
  data: {
    words: [],
    currentIndex: 0,
    currentWord: null,
    masteredWords: [],
    showMeaning: false,
    level: '',
    levelName: '',
    isFinished: false,
    totalCount: 0,
    masteredCount: 0,
    // 滑动相关
    startX: 0,
    startY: 0,
    cardStyle: '',
    transitioning: false
  },

  onLoad(options) {
    const level = options.level || 'level1'
    this.setData({ level })
    this.loadWords(level)
  },

  onUnload() {
    voice.cleanup()
  },

  onHide() {
    voice.cleanup()
  },

  loadWords(level) {
    let words
    if (level === 'all') {
      words = [...wordsData.wordList]
      words.sort(() => Math.random() - 0.5)
    } else if (level === 'mistakes') {
      // 只加载错题本单词
      const wrongIds = wx.getStorageSync('wrongWords') || []
      words = wordsData.wordList.filter(w => wrongIds.includes(w.id))
      words.sort(() => Math.random() - 0.5)
    } else {
      words = wordsData.wordList.filter(w => w.level === level)
    }

    const masteredWords = wx.getStorageSync('masteredWords') || []
    const levelName = level === 'all' ? '全部词汇' : level === 'mistakes' ? '错题复习' : wordsData.levelName[level] || ''
    const masteredCount = words.filter(w => masteredWords.includes(w.id)).length

    this.setData({
      words,
      totalCount: words.length,
      masteredWords,
      masteredCount,
      levelName,
      currentIndex: 0,
      showMeaning: false,
      isFinished: false
    })
    
    if (words.length > 0) {
      this.updateCurrentWord(0)
    }
  },

  updateCurrentWord(index) {
    const { words, masteredWords } = this.data
    if (index >= words.length) {
      this.setData({ isFinished: true })
      return
    }
    const word = words[index]
    this.setData({
      currentWord: {
        ...word,
        isMastered: masteredWords.includes(word.id)
      },
      currentIndex: index,
      showMeaning: false
    })

    // 卡片渲染完成后再播放（延迟 500ms，确保分包 mp3 文件就绪）
    setTimeout(() => voice.playWordVoice(word.word), 500)
  },

  // 点击卡片翻转显示释义
  toggleMeaning() {
    this.setData({ showMeaning: !this.data.showMeaning })
  },

  // 播放发音
  playSound() {
    if (!this.data.currentWord) return
    voice.playWordVoice(this.data.currentWord.word)
  },

  // 标记已掌握
  markMastered() {
    const { currentWord, masteredWords, masteredCount } = this.data
    if (!currentWord) return
    
    let newMastered = [...masteredWords]
    let newCount = masteredCount
    
    if (!newMastered.includes(currentWord.id)) {
      newMastered.push(currentWord.id)
      newCount++
      wx.setStorageSync('masteredWords', newMastered)
      app.addStudyCount(1)
      
      // 从错题本移除
      const wrongWords = wx.getStorageSync('wrongWords') || []
      const newWrong = wrongWords.filter(id => id !== currentWord.id)
      wx.setStorageSync('wrongWords', newWrong)
      
      wx.showToast({ title: '太棒了！已掌握 ✓', icon: 'none', duration: 800 })
    }
    
    this.setData({
      masteredWords: newMastered,
      masteredCount: newCount
    })
    
    // 自动下一张
    setTimeout(() => this.nextCard(), 400)
  },

  // 标记未掌握（加入错题本）
  markUnmastered() {
    const { currentWord, masteredWords } = this.data
    if (!currentWord) return
    
    // 从已掌握中移除
    const newMastered = masteredWords.filter(id => id !== currentWord.id)
    wx.setStorageSync('masteredWords', newMastered)
    
    // 加入错题本
    const wrongWords = wx.getStorageSync('wrongWords') || []
    if (!wrongWords.includes(currentWord.id)) {
      wrongWords.push(currentWord.id)
      wx.setStorageSync('wrongWords', wrongWords)
    }
    
    wx.showToast({ title: '加入错题本 📝', icon: 'none', duration: 800 })
    
    // 更新已掌握数
    const newMasteredCount = this.data.words.filter(w => newMastered.includes(w.id)).length
    this.setData({ masteredWords: newMastered, masteredCount: newMasteredCount })
    
    setTimeout(() => this.nextCard(), 400)
  },

  // 下一张
  nextCard() {
    const { currentIndex, words } = this.data
    if (currentIndex < words.length - 1) {
      this.updateCurrentWord(currentIndex + 1)
    } else {
      this.setData({ isFinished: true })
    }
  },

  // 上一张
  prevCard() {
    const { currentIndex } = this.data
    if (currentIndex > 0) {
      this.updateCurrentWord(currentIndex - 1)
    }
  },

  // 触摸开始
  touchStart(e) {
    this.setData({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },

  // 触摸结束（滑动换卡）
  touchEnd(e) {
    const { startX, startY, transitioning } = this.data
    if (transitioning) return
    
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const diffX = endX - startX
    const diffY = endY - startY
    
    // 水平滑动且大于50px
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // 左滑：下一张
        this.nextCard()
      } else {
        // 右滑：上一张
        this.prevCard()
      }
    }
  },

  // 重新开始
  restart() {
    this.loadWords(this.data.level)
  },

  goBack() {
    wx.navigateBack()
  }
})
