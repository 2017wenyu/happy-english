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
    isPlaying: false,      // 语音播放状态（与古诗页面一致）
  },
  
  // 音频上下文（用于清理）
  audioCtx: null,

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
    // 页面卸载时清理音频资源
    this._cleanupAudio()
  },

  onHide() {
    // 页面隐藏时停止播放
    this._cleanupAudio()
  },

  // 清理音频资源
  _cleanupAudio() {
    if (this.audioCtx) {
      this.audioCtx.destroy()
      this.audioCtx = null
    }
    this.setData({ isPlaying: false })
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
      // 预计算显示字段，避免WXML中调用方法
      displayChar: char,
      displayPinyin: current ? current.pinyin : '',
      displayGroups: groups,
      displayGroupsStr: groups.join('、'),
    })
    // 延迟播报，让页面渲染完成
    setTimeout(() => this._speak(current), 600)
  },

  // 语音合成（与古诗页面一致：微信原生优先，降级到网络源）
  _speak(word) {
    if (!word) return
    
    // 从本地存储读取音效设置
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false
    if (!soundEnabled) return
    
    const groups = word.groups || word.group || []
    // 播报格式："请写出读音为 [拼音] 的汉字，组词：[词语1]，[词语2]"
    const text = `请写出读音为 ${word.pinyin} 的汉字，组词：${groups.join('，')}`
    
    this.setData({ isPlaying: true })
    this.speakText(text, () => {
      this.setData({ isPlaying: false })
    })
  },

  // 语音合成（与 poem_read.js 保持一致）
  speakText(text, onComplete) {
    if (!text) return
    
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false
    if (!soundEnabled) {
      onComplete && onComplete()
      return
    }

    console.log('[语音播报] 开始:', text)

    // 优先使用微信原生语音合成
    if (wx.createSpeechSynthesizer) {
      try {
        const synthesizer = wx.createSpeechSynthesizer()
        let hasCompleted = false
        
        synthesizer.speak({
          content: text,
          lang: 'zh_CN',
          success: (res) => {
            console.log('[语音播报] 微信语音成功:', res)
            const duration = res?.duration || 2000
            setTimeout(() => {
              if (!hasCompleted) {
                hasCompleted = true
                onComplete && onComplete()
              }
            }, duration + 200)
          },
          fail: (err) => {
            console.error('[语音播报] 微信语音失败:', err)
            if (!hasCompleted) {
              hasCompleted = true
              this.speakWithBaidu(text, onComplete)
            }
          }
        })
        
        // 设置超时保护
        setTimeout(() => {
          if (!hasCompleted) {
            hasCompleted = true
            onComplete && onComplete()
          }
        }, 10000)
        
        return
      } catch (e) {
        console.error('[语音播报] 语音合成异常:', e)
      }
    }
    
    // 降级到网络语音源
    this.speakWithBaidu(text, onComplete)
  },

  // 网络语音合成（多源备用，与 poem_read.js 一致）
  speakWithBaidu(text, onComplete) {
    const encodedText = encodeURIComponent(text)
    
    // 多个备用语音API
    const urls = [
      `https://tts.baidu.com/text2audio?tex=${encodedText}&cuid=miniapp&ctp=1&lan=zh&spd=4&pit=5&vol=15&per=0`,
      `https://dict.youdao.com/dictvoice?type=0&audio=${encodedText}`,
      `https://fanyi.baidu.com/gettts?lan=zh&text=${encodedText}&spd=3&source=web`,
    ]
    
    let currentUrlIndex = 0
    let hasCompleted = false
    
    const cleanup = () => {
      if (this.audioCtx) {
        this.audioCtx.destroy()
        this.audioCtx = null
      }
    }
    
    const tryNextUrl = () => {
      if (hasCompleted) return
      
      if (currentUrlIndex >= urls.length) {
        // 所有URL都失败，静默完成
        hasCompleted = true
        cleanup()
        onComplete && onComplete()
        return
      }
      
      // 销毁旧的 audioCtx
      cleanup()
      
      // 创建新的 audioCtx
      this.audioCtx = wx.createInnerAudioContext()
      const currentUrl = urls[currentUrlIndex++]
      
      this.audioCtx.onCanplay(() => {
        if (hasCompleted) return
        this.audioCtx.play()
      })
      
      this.audioCtx.onEnded(() => {
        if (hasCompleted) return
        hasCompleted = true
        cleanup()
        onComplete && onComplete()
      })
      
      this.audioCtx.onError((err) => {
        console.error('[语音播报] 播放失败:', currentUrl, err)
        tryNextUrl()
      })
      
      // 设置超时
      setTimeout(() => {
        if (!hasCompleted) {
          tryNextUrl()
        }
      }, 5000)
      
      this.audioCtx.src = currentUrl
    }
    
    // 开始尝试第一个URL
    tryNextUrl()
  },

  repeatSpeak() {
    const { current, isPlaying } = this.data
    if (!current || isPlaying) return
    this._speak(current)
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
