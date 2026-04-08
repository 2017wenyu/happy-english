// pages/poem_write/poem_write.js
const poemsData = require('../../data/poems')

Page({
  data: {
    grade: '',
    term: '',
    poems: [],
    currentPoem: null,
    currentIndex: 0,
    // 默写模式：fill(填空) / full(全篇)
    mode: 'fill',
    // 填空模式 - 预处理后的诗句行数据
    poemLines: [], // [{ chars: [{char, isBlank, blankIndex, userInput, isCorrect}] }]
    blanks: [],
    // 字库（所有填空需要的字，打乱顺序）
    charBank: [],
    // 当前选中的填空位置
    selectedBlankIndex: -1,
    // 全篇模式
    fullInput: '',
    // 结果
    isComplete: false,
    score: 0,
    showAnswer: false,
  },

  onLoad(options) {
    const { grade = 'grade1', term = 'term1', mode = 'fill' } = options
    const poems = poemsData.getPoems(grade, term)
    this.setData({ 
      grade, 
      term, 
      mode,
      poems,
    })
    this.initPoem()
  },

  // 初始化当前古诗
  initPoem() {
    const { poems, currentIndex, mode } = this.data
    if (currentIndex >= poems.length) {
      this.setData({ isComplete: true })
      return
    }

    const poem = poems[currentIndex]
    
    if (mode === 'fill') {
      // 生成填空：每句随机挖1-2个字
      const blanks = []
      poem.content.forEach((line, lineIdx) => {
        const cleanLine = line.replace(/[，。！？]/g, '')
        const charCount = cleanLine.length
        const blankCount = Math.min(2, Math.floor(charCount / 4) + 1)
        
        // 随机选择要挖空的位置
        const positions = []
        while (positions.length < blankCount) {
          const pos = Math.floor(Math.random() * charCount)
          if (!positions.includes(pos)) {
            positions.push(pos)
          }
        }
        
        positions.forEach(pos => {
          blanks.push({
            lineIndex: lineIdx,
            charIndex: pos,
            char: cleanLine[pos],
            userInput: '',
            isCorrect: null
          })
        })
      })
      
      blanks.sort((a, b) => {
        if (a.lineIndex !== b.lineIndex) return a.lineIndex - b.lineIndex
        return a.charIndex - b.charIndex
      })
      
      // 预处理诗句数据，标记填空位置
      const poemLines = poem.content.map((line, lineIdx) => {
        const cleanLine = line.replace(/[，。！？]/g, '')
        const chars = []
        let blankCounter = 0
        
        for (let i = 0; i < cleanLine.length; i++) {
          const blank = blanks.find(b => b.lineIndex === lineIdx && b.charIndex === i)
          if (blank) {
            chars.push({
              char: blank.char,
              isBlank: true,
              blankIndex: blanks.indexOf(blank),
              userInput: '',
              isCorrect: null
            })
          } else {
            chars.push({
              char: cleanLine[i],
              isBlank: false
            })
          }
        }
        return { chars }
      })
      
      // 生成字库：收集所有填空的字，打乱顺序
      const charBank = blanks.map(b => b.char).sort(() => Math.random() - 0.5)
      
      this.setData({
        currentPoem: poem,
        poemLines,
        blanks,
        charBank,
        selectedBlankIndex: -1,
        showAnswer: false
      })
    } else {
      // 全篇默写模式
      this.setData({
        currentPoem: poem,
        fullInput: '',
        showAnswer: false
      })
    }
  },

  // 选择填空位置
  selectBlank(e) {
    const { index } = e.currentTarget.dataset
    if (this.data.showAnswer) return
    this.setData({ selectedBlankIndex: index })
  },

  // 从字库选择字填入
  selectCharFromBank(e) {
    const { char } = e.currentTarget.dataset
    const { selectedBlankIndex, blanks, poemLines } = this.data
    
    if (selectedBlankIndex === -1) {
      wx.showToast({ title: '请先点击选择要填的空', icon: 'none' })
      return
    }
    
    // 更新 blanks
    blanks[selectedBlankIndex].userInput = char
    
    // 更新 poemLines 中对应的输入
    const newPoemLines = poemLines.map(line => ({
      chars: line.chars.map(c => {
        if (c.isBlank && c.blankIndex === selectedBlankIndex) {
          return { ...c, userInput: char }
        }
        return c
      })
    }))
    
    // 自动跳到下一个未填的空
    let nextIndex = -1
    for (let i = selectedBlankIndex + 1; i < blanks.length; i++) {
      if (!blanks[i].userInput) {
        nextIndex = i
        break
      }
    }
    // 如果没找到，从头找
    if (nextIndex === -1) {
      for (let i = 0; i < blanks.length; i++) {
        if (!blanks[i].userInput) {
          nextIndex = i
          break
        }
      }
    }
    
    this.setData({ 
      blanks, 
      poemLines: newPoemLines,
      selectedBlankIndex: nextIndex
    })
  },

  // 清空当前选中的填空
  clearBlank() {
    const { selectedBlankIndex, blanks, poemLines } = this.data
    if (selectedBlankIndex === -1) return
    
    blanks[selectedBlankIndex].userInput = ''
    
    const newPoemLines = poemLines.map(line => ({
      chars: line.chars.map(c => {
        if (c.isBlank && c.blankIndex === selectedBlankIndex) {
          return { ...c, userInput: '' }
        }
        return c
      })
    }))
    
    this.setData({ blanks, poemLines: newPoemLines })
  },

  // 全篇输入
  onFullInput(e) {
    this.setData({ fullInput: e.detail.value })
  },

  // 提交答案
  submitAnswer() {
    const { mode, blanks, fullInput, currentPoem, poemLines } = this.data
    
    if (mode === 'fill') {
      // 检查填空
      let correctCount = 0
      const newBlanks = blanks.map(b => {
        const isCorrect = b.userInput.trim() === b.char
        if (isCorrect) correctCount++
        return { ...b, isCorrect }
      })
      
      // 更新 poemLines 的 isCorrect 状态
      const newPoemLines = poemLines.map(line => ({
        chars: line.chars.map(c => {
          if (c.isBlank) {
            const blank = newBlanks[c.blankIndex]
            return { ...c, isCorrect: blank.isCorrect }
          }
          return c
        })
      }))
      
      const score = Math.round(correctCount / blanks.length * 100)
      this.setData({ 
        blanks: newBlanks, 
        poemLines: newPoemLines,
        score,
        showAnswer: true 
      })
      
      if (score === 100) {
        this.onPoemComplete()
      } else {
        this.recordMistake()
      }
    } else {
      // 全篇检查（简化：检查关键信息）
      const input = fullInput.trim()
      const hasTitle = input.includes(currentPoem.title)
      const hasAuthor = input.includes(currentPoem.author)
      const contentMatch = currentPoem.content.every(line => 
        input.includes(line.replace(/[，。！？]/g, ''))
      )
      
      const score = (hasTitle ? 20 : 0) + (hasAuthor ? 20 : 0) + (contentMatch ? 60 : 0)
      this.setData({ score, showAnswer: true })
      
      if (score >= 80) {
        this.onPoemComplete()
      } else {
        this.recordMistake()
      }
    }
  },

  // 古诗完成
  onPoemComplete() {
    const { currentPoem } = this.data
    
    // 记录掌握
    const masteredKey = 'mastered_poem'
    const mastered = wx.getStorageSync(masteredKey) || []
    if (!mastered.includes(currentPoem.id)) {
      mastered.push(currentPoem.id)
      wx.setStorageSync(masteredKey, mastered)
    }
    
    // 记录学习
    this.recordStudy()
    
    // 延迟进入下一首
    setTimeout(() => {
      this.setData({ 
        currentIndex: this.data.currentIndex + 1 
      }, () => {
        this.initPoem()
      })
    }, 1500)
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

  // 记录错题
  recordMistake() {
    const { currentPoem, mode, blanks } = this.data
    const wrongKey = 'wrongWords_poem'
    const wrong = wx.getStorageSync(wrongKey) || []
    
    const wrongChars = mode === 'fill' 
      ? blanks.filter(b => !b.isCorrect).map(b => b.char)
      : ['默写错误']
    
    const existing = wrong.find(w => w.id === currentPoem.id)
    if (existing) {
      existing.wrongCount = (existing.wrongCount || 0) + 1
      existing.wrongChars = wrongChars
    } else {
      wrong.push({
        id: currentPoem.id,
        title: currentPoem.title,
        author: currentPoem.author,
        dynasty: currentPoem.dynasty,
        content: currentPoem.content,
        wrongCount: 1,
        wrongChars,
        timestamp: Date.now()
      })
    }
    wx.setStorageSync(wrongKey, wrong)
  },

  // 下一首
  nextPoem() {
    this.setData({ 
      currentIndex: this.data.currentIndex + 1 
    }, () => {
      this.initPoem()
    })
  },

  // 返回
  goBack() {
    wx.navigateBack()
  },

  // 再玩一次
  restart() {
    this.setData({ 
      currentIndex: 0,
      isComplete: false,
      score: 0
    }, () => {
      this.initPoem()
    })
  },
})