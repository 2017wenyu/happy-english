// pages/spelling/spelling.js
const wordsData = require('../../data/words')
const voice = require('../../utils/voice')

Page({
  data: {
    words: [],
    currentIndex: 0,
    currentWord: null,
    userInput: '',
    inputLetters: [],    // 字母数组，用于逐字显示
    result: null,        // null | 'correct' | 'wrong'
    showHint: false,
    showPhonetic: false,
    hint: '',
    level: '',
    levelName: '',
    isFinished: false,
    totalCount: 0,
    correctCount: 0,
    wrongCount: 0,
    combo: 0,            // 连对数
    answeredSet: new Set() // 本轮已回答的id
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
      words = [...wordsData.wordList].sort(() => Math.random() - 0.5)
    } else if (level === 'mistakes') {
      const wrongIds = wx.getStorageSync('wrongWords') || []
      words = wordsData.wordList.filter(w => wrongIds.includes(w.id)).sort(() => Math.random() - 0.5)
    } else {
      words = wordsData.wordList
        .filter(w => w.level === level)
        .sort(() => Math.random() - 0.5)
    }
    
    const levelName = level === 'all' ? '全部词汇' : level === 'mistakes' ? '错题默写' : wordsData.levelName[level] || ''
    
    this.setData({
      words,
      totalCount: words.length,
      levelName,
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      combo: 0,
      isFinished: false,
      answeredSet: []
    })
    
    if (words.length > 0) {
      this.prepareWord(0)
    }
  },

  prepareWord(index) {
    const { words } = this.data
    if (index >= words.length) {
      this.setData({ isFinished: true })
      return
    }
    const word = words[index]

    this.setData({
      currentWord: word,
      currentIndex: index,
      userInput: '',
      inputLetters: word.word.split('').map(() => ''),
      result: null,
      showHint: false,
      showPhonetic: false,
      hint: ''
    })

    // 卡片渲染完成后再播放（延迟 500ms，确保分包 mp3 文件就绪）
    setTimeout(() => voice.playWordVoice(word.word), 500)
  },

  // 播放/重播发音
  playSound(word) {
    const w = word || (this.data.currentWord && this.data.currentWord.word)
    if (!w) return
    voice.playWordVoice(w)
  },

  // 重播发音
  replaySound() {
    this.playSound()
  },

  // 输入变化
  onInput(e) {
    const val = e.detail.value.toLowerCase().trim()
    this.setData({ userInput: val })
  },

  // 提交答案
  submitAnswer() {
    const { currentWord, userInput, correctCount, wrongCount, combo, answeredSet } = this.data
    if (!currentWord || !userInput) {
      wx.showToast({ title: '请输入单词', icon: 'none' })
      return
    }

    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase()
    const newAnsweredSet = [...(answeredSet || [])]
    
    if (correct) {
      // 正确
      const newCombo = combo + 1
      const newCorrect = correctCount + 1
      this.setData({ result: 'correct', correctCount: newCorrect, combo: newCombo })
      
      // 加入已掌握
      const masteredWords = wx.getStorageSync('masteredWords') || []
      if (!masteredWords.includes(currentWord.id)) {
        masteredWords.push(currentWord.id)
        wx.setStorageSync('masteredWords', masteredWords)
      }
      
      // 从错题本移除
      const wrongWords = wx.getStorageSync('wrongWords') || []
      const filtered = wrongWords.filter(id => id !== currentWord.id)
      wx.setStorageSync('wrongWords', filtered)
      
      getApp().addStudyCount(1)
      
      // 自动下一题
      setTimeout(() => this.nextWord(), 1200)
      
    } else {
      // 错误
      const newWrong = wrongCount + 1
      this.setData({ result: 'wrong', wrongCount: newWrong, combo: 0 })
      
      // 加入错题本
      const wrongWords = wx.getStorageSync('wrongWords') || []
      if (!wrongWords.includes(currentWord.id)) {
        wrongWords.push(currentWord.id)
        wx.setStorageSync('wrongWords', wrongWords)
      }
      
      // 3秒后自动下一题
      setTimeout(() => this.nextWord(), 2500)
    }
    
    this.setData({ answeredSet: newAnsweredSet })
  },

  // 下一个单词
  nextWord() {
    const { currentIndex, words } = this.data
    if (currentIndex < words.length - 1) {
      this.prepareWord(currentIndex + 1)
    } else {
      this.setData({ isFinished: true })
    }
  },

  // 跳过
  skipWord() {
    const { currentWord } = this.data
    // 跳过也算入错题本
    if (currentWord) {
      const wrongWords = wx.getStorageSync('wrongWords') || []
      if (!wrongWords.includes(currentWord.id)) {
        wrongWords.push(currentWord.id)
        wx.setStorageSync('wrongWords', wrongWords)
      }
      this.setData({ wrongCount: this.data.wrongCount + 1, combo: 0 })
    }
    this.nextWord()
  },

  // 显示提示（首字母）
  showHintLetter() {
    const { currentWord } = this.data
    if (!currentWord) return
    this.setData({
      showHint: true,
      hint: currentWord.word[0].toUpperCase() + '__'.repeat(currentWord.word.length - 1)
    })
  },

  // 显示音标
  togglePhonetic() {
    this.setData({ showPhonetic: !this.data.showPhonetic })
  },

  // 重来
  restart() {
    this.loadWords(this.data.level)
  },

  goBack() {
    wx.navigateBack()
  }
})
