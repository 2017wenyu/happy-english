// pages/chinese/chinese.js
const { GRADES, TERMS, getWords, getWordCount } = require('../../data/chinese_words')

Page({
  data: {
    grades: GRADES,
    terms: TERMS,
    selectedGrade: 'grade1',
    selectedTerm: 'term1',
    wordCount: 0,
    masteredCount: 0,
    masteredPct: 0,
    modes: [
      {
        key: 'pinyin_to_word',
        title: '看拼音选汉字',
        desc: '看拼音，选出正确的汉字',
        emoji: '🔍',
        color: '#4876FF',
        gradient: 'linear-gradient(135deg, #4876FF, #722ED1)',
      },
      {
        key: 'word_to_pinyin',
        title: '看汉字选拼音',
        desc: '看汉字，选出正确的拼音',
        emoji: '🎵',
        color: '#13C2C2',
        gradient: 'linear-gradient(135deg, #13C2C2, #36CFC9)',
      },
      {
        key: 'dictation',
        title: '听写默写',
        desc: '听拼音和组词，写出汉字',
        emoji: '✍️',
        color: '#52C41A',
        gradient: 'linear-gradient(135deg, #52C41A, #95DE64)',
      },
      {
        key: 'compose',
        title: '组词填空',
        desc: '根据生字完成词语填空',
        emoji: '🧩',
        color: '#FA8C16',
        gradient: 'linear-gradient(135deg, #FA8C16, #FFC53D)',
      },
    ]
  },

  onLoad() {
    this._refreshStats()
  },

  onShow() {
    this._refreshStats()
  },

  _refreshStats() {
    const { selectedGrade, selectedTerm } = this.data
    const words = getWords(selectedGrade, selectedTerm)
    // 使用统一的 masteredWords_chinese key，与 profile 和其他页面保持一致
    const masteredKey = 'masteredWords_chinese'
    const allMastered = wx.getStorageSync(masteredKey) || []
    // 只统计当前年级学期范围内的已掌握汉字
    const wordIds = words.map(w => w.id)
    const mastered = allMastered.filter(id => wordIds.includes(id))
    const wCount = words.length
    const mCount = mastered.length
    const pct = wCount > 0 ? Math.round(mCount * 100 / wCount) : 0
    this.setData({
      wordCount: wCount,
      masteredCount: mCount,
      masteredPct: pct
    })
    wx.setNavigationBarTitle({ title: '汉字生字词' })
  },

  selectGrade(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ selectedGrade: key }, () => this._refreshStats())
  },

  selectTerm(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ selectedTerm: key }, () => this._refreshStats())
  },

  startMode(e) {
    const mode = e.currentTarget.dataset.mode
    const { selectedGrade, selectedTerm, wordCount } = this.data
    if (wordCount === 0) {
      wx.showToast({ title: '暂无生字数据', icon: 'none' })
      return
    }
    const url = mode === 'dictation'
      ? `/pages/chinese_dictation/chinese_dictation?grade=${selectedGrade}&term=${selectedTerm}`
      : mode === 'compose'
        ? `/pages/chinese_compose/chinese_compose?grade=${selectedGrade}&term=${selectedTerm}`
        : `/pages/chinese_quiz/chinese_quiz?grade=${selectedGrade}&term=${selectedTerm}&mode=${mode}`
    wx.navigateTo({ url })
  },

  goMistakes() {
    wx.navigateTo({ url: '/pages/mistakes/mistakes?subject=chinese' })
  },

  goAllReview() {
    const { selectedGrade, selectedTerm, wordCount } = this.data
    if (wordCount === 0) {
      wx.showToast({ title: '暂无生字数据', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: `/pages/chinese_quiz/chinese_quiz?grade=${selectedGrade}&term=${selectedTerm}&mode=pinyin_to_word&all=1`
    })
  }
})
