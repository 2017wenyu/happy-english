// pages/profile/profile.js
const wordsData = require('../../data/words')

Page({
  data: {
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
    // 设置密码
    showSetPwd: false,
    newPwd: '',
    confirmPwd: ''
  },

  onShow() {
    this.loadStats()
    this.setData({
      soundEnabled: wx.getStorageSync('soundEnabled') !== false
    })
  },

  loadStats() {
    const masteredWords = wx.getStorageSync('masteredWords') || []
    const wrongWords = wx.getStorageSync('wrongWords') || []
    const studyRecords = wx.getStorageSync('studyRecords') || []
    const today = new Date().toLocaleDateString('zh-CN')
    const todayRecord = studyRecords.find(r => r.date === today)

    // 各级别统计
    const levelStats = ['level1','level2','level3','level4','level5'].map(lv => {
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

    this.setData({
      totalMastered: masteredWords.length,
      totalMasteredPct: Math.round(masteredWords.length / 220 * 100),
      wrongCount: wrongWords.length,
      todayCount: todayRecord ? todayRecord.count : 0,
      totalStudyDays: studyRecords.filter(r => r.count > 0).length,
      levelStats
    })
  },

  // 切换音效
  toggleSound() {
    const newVal = !this.data.soundEnabled
    this.setData({ soundEnabled: newVal })
    wx.setStorageSync('soundEnabled', newVal)
    wx.showToast({ title: newVal ? '已开启音效' : '已关闭音效', icon: 'none' })
  },

  // 打开家长模式入口
  openParentEntry() {
    const pwd = wx.getStorageSync('parentPassword')
    if (!pwd) {
      // 尚未设置密码，引导设置
      this.setData({ showSetPwd: true, showParentInput: false })
    } else {
      this.setData({ showParentInput: true, parentPwdInput: '', parentPwdError: '' })
    }
  },

  // 关闭家长输入
  closeParentInput() {
    this.setData({ showParentInput: false, parentPwdInput: '', parentPwdError: '' })
  },

  // 密码输入
  onPwdInput(e) {
    this.setData({ parentPwdInput: e.detail.value })
  },

  // 验证密码
  verifyParent() {
    const storedPwd = wx.getStorageSync('parentPassword')
    if (this.data.parentPwdInput === storedPwd) {
      this.setData({ parentMode: true, showParentInput: false, parentPwdError: '' })
      wx.showToast({ title: '家长模式已开启', icon: 'success' })
    } else {
      this.setData({ parentPwdError: '密码错误，请重试' })
    }
  },

  // 退出家长模式
  exitParentMode() {
    this.setData({ parentMode: false })
  },

  // 新密码输入
  onNewPwdInput(e) { this.setData({ newPwd: e.detail.value }) },
  onConfirmPwdInput(e) { this.setData({ confirmPwd: e.detail.value }) },

  // 保存密码
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

  // 重置学习记录（家长模式）
  resetStudyRecords() {
    wx.showModal({
      title: '确认重置',
      content: '将清空所有学习记录，但保留单词掌握状态。',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('studyRecords', [])
          this.loadStats()
          wx.showToast({ title: '学习记录已重置', icon: 'success' })
        }
      }
    })
  },

  // 清空掌握状态（家长模式）
  resetAllProgress() {
    wx.showModal({
      title: '⚠️ 确认清空',
      content: '将清空所有掌握记录和错题本，从零开始。此操作不可恢复！',
      confirmText: '确认清空',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('masteredWords', [])
          wx.setStorageSync('wrongWords', [])
          wx.setStorageSync('studyRecords', [])
          this.loadStats()
          wx.showToast({ title: '已重置全部数据', icon: 'success' })
        }
      }
    })
  },

  // 修改密码
  changePwd() {
    this.setData({ showSetPwd: true })
  }
})
