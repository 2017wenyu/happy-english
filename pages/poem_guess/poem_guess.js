// pages/poem_guess/poem_guess.js
const poemsData = require('../../data/poems')

Page({
  data: {
    // 题目列表
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    // 选项
    options: [],
    // 结果
    selectedAnswer: null,
    isCorrect: null,
    // 统计
    correctCount: 0,
    totalCount: 0,
    score: 0,
    isComplete: false,
    // 是否最后一题
    isLastQuestion: false,
  },

  onLoad() {
    this.initQuestions()
  },

  // 初始化题目
  initQuestions() {
    // 随机获取10首古诗作为题目
    const allPoems = []
    for (let g = 1; g <= 4; g++) {
      for (let t = 1; t <= 2; t++) {
        const poems = poemsData.getPoems(`grade${g}`, `term${t}`)
        allPoems.push(...poems)
      }
    }
    
    // 随机选择10首
    const shuffled = allPoems.sort(() => Math.random() - 0.5).slice(0, 10)
    
    // 生成题目
    const questions = shuffled.map(poem => ({
      poem: poem,
      type: Math.random() > 0.5 ? 'image' : 'desc', // image: 看图猜诗, desc: 描述猜诗
      imageDesc: poem.imageDesc,
      desc: this.generateDesc(poem),
      options: this.generateOptions(poem, allPoems)
    }))
    
    this.setData({
      questions,
      totalCount: questions.length,
      currentQuestion: questions[0]
    })
  },

  // 生成描述（不暴露答案）
  generateDesc(poem) {
    // 根据诗歌内容生成不暴露答案的线索
    const descs = [
      // 线索1：描写内容（模糊化）
      () => {
        const keywords = poem.keywords.slice(0, 2).join('、')
        return `这是一首描写${keywords}的诗`
      },
      // 线索2：情感主题
      () => {
        const emotions = {
          '思乡': '思念家乡',
          '爱国': '忧国忧民',
          '友情': '真挚友谊',
          '写景': '自然风光',
          '咏物': '托物言志',
          '田园': '田园生活',
          '边塞': '边塞风光',
          '送别': '离别之情',
          '哲理': '人生哲理',
        }
        const emotion = emotions[poem.emotion] || poem.emotion
        return `这首诗表达了${emotion}`
      },
      // 线索3：诗句片段（隐藏关键词）
      () => {
        const line = poem.content[0] || poem.content[1]
        // 隐藏部分文字，用"□"代替
        const chars = line.split('')
        const hideCount = Math.min(2, Math.floor(chars.length / 4))
        for (let i = 0; i < hideCount; i++) {
          const idx = Math.floor(Math.random() * chars.length)
          if (chars[idx] !== '，' && chars[idx] !== '。' && chars[idx] !== '？' && chars[idx] !== '！') {
            chars[idx] = '□'
          }
        }
        return `诗句中有："${chars.join('')}"`
      },
      // 线索4：诗句长度
      () => {
        const totalChars = poem.content.join('').replace(/[，。？！]/g, '').length
        return `这首诗共${poem.content.length}句，约${totalChars}个字`
      },
      // 线索5：韵脚提示
      () => {
        const lastLines = poem.content.filter((_, i) => i % 2 === 1)
        if (lastLines.length > 0) {
          const lastChar = lastLines[0].replace(/[，。？！]/g, '').slice(-1)
          return `这首诗的韵脚之一是"${lastChar}"字`
        }
        return `这是一首${poem.dynasty}代诗歌`
      },
    ]
    
    // 随机选择2-3个线索组合
    const selected = descs.sort(() => Math.random() - 0.5).slice(0, 2)
    return selected.map(fn => fn()).join('；')
  },

  // 生成选项（1个正确 + 3个干扰）
  generateOptions(correctPoem, allPoems) {
    const options = [{
      id: correctPoem.id,
      title: correctPoem.title,
      author: correctPoem.author,
      dynasty: correctPoem.dynasty,
      isCorrect: true
    }]
    
    // 随机选择3个干扰项
    const others = allPoems
      .filter(p => p.id !== correctPoem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    others.forEach(p => {
      options.push({
        id: p.id,
        title: p.title,
        author: p.author,
        dynasty: p.dynasty,
        isCorrect: false
      })
    })
    
    // 打乱顺序
    return options.sort(() => Math.random() - 0.5)
  },

  // 选择答案
  selectAnswer(e) {
    const { index } = e.currentTarget.dataset
    const { currentQuestion, currentIndex, questions, correctCount } = this.data
    
    if (this.data.selectedAnswer !== null) return
    
    const selected = currentQuestion.options[index]
    const isCorrect = selected.isCorrect
    
    this.setData({
      selectedAnswer: index,
      isCorrect
    })
    
    if (isCorrect) {
      this.setData({ correctCount: correctCount + 1 })
      // 记录掌握
      const masteredKey = 'mastered_poem'
      const mastered = wx.getStorageSync(masteredKey) || []
      if (!mastered.includes(currentQuestion.poem.id)) {
        mastered.push(currentQuestion.poem.id)
        wx.setStorageSync(masteredKey, mastered)
      }
    } else {
      // 记录错题
      this.recordMistake()
    }

    // 标记是否最后一题
    this.setData({
      isLastQuestion: currentIndex >= questions.length - 1
    })
  },

  // 下一题（用户主动点击）
  nextQuestion() {
    const { currentIndex, questions } = this.data

    if (currentIndex < questions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedAnswer: null,
        isCorrect: null,
        isLastQuestion: false
      })
    } else {
      // 计算最终得分
      const { correctCount, totalCount } = this.data
      const score = totalCount > 0 ? Math.round(correctCount / totalCount * 100) : 0
      this.setData({ isComplete: true, score })
    }
  },

  // 记录错题
  recordMistake() {
    const { currentQuestion } = this.data
    const wrongKey = 'wrongWords_poem'
    const wrong = wx.getStorageSync(wrongKey) || []
    
    const existing = wrong.find(w => w.id === currentQuestion.poem.id)
    if (existing) {
      existing.wrongCount = (existing.wrongCount || 0) + 1
    } else {
      wrong.push({
        id: currentQuestion.poem.id,
        title: currentQuestion.poem.title,
        author: currentQuestion.poem.author,
        dynasty: currentQuestion.poem.dynasty,
        content: currentQuestion.poem.content,
        wrongCount: 1,
        timestamp: Date.now()
      })
    }
    wx.setStorageSync(wrongKey, wrong)
  },

  // 返回
  goBack() {
    wx.navigateBack()
  },

  // 再玩一次
  restart() {
    this.setData({
      currentIndex: 0,
      correctCount: 0,
      isComplete: false,
      selectedAnswer: null,
      isCorrect: null,
      isLastQuestion: false,
    }, () => {
      this.initQuestions()
    })
  },
})
