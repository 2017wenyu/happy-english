// pages/word_list/word_list.js
// 通用词汇列表页：支持 poem / english / chinese 三种科目
// 参数：subject, filter(all|mastered|unmastered), grade, term, level

const poemsData = require('../../data/poems')
const chineseData = require('../../data/chinese_words')
const wordsData = require('../../data/words')

Page({
  data: {
    subject: 'poem',
    filter: 'all',       // all | mastered | unmastered
    grade: '',
    term: '',
    level: '',
    author: '',          // 按作者筛选（用于诗人馆跳转）
    title: '',
    list: [],
    isEmpty: false,
    totalCount: 0,
  },

  onLoad(options) {
    const subject = options.subject || 'poem'
    const filter = options.filter || 'all'
    const grade = options.grade || 'grade1'
    const term = options.term || 'term1'
    const level = options.level || ''
    const author = options.author ? decodeURIComponent(options.author) : ''

    this.setData({ subject, filter, grade, term, level, author }, () => {
      this._buildTitle()
      this._loadList()
    })
  },

  onShow() {
    this._loadList()
  },

  _buildTitle() {
    const { subject, filter, author } = this.data
    const filterLabel = filter === 'mastered' ? '已掌握' : filter === 'unmastered' ? '未掌握' : '全部'
    const subjectLabel = { poem: '古诗', english: '单词', chinese: '生字' }[subject] || ''
    const title = author ? `${author}的诗词` : `${filterLabel}${subjectLabel}`
    this.setData({ title })
    wx.setNavigationBarTitle({ title })
  },

  _loadList() {
    const { subject, filter, grade, term, level, author } = this.data

    if (subject === 'poem') {
      this._loadPoems(filter, grade, term, author)
    } else if (subject === 'chinese') {
      this._loadChinese(filter, grade, term)
    } else if (subject === 'english') {
      this._loadEnglish(filter, level)
    }
  },

  _loadPoems(filter, grade, term, author) {
    let poems
    if (author) {
      // 按作者筛选：从所有诗词中找
      poems = poemsData.getAllPoems().filter(p => p.author === author)
    } else {
      poems = poemsData.getPoems(grade, term)
    }
    const masteredIds = wx.getStorageSync('mastered_poem') || []

    let list = poems.map(p => ({
      ...p,
      isMastered: masteredIds.includes(p.id),
      // 诗句预览（取前两句）
      preview: Array.isArray(p.content) ? p.content.slice(0, 2).join(' ') : '',
    }))

    if (filter === 'mastered') {
      list = list.filter(p => p.isMastered)
    } else if (filter === 'unmastered') {
      list = list.filter(p => !p.isMastered)
    }

    this.setData({ list, totalCount: list.length, isEmpty: list.length === 0 })
  },

  _loadChinese(filter, grade, term) {
    const words = chineseData.getWords(grade, term)
    const masteredIds = wx.getStorageSync('masteredWords_chinese') || []

    let list = words.map(w => ({
      ...w,
      isMastered: masteredIds.includes(w.id),
    }))

    if (filter === 'mastered') {
      list = list.filter(w => w.isMastered)
    } else if (filter === 'unmastered') {
      list = list.filter(w => !w.isMastered)
    }

    this.setData({ list, totalCount: list.length, isEmpty: list.length === 0 })
  },

  _loadEnglish(filter, level) {
    const masteredIds = wx.getStorageSync('masteredWords') || []

    let words = level
      ? wordsData.wordList.filter(w => w.level === level)
      : wordsData.wordList

    let list = words.map(w => ({
      ...w,
      isMastered: masteredIds.includes(w.id),
      levelColor: wordsData.levelColor[w.level] || '#888',
      levelName: wordsData.levelName[w.level] || '',
    }))

    if (filter === 'mastered') {
      list = list.filter(w => w.isMastered)
    } else if (filter === 'unmastered') {
      list = list.filter(w => !w.isMastered)
    }

    this.setData({ list, totalCount: list.length, isEmpty: list.length === 0 })
  },

  // 切换掌握状态
  toggleMastered(e) {
    const { subject } = this.data
    const id = e.currentTarget.dataset.id
    const isMastered = e.currentTarget.dataset.mastered === true || e.currentTarget.dataset.mastered === 'true'

    if (subject === 'poem') {
      const key = 'mastered_poem'
      let arr = wx.getStorageSync(key) || []
      if (isMastered) {
        arr = arr.filter(x => x !== id)
      } else {
        if (!arr.includes(id)) arr.push(id)
      }
      wx.setStorageSync(key, arr)
    } else if (subject === 'chinese') {
      const key = 'masteredWords_chinese'
      let arr = wx.getStorageSync(key) || []
      if (isMastered) {
        arr = arr.filter(x => x !== id)
      } else {
        if (!arr.includes(id)) arr.push(id)
      }
      wx.setStorageSync(key, arr)
    } else if (subject === 'english') {
      const key = 'masteredWords'
      let arr = wx.getStorageSync(key) || []
      if (isMastered) {
        arr = arr.filter(x => x !== id)
      } else {
        if (!arr.includes(id)) arr.push(id)
      }
      wx.setStorageSync(key, arr)
    }

    wx.showToast({ title: isMastered ? '已取消掌握' : '标记为已掌握 ✓', icon: 'none', duration: 1000 })
    this._loadList()
  },

  goBack() {
    wx.navigateBack()
  },

  // 跳转到古诗详情/学习页面
  goPoemDetail(e) {
    const { subject, author } = this.data
    const id = e.currentTarget.dataset.id

    if (subject === 'poem') {
      // 跳转到古诗跟读页面，传入诗词ID
      wx.navigateTo({
        url: `/pages/poem_read/poem_read?poemId=${id}`
      })
    }
  }
})
