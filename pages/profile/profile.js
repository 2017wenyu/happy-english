// pages/profile/profile.js
const wordsData = require('../../data/words')
const chineseData = require('../../data/chinese_words')
const poemsData = require('../../data/poems')

// 各学科配置
const SUBJECT_CONFIG = {
  english: {
    title: '英语学习',
    icon: '🔤',
    color: '#4876FF',
    gradient: 'linear-gradient(135deg, #4876FF, #722ED1)',
    totalLabel: '已掌握单词',
    totalCount: 220,
    masteredKey: 'masteredWords',
    wrongKey: 'wrongWords',
    studyKey: 'studyRecords',
    hasLevelStats: true
  },
  chinese: {
    title: '汉字学习',
    icon: '📖',
    color: '#FF4D4F',
    gradient: 'linear-gradient(135deg, #FF7875, #FF4D4F)',
    totalLabel: '已掌握汉字',
    totalCount: 0,
    masteredKey: 'masteredWords_chinese',
    wrongKey: 'wrongWords_chinese',
    studyKey: 'studyRecords_chinese',
    hasLevelStats: false
  },
  poem: {
    title: '古诗学习',
    icon: '📜',
    color: '#722ED1',
    gradient: 'linear-gradient(135deg, #9254DE, #722ED1)',
    totalLabel: '已掌握古诗',
    totalCount: 0,
    masteredKey: 'mastered_poem',
    wrongKey: 'wrongWords_poem',
    studyKey: 'studyRecords_poem',
    hasLevelStats: false
  },
  idiom: {
    title: '成语学习',
    icon: '🏮',
    color: '#FA8C16',
    gradient: 'linear-gradient(135deg, #FA8C16, #FFA940)',
    totalLabel: '已掌握成语',
    totalCount: 0,
    masteredKey: 'masteredWords_idiom',
    wrongKey: 'wrongWords_idiom',
    studyKey: 'studyRecords_idiom',
    hasLevelStats: false
  }
}

const SUBJECT_TABS = [
  { key: 'english', label: '英语' },
  { key: 'chinese', label: '汉字' },
  { key: 'poem', label: '古诗' },
  { key: 'idiom', label: '成语' }
]

