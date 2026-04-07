// pages/chinese_dictation/chinese_dictation.js
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
    showRepeatHint: false,   // 提示"已重复播报"
  },

  onLoad(options) {
    const grade = options.grade || 'grade1'
    const term = options.term || 'term1'
    const gradeLabel = (GRADES.find(g => g.key === grade) || {}).short || ''
    const termLabel = (TERMS.find(t => t.key === term) || {}).name || ''
    wx.setNavigationBarTitle({ title: `${gradeLabel}${termLabel} · 听写默写` })
    this.setData({ grade, term })
    this._startBatch()
  },

  onUnload() {
    // 页面卸载时停止任何语音播报（兼容性处理）
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
    const char = current ? (current.char || current.word) : ''
    const groups = current ? (current.groups || current.group || []) : []
    this.setData({
      current,
      inputValue: '',
      answered: false,
      isCorrect: false,
      questionIndex: idx,
      showRepeatHint: false,
      // 预计算显示字段，避免WXML中调用方法
      displayChar: char,
      displayPinyin: current ? current.pinyin : '',
      displayGroups: groups,
      displayGroupsStr: groups.join('、'),
    })
    // 延迟播报，让页面渲染完成
    setTimeout(() => this._speak(current), 600)
  },

  _speak(word) {
    if (!word) return
    // 从本地存储读取音效设置（与 profile 页面保持一致）
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false
    if (soundEnabled === false) return
    
    const groups = word.groups || word.group || []
    const text = `请写出读音为 ${word.pinyin} 的汉字，组词：${groups.join('，')}`
    
    // 方法1：尝试使用微信语音合成（基础库 2.19.2+）
    if (wx.createSpeechSynthesizer) {
      try {
        const synthesizer = wx.createSpeechSynthesizer()
        synthesizer.speak({ content: text })
        console.log('[语音播报] 使用 SpeechSynthesizer:', text)
        return
      } catch (e) {
        console.error('[语音播报] SpeechSynthesizer 失败:', e)
      }
    }
    
    // 方法2：使用百度语音合成 API（更可靠）
    this._speakWithBaidu(text, word.pinyin)
  },

  // 百度语音合成（备用方案）
  _speakWithBaidu(text, fallbackPinyin) {
    const audioCtx = wx.createInnerAudioContext()
    // 使用百度语音合成 API
    const encodedText = encodeURIComponent(text)
    const baiduUrl = `https://tts.baidu.com/text2audio?tex=${encodedText}&cuid=miniapp&ctp=1&lan=zh&spd=5&pit=5&vol=15&per=0`
    
    audioCtx.src = baiduUrl
    audioCtx.volume = 1.0
    
    audioCtx.onPlay(() => {
      console.log('[语音播报] 百度语音开始播放')
    })
    
    audioCtx.onError((err) => {
      console.error('[语音播报] 百度语音失败:', err)
      // 降级：显示拼音提示
      wx.showToast({ title: `${fallbackPinyin}`, icon: 'none', duration: 2000 })
    })
    
    audioCtx.play()
  },

  repeatSpeak() {
    const { current } = this.data
    if (!current) return
    this.setData({ showRepeatHint: true })
    this._speak(current)
    setTimeout(() => this.setData({ showRepeatHint: false }), 2000)
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  submitAnswer() {
    const { inputValue, current, batchCorrect, score, grade, term } = this.data
    if (!inputValue.trim()) {
      wx.showToast({ title: '请先输入汉字', icon: 'none' })
      return
    }
    // 支持 char 和 word 两种字段名
    const correctChar = current.char || current.word
    const isCorrect = inputValue.trim() === correctChar
    if (!isCorrect) {
      // 记录错题
      const wrongKey = `wrongWords_chinese_${grade}_${term}`
      const wrongs = wx.getStorageSync(wrongKey) || []
      const wordId = current.id || current.char || current.word
      const exists = wrongs.find(w => (w.id || w.char || w.word) === wordId)
      if (!exists) wrongs.push({ ...current, wrongCount: 1, wrongAnswer: inputValue.trim() })
      else { exists.wrongCount = (exists.wrongCount || 1) + 1; exists.wrongAnswer = inputValue.trim() }
      wx.setStorageSync(wrongKey, wrongs)

      const generalKey = 'wrongWords_chinese'
      const general = wx.getStorageSync(generalKey) || []
      const ge = general.find(w => (w.id || w.char || w.word) === wordId)
      if (!ge) general.push({ ...current, grade, term, wrongCount: 1 })
      else ge.wrongCount = (ge.wrongCount || 1) + 1
      wx.setStorageSync(generalKey, general)
    } else {
      // 正确：标记已掌握（使用统一的 masteredWords_chinese key）
      const masteredKey = 'masteredWords_chinese'
      const mastered = wx.getStorageSync(masteredKey) || []
      const wordId = current.id || current.char || current.word
      if (!mastered.includes(wordId)) {
        mastered.push(wordId)
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
