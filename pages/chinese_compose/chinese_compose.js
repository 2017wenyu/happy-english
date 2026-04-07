// pages/chinese_compose/chinese_compose.js
const { getWords, GRADES, TERMS } = require('../../data/chinese_words')

Page({
  data: {
    grade: 'grade1',
    term: 'term1',
    queue: [],
    current: null,
    questionIndex: 0,
    totalInBatch: 10,
    inputValue: '',
    answered: false,
    isCorrect: false,
    batchDone: false,
    batchCorrect: 0,
    score: 0,
    batchPct: 0,
    // 题目展示
    wordTemplate: '',    // 如 "春（ ）" 或 "（ ）天"
    targetWord: '',      // 待填汉字
    groupWord: '',       // 完整词语
  },

  onLoad(options) {
    const grade = options.grade || 'grade1'
    const term = options.term || 'term1'
    const gradeLabel = (GRADES.find(g => g.key === grade) || {}).short || ''
    const termLabel = (TERMS.find(t => t.key === term) || {}).name || ''
    wx.setNavigationBarTitle({ title: `${gradeLabel}${termLabel} · 组词填空` })
    this.setData({ grade, term })
    this._startBatch()
  },

  _startBatch() {
    const { grade, term } = this.data
    const allWords = getWords(grade, term)
    if (!allWords || allWords.length === 0) {
      wx.showToast({ title: '暂无生字数据', icon: 'none' })
      return
    }
    const shuffled = this._shuffle([...allWords])
    const queue = shuffled.slice(0, Math.min(10, shuffled.length))
    this.setData({
      queue,
      questionIndex: 0,
      batchCorrect: 0,
      score: 0,
      batchDone: false,
      totalInBatch: queue.length
    })
    this._loadQuestion(0)
  },

  _loadQuestion(idx) {
    const current = this.data.queue[idx]
    const char = current.char || current.word
    const groups = current.groups || current.group || []
    // 随机取一个组词
    const groupWord = groups[Math.floor(Math.random() * groups.length)]
    // 生成挖空模板：把第一个匹配的生字替换为（ ）
    const wordPos = groupWord.indexOf(char)
    let wordTemplate = groupWord
    if (wordPos >= 0) {
      wordTemplate = groupWord.slice(0, wordPos) + '（  ）' + groupWord.slice(wordPos + char.length)
    }

    this.setData({
      current,
      questionIndex: idx,
      inputValue: '',
      answered: false,
      isCorrect: false,
      wordTemplate,
      targetWord: char,
      groupWord,
    })
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  submitAnswer() {
    const { inputValue, current, batchCorrect, score, grade, term, groupWord } = this.data
    if (!inputValue.trim()) {
      wx.showToast({ title: '请先输入汉字', icon: 'none' })
      return
    }
    const char = current.char || current.word
    const isCorrect = inputValue.trim() === char

    if (!isCorrect) {
      const wrongKey = `wrongWords_chinese_${grade}_${term}`
      const wrongs = wx.getStorageSync(wrongKey) || []
      const exists = wrongs.find(w => w.id === current.id)
      if (!exists) wrongs.push({ ...current, wrongCount: 1, wrongAnswer: inputValue.trim() })
      else { exists.wrongCount = (exists.wrongCount || 1) + 1 }
      wx.setStorageSync(wrongKey, wrongs)

      const generalKey = 'wrongWords_chinese'
      const general = wx.getStorageSync(generalKey) || []
      const ge = general.find(w => w.id === current.id)
      if (!ge) general.push({ ...current, grade, term, wrongCount: 1 })
      else ge.wrongCount = (ge.wrongCount || 1) + 1
      wx.setStorageSync(generalKey, general)
    } else {
      // 正确：标记已掌握（使用统一的 masteredWords_chinese key）
      const masteredKey = 'masteredWords_chinese'
      const mastered = wx.getStorageSync(masteredKey) || []
      if (!mastered.includes(current.id)) {
        mastered.push(current.id)
        wx.setStorageSync(masteredKey, mastered)
      }
    }

    // 记录今日学习（答对或答错都算学习过）
    const studyKey = 'studyRecords_chinese'
    const studyRecords = wx.getStorageSync(studyKey) || []
    const today = new Date().toLocaleDateString('zh-CN')
    const todayRecord = studyRecords.find(r => r.date === today)
    if (todayRecord) {
      todayRecord.count = (todayRecord.count || 0) + 1
    } else {
      studyRecords.push({ date: today, count: 1 })
    }
    wx.setStorageSync(studyKey, studyRecords)

    this.setData({
      answered: true,
      isCorrect,
      batchCorrect: isCorrect ? batchCorrect + 1 : batchCorrect,
      score: isCorrect ? score + 10 : score,
    })
  },

  nextQuestion() {
    const { questionIndex, totalInBatch } = this.data
    const nextIdx = questionIndex + 1
    if (nextIdx >= totalInBatch) {
      const pct = totalInBatch > 0 ? Math.round(this.data.batchCorrect * 100 / totalInBatch) : 0
      this.setData({ batchDone: true, batchPct: pct })
    } else {
      this._loadQuestion(nextIdx)
    }
  },

  nextBatch() {
    this._startBatch()
  },

  goBack() {
    wx.navigateBack()
  },

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
})