Page({
  data: {
    subject: 'english',
    subjectConfig: SUBJECT_CONFIG.english,
    subjectTabs: SUBJECT_TABS,
    // 统计数据
    totalMastered: 0,
    totalMasteredPct: 0,
    totalWords: 220,
    wrongCount: 0,
    todayCount: 0,
    totalStudyDays: 0,
    levelStats: [],
    // 家长模式
    parentMode: false,
    showParentInput: false,
    parentPwdInput: '',
    parentPwdError: '',
    soundEnabled: true,
    showSetPwd: false,
    newPwd: '',
    confirmPwd: ''
  },

  onLoad(options) {
    const subject = options.subject || 'english'
    const subjectConfig = SUBJECT_CONFIG[subject] || SUBJECT_CONFIG.english
    this.setData({ subject, subjectConfig })
  },

  onShow() {
    this.loadStats()
    this.setData({
      soundEnabled: wx.getStorageSync('soundEnabled') !== false
    })
  },

  // 切换学科 Tab
  switchSubject(e) {
    const subject = e.currentTarget.dataset.subject
    const subjectConfig = SUBJECT_CONFIG[subject] || SUBJECT_CONFIG.english
    this.setData({ subject, subjectConfig })
    this.loadStats()
  },

  loadStats() {
    const { subject, subjectConfig } = this.data
    const masteredWords = wx.getStorageSync(subjectConfig.masteredKey) || []
    const wrongWords = wx.getStorageSync(subjectConfig.wrongKey) || []
    const studyRecords = wx.getStorageSync(subjectConfig.studyKey) || []
    const today = new Date().toLocaleDateString('zh-CN')
    const todayRecord = studyRecords.find(r => r.date === today)

    let levelStats = []
    let totalWords = subjectConfig.totalCount

    if (subject === 'english' && subjectConfig.hasLevelStats) {
      levelStats = ['level1', 'level2', 'level3', 'level4', 'level5'].map(lv => {
        const words = wordsData.wordList.filter(w => w.level === lv)
        const mastered = words.filter(w => masteredWords.includes(w.id)).length
        return {
          key: lv,
          name: wordsData.levelName[lv],
          emoji: wordsData.levelEmoji[lv],
          color: wordsData.levelColor[lv],
          total: words.length,
          mastered,
          progress: words.length > 0 ? Math.round(mastered / words.length * 100) : 0
        }
      })
      totalWords = 220
    } else if (subject === 'chinese') {
      // 计算汉字总字数
      totalWords = chineseData.getTotalWordsCount()
    } else if (subject === 'poem') {
      // 计算古诗总数
      totalWords = poemsData.getTotalPoemCount()
    }

    const totalMasteredPct = totalWords > 0
      ? Math.round(masteredWords.length / totalWords * 100)
      : 0

    this.setData({
      totalMastered: masteredWords.length,
      totalMasteredPct,
      totalWords,
      wrongCount: wrongWords.length,
      todayCount: todayRecord ? todayRecord.count : 0,
      totalStudyDays: studyRecords.filter(r => r.count > 0).length,
      levelStats
    })
  },

  // 跳转到错题本
  goMistakes() {
    wx.navigateTo({ url: `/pages/mistakes/mistakes?subject=${this.data.subject}` })
  },

  // 切换音效
  toggleSound() {
    const newVal = !this.data.soundEnabled
    this.setData({ soundEnabled: newVal })
    wx.setStorageSync('soundEnabled', newVal)
    wx.showToast({ title: newVal ? '已开启音效' : '已关闭音效', icon: 'none' })
  },

  // 打开家长模式
  openParentEntry() {
    const pwd = wx.getStorageSync('parentPassword')
    if (!pwd) {
      this.setData({ showSetPwd: true, showParentInput: false })
    } else {
      this.setData({ showParentInput: true, parentPwdInput: '', parentPwdError: '' })
    }
  },

  closeParentInput() {
    this.setData({ showParentInput: false, parentPwdInput: '', parentPwdError: '' })
  },

  onPwdInput(e) {
    this.setData({ parentPwdInput: e.detail.value })
  },

  verifyParent() {
    const storedPwd = wx.getStorageSync('parentPassword')
    if (this.data.parentPwdInput === storedPwd) {
      this.setData({ parentMode: true, showParentInput: false, parentPwdError: '' })
      wx.showToast({ title: '家长模式已开启', icon: 'success' })
    } else {
      this.setData({ parentPwdError: '密码错误，请重试' })
    }
  },

  exitParentMode() {
    this.setData({ parentMode: false })
  },

  onNewPwdInput(e) { this.setData({ newPwd: e.detail.value }) },
  onConfirmPwdInput(e) { this.setData({ confirmPwd: e.detail.value }) },

  savePwd() {
    const { newPwd, confirmPwd } = this.data
    if (!newPwd || newPwd.length < 4) {
      wx.showToast({ title: '密码至少4位数字', icon: 'none' }); return
    }
    if (newPwd !== confirmPwd) {
      wx.showToast({ title: '两次输入不一致', icon: 'none' }); return
    }
    wx.setStorageSync('parentPassword', newPwd)
    this.setData({ showSetPwd: false, newPwd: '', confirmPwd: '', parentMode: true })
    wx.showToast({ title: '密码设置成功，已进入家长模式', icon: 'success' })
  },

  cancelSetPwd() {
    this.setData({ showSetPwd: false, newPwd: '', confirmPwd: '' })
  },

  resetStudyRecords() {
    wx.showModal({
      title: '确认重置',
      content: `将清空【${this.data.subjectConfig.title}】的学习记录，但保留掌握状态。`,
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync(this.data.subjectConfig.studyKey, [])
          this.loadStats()
          wx.showToast({ title: '学习记录已重置', icon: 'success' })
        }
      }
    })
  },

  resetAllProgress() {
    wx.showModal({
      title: '⚠️ 确认清空',
      content: `将清空【${this.data.subjectConfig.title}】的所有掌握记录和错题本，此操作不可恢复！`,
      confirmText: '确认清空',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          const { subjectConfig } = this.data
          wx.setStorageSync(subjectConfig.masteredKey, [])
          wx.setStorageSync(subjectConfig.wrongKey, [])
          wx.setStorageSync(subjectConfig.studyKey, [])
          this.loadStats()
          wx.showToast({ title: '已重置全部数据', icon: 'success' })
        }
      }
    })
  },

  changePwd() {
    this.setData({ showSetPwd: true })
  }
})
