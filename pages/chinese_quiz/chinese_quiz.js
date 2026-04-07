// pages/chinese_quiz/chinese_quiz.js
const { getWords, GRADES, TERMS } = require('../../data/chinese_words')
const { playClickSound, playCorrectSound, playWrongSound, playCompleteSound } = require('../../utils/audio')

const BATCH_SIZE = 10  // 每组题数

Page({
  data: {
    mode: 'pinyin_to_word',   // 'pinyin_to_word' | 'word_to_pinyin'
    grade: 'grade1',
    term: 'term1',
    allWords: [],
    queue: [],          // 当前批次题目
    current: null,      // 当前题目 {word, pinyin, group}
    options: [],        // 4个选项 [{text, correct}]
    questionIndex: 0,   // 当前批次题号（0-based）
    totalInBatch: BATCH_SIZE,
    answered: false,    // 是否已答
    selectedIdx: -1,    // 选中的答案下标
    isCorrect: false,
    score: 0,           // 本批次得分
    batchDone: false,   // 批次结束
    batchCorrect: 0,
    batchPct: 0,
    titleText: '看拼音选汉字',
    questionLabel: '请选出正确的汉字：',
    questionMain: '',    // 题目显示文字（拼音 或 汉字）
    questionSub: '',     // 副标题
    encourages: ['棒棒哒！', '真厉害！', '超级棒！', '你真棒～', '继续加油！'],
  },

  onLoad(options) {
    const mode = options.mode || 'pinyin_to_word'
    const grade = options.grade || 'grade1'
    const term = options.term || 'term1'
    const gradeLabel = (GRADES.find(g => g.key === grade) || {}).short || ''
    const termLabel = (TERMS.find(t => t.key === term) || {}).name || ''
    const titleText = mode === 'pinyin_to_word' ? '看拼音选汉字' : '看汉字选拼音'
    const questionLabel = mode === 'pinyin_to_word' ? '请选出正确的汉字：' : '请选出正确的拼音：'

    wx.setNavigationBarTitle({ title: `${gradeLabel}${termLabel} · ${titleText}` })

    const allWords = getWords(grade, term)
    this.setData({ mode, grade, term, allWords, titleText, questionLabel })
    this._startBatch()
  },

  _startBatch() {
    const { allWords } = this.data
    if (!allWords || allWords.length === 0) {
      wx.showToast({ title: '暂无生字数据', icon: 'none' })
      return
    }
    // 打乱并取前 BATCH_SIZE 道
    const shuffled = this._shuffle([...allWords])
    const queue = shuffled.slice(0, Math.min(BATCH_SIZE, shuffled.length))
    this.setData({
      queue,
      questionIndex: 0,
      score: 0,
      batchCorrect: 0,
      batchDone: false,
      totalInBatch: queue.length
    })
    this._loadQuestion(0)
  },

  _loadQuestion(idx) {
    const { queue, allWords, mode } = this.data
    const current = queue[idx]
    const char = current.char || current.word
    const groups = current.groups || current.group || []
    let options = []

    if (mode === 'pinyin_to_word') {
      // 显示拼音，选汉字
      // 干扰项：从 allWords 中随机取3个不同汉字
      const distractors = this._shuffle(
        allWords.filter(w => (w.char || w.word) !== char)
      ).slice(0, 3).map(w => w.char || w.word)
      const pool = this._shuffle([char, ...distractors])
      options = pool.map(w => ({ text: w, correct: w === char }))
    } else {
      // 显示汉字，选拼音
      const distractors = this._shuffle(
        allWords.filter(w => w.pinyin !== current.pinyin)
      ).slice(0, 3).map(w => w.pinyin)
      const pool = this._shuffle([current.pinyin, ...distractors])
      options = pool.map(p => ({ text: p, correct: p === current.pinyin }))
    }

    const questionMain = mode === 'pinyin_to_word' ? current.pinyin : char
    // 看拼音选汉字：不显示组词线索，增加难度；看汉字选拼音：显示组词作为辅助
    const questionSub = mode === 'word_to_pinyin'
      ? `组词：${groups.join('、')}`
      : ''

    this.setData({
      current,
      options,
      questionMain,
      questionSub,
      answered: false,
      selectedIdx: -1,
      isCorrect: false,
      questionIndex: idx,
      // 预计算显示字段，避免WXML中复杂表达式
      displayChar: char,
      displayPinyin: current.pinyin,
      displayGroups: groups.join('、'),
    })
  },

  chooseAnswer(e) {
    if (this.data.answered) return
    
    // 播放点击音效
    playClickSound()
    
    const idx = e.currentTarget.dataset.idx
    const { options, current, score, batchCorrect, mode, grade, term, questionIndex } = this.data
    const chosen = options[idx]
    const isCorrect = chosen.correct
    
    // 播放正确/错误音效
    if (isCorrect) {
      playCorrectSound()
    } else {
      playWrongSound()
    }

    // 错题记录
    if (!isCorrect) {
      // 写入通用 wrongWords_chinese（给 mistakes 页面用）
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
      selectedIdx: idx,
      isCorrect,
      score: isCorrect ? score + 10 : score,
      batchCorrect: isCorrect ? batchCorrect + 1 : batchCorrect,
    })
  },

  nextQuestion() {
    const { questionIndex, totalInBatch, batchCorrect } = this.data
    const nextIdx = questionIndex + 1
    if (nextIdx >= totalInBatch) {
      // 批次结束，播放完成音效
      playCompleteSound()
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
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
})
