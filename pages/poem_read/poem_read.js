// pages/poem_read/poem_read.js
const poemsData = require('../../data/poems')
const classicData = require('../../data/classic_poems')

Page({
  data: {
    grade: '',
    term: '',
    poems: [],
    currentIndex: 0,
    currentPoem: null,
    // 关卡状态：intro(介绍) -> read(跟读) -> complete(完成)
    stage: 'intro',
    // 朗读进度
    readingLine: 0,
    isPlaying: false,
    // 完成统计
    completedPoems: [],
    showResult: false,
  },

  onLoad(options) {
    const { grade = 'grade1', term = 'term1', poemId, source } = options
    
    if (poemId) {
      // 单首诗词模式（从诗人馆或列表页跳转）
      let poem = null
      
      if (source === 'classic') {
        // 从经典拓展数据源查找
        poem = classicData.getClassicPoemById(poemId)
      } else {
        // 从必背古诗词数据源查找
        poem = poemsData.getPoemById(poemId)
      }
      
      if (poem) {
        this.setData({
          grade: '',
          term: '',
          poems: [poem],
          currentPoem: poem,
          currentIndex: 0,
          isClassic: source === 'classic'
        })
      } else {
        wx.showToast({ title: '诗词不存在', icon: 'none' })
        wx.navigateBack()
      }
    } else {
      // 年级学期模式（正常学习流程）
      const poems = poemsData.getPoems(grade, term)
      this.setData({ 
        grade, 
        term, 
        poems,
        currentPoem: poems[0] || null,
        isClassic: false
      })
    }
  },

  onUnload() {
    this.stopAudio()
  },

  // 前一首古诗
  prevPoem() {
    const { currentIndex, poems } = this.data
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      this.setData({
        currentIndex: newIndex,
        currentPoem: poems[newIndex],
        stage: 'intro',
        readingLine: 0
      })
    }
  },

  // 后一首古诗
  nextPoem() {
    const { currentIndex, poems } = this.data
    if (currentIndex < poems.length - 1) {
      const newIndex = currentIndex + 1
      this.setData({
        currentIndex: newIndex,
        currentPoem: poems[newIndex],
        stage: 'intro',
        readingLine: 0
      })
    }
  },

  // 开始朗读当前古诗
  startReading() {
    this.setData({ stage: 'read', readingLine: 0 })
    // 先朗读朝代、作者和诗名
    this.speakPoemInfo(() => {
      this.playCurrentLine()
    })
  },

  // 朗读古诗信息（朝代、作者、诗名）
  speakPoemInfo(onComplete) {
    const { currentPoem } = this.data
    if (!currentPoem) {
      onComplete && onComplete()
      return
    }
    
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false
    if (!soundEnabled) {
      onComplete && onComplete()
      return
    }

    // 朗读格式：[朝代] [作者] 的 [诗名]
    const introText = `${currentPoem.dynasty}代 ${currentPoem.author} 的 ${currentPoem.title}`
    this.speakText(introText, onComplete)
  },

  // 播放当前行
  playCurrentLine() {
    const { currentPoem, readingLine } = this.data
    if (!currentPoem || readingLine >= currentPoem.content.length) {
      // 本首诗完成
      this.completePoem()
      return
    }

    this.setData({ isPlaying: true })
    
    const line = currentPoem.content[readingLine]
    const pinyin = currentPoem.pinyin[readingLine]
    
    // 使用语音合成播放
    this.speakText(line, () => {
      this.setData({ isPlaying: false })
    })
  },

  // 语音合成（优先使用微信原生）
  speakText(text, onComplete) {
    if (!text) return
    
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false
    if (!soundEnabled) {
      onComplete && onComplete()
      return
    }

    console.log('开始语音合成:', text, 'createSpeechSynthesizer:', typeof wx.createSpeechSynthesizer)

    // 优先使用微信原生语音合成
    if (wx.createSpeechSynthesizer) {
      try {
        const synthesizer = wx.createSpeechSynthesizer()
        let hasCompleted = false
        
        console.log('创建语音合成器成功')
        
        synthesizer.speak({
          content: text,
          lang: 'zh_CN',
          success: (res) => {
            console.log('微信语音合成成功:', res)
            // 微信语音合成成功，根据返回的时长等待
            const duration = res?.duration || 2000
            setTimeout(() => {
              if (!hasCompleted) {
                hasCompleted = true
                onComplete && onComplete()
              }
            }, duration + 200)
          },
          fail: (err) => {
            console.error('微信语音合成失败:', err)
            if (!hasCompleted) {
              hasCompleted = true
              this.speakWithBaidu(text, onComplete)
            }
          }
        })
        
        // 设置超时保护
        setTimeout(() => {
          if (!hasCompleted) {
            console.log('语音合成超时')
            hasCompleted = true
            onComplete && onComplete()
          }
        }, 10000)
        
        return
      } catch (e) {
        console.error('语音合成异常:', e)
      }
    } else {
      console.log('wx.createSpeechSynthesizer 不可用')
    }
    
    // 降级到网络语音源
    console.log('降级到网络语音源')
    this.speakWithBaidu(text, onComplete)
  },

  // 语音合成（多源备用）
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
    let audioCtx = null
    
    const cleanup = () => {
      if (audioCtx) {
        audioCtx.destroy()
        audioCtx = null
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
      audioCtx = wx.createInnerAudioContext()
      const currentUrl = urls[currentUrlIndex++]
      
      audioCtx.onCanplay(() => {
        if (hasCompleted) return
        audioCtx.play()
      })
      
      audioCtx.onEnded(() => {
        if (hasCompleted) return
        hasCompleted = true
        cleanup()
        onComplete && onComplete()
      })
      
      audioCtx.onError((err) => {
        console.error('语音播放失败:', currentUrl, err)
        tryNextUrl()
      })
      
      // 设置超时，防止某些URL一直不触发回调
      setTimeout(() => {
        if (!hasCompleted) {
          tryNextUrl()
        }
      }, 5000)
      
      audioCtx.src = currentUrl
    }
    
    // 开始尝试第一个URL
    tryNextUrl()
  },

  // 停止播放
  stopAudio() {
    this.setData({ isPlaying: false })
  },

  // 重播当前行
  replayLine() {
    if (this.data.isPlaying) return
    this.playCurrentLine()
  },

  // 下一句
  nextLine() {
    if (this.data.isPlaying) return
    const { readingLine, currentPoem } = this.data
    if (readingLine < currentPoem.content.length - 1) {
      this.setData({ readingLine: readingLine + 1 }, () => {
        this.playCurrentLine()
      })
    } else {
      this.completePoem()
    }
  },

  // 上一句
  prevLine() {
    if (this.data.isPlaying) return
    const { readingLine } = this.data
    if (readingLine > 0) {
      this.setData({ readingLine: readingLine - 1 }, () => {
        this.playCurrentLine()
      })
    }
  },

  // 完成当前古诗
  completePoem() {
    const { currentPoem, completedPoems, poems, currentIndex } = this.data
    
    // 记录已掌握
    const masteredKey = 'mastered_poem'
    const mastered = wx.getStorageSync(masteredKey) || []
    if (!mastered.includes(currentPoem.id)) {
      mastered.push(currentPoem.id)
      wx.setStorageSync(masteredKey, mastered)
    }
    
    // 记录学习（每完成一首记录一次）
    this.recordStudy()

    const newCompleted = [...completedPoems, currentPoem]
    
    // 检查是否全部完成
    if (currentIndex >= poems.length - 1) {
      this.setData({
        completedPoems: newCompleted,
        showResult: true
      })
    } else {
      // 进入下一首
      this.setData({
        completedPoems: newCompleted,
        currentIndex: currentIndex + 1,
        currentPoem: poems[currentIndex + 1],
        stage: 'intro',
        readingLine: 0
      })
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
          this.recordMistake()
          wx.showToast({
            title: '已暂存',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
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

  // 返回主页
  goBack() {
    wx.navigateBack()
  },

  // 再玩一次
  restart() {
    const { poems } = this.data
    this.setData({
      currentIndex: 0,
      currentPoem: poems[0],
      stage: 'intro',
      readingLine: 0,
      completedPoems: [],
      showResult: false
    })
  },
})
