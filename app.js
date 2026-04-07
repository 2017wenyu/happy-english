// app.js
App({
  onLaunch() {
    // 音频设置：不受静音开关影响，走扬声器播放
    wx.setInnerAudioOption({ obeyMuteSwitch: false, speakerOn: true })

    // 初始化本地存储默认值
    // 英语相关
    if (!wx.getStorageSync('masteredWords')) {
      wx.setStorageSync('masteredWords', [])
    }
    if (!wx.getStorageSync('wrongWords')) {
      wx.setStorageSync('wrongWords', [])
    }
    if (!wx.getStorageSync('studyRecords')) {
      wx.setStorageSync('studyRecords', [])
    }
    // 汉字学习相关
    if (!wx.getStorageSync('masteredWords_chinese')) {
      wx.setStorageSync('masteredWords_chinese', [])
    }
    if (!wx.getStorageSync('wrongWords_chinese')) {
      wx.setStorageSync('wrongWords_chinese', [])
    }
    if (!wx.getStorageSync('studyRecords_chinese')) {
      wx.setStorageSync('studyRecords_chinese', [])
    }
    // 音效设置
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
