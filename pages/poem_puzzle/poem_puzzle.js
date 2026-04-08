// pages/poem_puzzle/poem_puzzle.js
const poemsData = require('../../data/poems')

Page({
  data: {
    grade: '',
    term: '',
    poems: [],
    currentPoem: null,
    // 拼图状态
    originalLines: [], // 原始顺序
    shuffledLines: [], // 打乱顺序
    userOrder: [], // 用户选择的顺序
    isComplete: false,
    isCorrect: false,
    // 统计
    completedCount: 0,
    totalCount: 0,
  },

  onLoad(options) {
    const { grade = 'grade1', term = 'term1' } = options
    const poems = poemsData.getPoems(grade, term)
    this.setData({ 
      grade, 
      term, 
      poems,
      totalCount: poems.length
    })
    this.initPuzzle()
  },

  // 初始化拼图
  initPuzzle() {
    const { poems, completedCount } = this.data
    if (completedCount >= poems.length) {
      this.setData({ isComplete: true })
      return
    }

    const poem = poems[completedCount]
    const lines = [...poem.content]
    // 打乱顺序（使用 Fisher-Yates 算法确保真正打乱）
    const shuffled = this.shuffleArray([...lines])
    
    this.setData({
      currentPoem: poem,
      originalLines: lines,
      shuffledLines: shuffled,
      userOrder: [],
      isComplete: false,
      isCorrect: false
    })
  },

  // Fisher-Yates 洗牌算法
  shuffleArray(array) {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  },

  // 选择诗句
  selectLine(e) {
    const { index } = e.currentTarget.dataset
    const { shuffledLines, userOrder } = this.data
    
    // 检查是否已经选择
    if (userOrder.includes(index)) return
    
    const newOrder = [...userOrder, index]
    this.setData({ userOrder: newOrder })
    
    // 检查是否完成
    if (newOrder.length === shuffledLines.length) {
      this.checkAnswer()
    }
  },

  // 取消选择
  deselectLine(e) {
    const { index } = e.currentTarget.dataset
    const { userOrder } = this.data
    const newOrder = userOrder.filter((_, i) => i !== index)
    this.setData({ userOrder: newOrder })
  },

  // 检查答案
  checkAnswer() {
    const { originalLines, shuffledLines, userOrder, currentPoem } = this.data
    
    const userLines = userOrder.map(i => shuffledLines[i])
    const isCorrect = userLines.every((line, i) => line === originalLines[i])
    
    this.setData({ isCorrect })
    
    if (isCorrect) {
      // 记录掌握
      const masteredKey = 'mastered_poem'
      const mastered = wx.getStorageSync(masteredKey) || []
      if (!mastered.includes(currentPoem.id)) {
        mastered.push(currentPoem.id)
        wx.setStorageSync(masteredKey, mastered)
      }
      
      // 记录学习
      this.recordStudy()
      
      // 播放成功音效
      this.playSuccessSound()
      
      // 延迟进入下一首
      setTimeout(() => {
        this.setData({ completedCount: this.data.completedCount + 1 }, () => {
          this.initPuzzle()
        })
      }, 1500)
    } else {
      // 记录错题
      this.recordMistake()
      // 播放错误音效
      this.playErrorSound()
    }
  },

  // 记录错题
  recordMistake() {
    const { currentPoem } = this.data
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
        timestamp: Date.now()
      })
    }
    wx.setStorageSync(wrongKey, wrong)
  },

  // 重置当前拼图
  resetPuzzle() {
    this.setData({ userOrder: [], isCorrect: false })
  },

  // 跳过当前古诗
  skipPoem() {
    wx.showModal({
      title: '跳过这首古诗',
      content: '确定要跳过当前古诗吗？',
      confirmText: '跳过',
      confirmColor: '#FA8C16',
      success: (res) => {
        if (res.confirm) {
          this.setData({ completedCount: this.data.completedCount + 1 }, () => {
            this.initPuzzle()
          })
        }
      }
    })
  },

  // 暂存/标记为还不会
  markAsDontKnow() {
    const { currentPoem } = this.data
    
    wx.showModal({
      title: '暂存到错题本',
      content: `将《${currentPoem.title}》加入错题本，方便以后复习？`,
      confirmText: '暂存',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          // 记录到错题本
          this.recordMistake()
          
          wx.showToast({
            title: '已暂存',
            icon: 'success',
            duration: 1500
          })
          
          // 延迟后进入下一首
          setTimeout(() => {
            this.setData({ completedCount: this.data.completedCount + 1 }, () => {
              this.initPuzzle()
            })
          }, 1500)
        }
      }
    })
  },

  // 播放成功音效
  playSuccessSound() {
    const audioCtx = wx.createInnerAudioContext()
    audioCtx.src = '/assets/sounds/success.mp3'
    audioCtx.play()
  },

  // 播放错误音效
  playErrorSound() {
    const audioCtx = wx.createInnerAudioContext()
    audioCtx.src = '/assets/sounds/error.mp3'
    audioCtx.play()
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
    wx.navigateBack()
  },

  // 再玩一次
  restart() {
    this.setData({ completedCount: 0 }, () => {
      this.initPuzzle()
    })
  },
})
