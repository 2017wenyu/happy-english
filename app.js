// app.js
App({
  onLaunch() {
    // 初始化本地存储默认值
    if (!wx.getStorageSync('masteredWords')) {
      wx.setStorageSync('masteredWords', [])
    }
    if (!wx.getStorageSync('wrongWords')) {
      wx.setStorageSync('wrongWords', [])
    }
    if (!wx.getStorageSync('studyRecords')) {
      wx.setStorageSync('studyRecords', [])
    }
    if (!wx.getStorageSync('soundEnabled')) {
      wx.setStorageSync('soundEnabled', true)
    }
    // 记录今日学习
    this.updateTodayRecord()
  },

  updateTodayRecord() {
    const today = new Date().toLocaleDateString('zh-CN')
    const records = wx.getStorageSync('studyRecords') || []
    if (!records.find(r => r.date === today)) {
      records.push({ date: today, count: 0 })
      wx.setStorageSync('studyRecords', records)
    }
  },

  // 全局方法：增加今日学习计数
  addStudyCount(n = 1) {
    const today = new Date().toLocaleDateString('zh-CN')
    const records = wx.getStorageSync('studyRecords') || []
    const idx = records.findIndex(r => r.date === today)
    if (idx >= 0) {
      records[idx].count += n
    } else {
      records.push({ date: today, count: n })
    }
    wx.setStorageSync('studyRecords', records)
  },

  globalData: {}
})
