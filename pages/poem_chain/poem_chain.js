// pages/poem_chain/poem_chain.js
const poemsData = require('../../data/poems')

Page({
  data: {
    // 游戏状态
    isPlaying: false,
    gameMode: 'single', // single / ai
    // 当前诗句
    currentLine: '',
    currentPoem: null,
    // 接龙历史
    chainHistory: [],
    // 用户输入
    userInput: '',
    // 提示
    showHint: false,
    hintText: '',
    // 得分
    score: 0,
    chainCount: 0,
  },

  onLoad() {
    // 初始化
  },

  // 开始游戏
  startGame(e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({ 
      isPlaying: true, 
      gameMode: mode,
      chainHistory: [],
      score: 0,
      chainCount: 0
    })
    this.startRound()
  },

  // 开始一轮
  startRound() {
    // 随机获取一句诗
    const allLines = poemsData.getAllLines()
    const randomLine = allLines[Math.floor(Math.random() * allLines.length)]
    
    this.setData({
      currentLine: randomLine,
      currentPoem: poemsData.getPoemById(randomLine.poemId),
      userInput: '',
      showHint: false
    })
  },

  // 用户输入
  onInput(e) {
    this.setData({ userInput: e.detail.value })
  },

  // 提交答案
  submitAnswer() {
    const { userInput, currentLine, chainHistory } = this.data
    if (!userInput.trim()) return

    // 获取当前句最后一个字
    const lastChar = currentLine.lastChar
    // 获取用户输入第一个字
    const firstChar = userInput.trim().charAt(0)

    // 查找包含该字的诗句
    const matchingLines = poemsData.findLinesByChar(firstChar, 'first')
    const isValid = matchingLines.length > 0 && 
      matchingLines.some(l => l.text.includes(userInput.trim()))

    if (isValid) {
      // 接龙成功
      const { currentPoem } = this.data
      const newHistory = [...chainHistory, {
        line: currentLine.text,
        poem: currentLine.poemTitle,
        dynasty: currentPoem.dynasty,
        author: currentPoem.author
      }]
      
      this.setData({
        chainHistory: newHistory,
        score: this.data.score + 10,
        chainCount: this.data.chainCount + 1
      })
      
      // 记录学习
      this.recordStudy()

      // 继续下一轮
      setTimeout(() => {
        // 用用户的诗句作为新的当前句
        const userLine = matchingLines.find(l => l.text.includes(userInput.trim()))
        this.setData({
          currentLine: userLine,
          currentPoem: poemsData.getPoemById(userLine.poemId),
          userInput: ''
        })
      }, 1000)
    } else {
      // 接龙失败
      wx.showToast({ title: '接龙失败，请重试', icon: 'none' })
      this.recordMistake()
      this.setData({ userInput: '' })
    }
  },

  // 记录错题
  recordMistake() {
    const { currentPoem, currentLine } = this.data
    const wrongKey = 'wrongWords_poem'
    const wrong = wx.getStorageSync(wrongKey) || []
    
    const existing = wrong.find(w => w.id === currentPoem.id)
    if (existing) {
      existing.wrongCount = (existing.wrongCount || 0) + 1
    } else {
      wrong.push({
        id: currentPoem.id,
        title: currentPoem.title,
        author: currentPoem.author,
        dynasty: currentPoem.dynasty,
        content: currentPoem.content,
        wrongCount: 1,
        wrongLine: currentLine.text,
        timestamp: Date.now()
      })
    }
    wx.setStorageSync(wrongKey, wrong)
  },

  // 显示提示
  getHint() {
    const { currentLine } = this.data
    const lastChar = currentLine.lastChar
    const hints = poemsData.findLinesByChar(lastChar, 'first')
    
    if (hints.length > 0) {
      const hint = hints[Math.floor(Math.random() * hints.length)]
      this.setData({
        showHint: true,
        hintText: `以"${lastChar}"开头的诗句，出自《${hint.poemTitle}》：${hint.text}`
      })
    } else {
      wx.showToast({ title: '暂无提示', icon: 'none' })
    }
  },

  // 记录学习
  recordStudy() {
    const studyKey = 'studyRecords_poem'
    const records = wx.getStorageSync(studyKey) || []
    const today = new Date().toLocaleDateString('zh-CN')
    const todayRecord = records.find(r => r.date === today)
    
    if (todayRecord) {
      todayRecord.count = (todayRecord.count || 0) + 1
    } else {
      records.push({ date: today, count: 1 })
    }
    wx.setStorageSync(studyKey, records)
  },

  // 返回
  goBack() {
    if (this.data.isPlaying) {
      this.setData({ isPlaying: false })
    } else {
      wx.navigateBack()
    }
  },
})
