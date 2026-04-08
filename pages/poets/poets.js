// pages/poets/poets.js
const poetsData = require('../../data/poets')
const poemsData = require('../../data/poems')

Page({
  data: {
    poets: [],
    filteredPoets: [],
    dynastyFilter: 'all',
    dynasties: [
      { key: 'all', name: '全部' },
      { key: '唐', name: '唐' },
      { key: '宋', name: '宋' },
      { key: '汉', name: '汉' },
      { key: '魏', name: '魏' },
      { key: '晋', name: '晋' },
      { key: '元', name: '元' },
      { key: '明', name: '明' },
      { key: '清', name: '清' },
      { key: '现代', name: '现代' },
      { key: '当代', name: '当代' },
    ],
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '诗人馆' })
    // 获取所有诗词，计算每个诗人的实际作品数量
    const allPoems = poemsData.getAllPoems()
    const poets = poetsData.POETS.map(poet => {
      const workCount = allPoems.filter(p => p.author === poet.name).length
      return { ...poet, workCount }
    })
    this.setData({ poets, filteredPoets: poets })
  },

  // 朝代筛选
  filterByDynasty(e) {
    const dynasty = e.currentTarget.dataset.dynasty
    const { poets } = this.data
    const filteredPoets = dynasty === 'all' ? poets : poets.filter(p => p.dynasty === dynasty)
    this.setData({ dynastyFilter: dynasty, filteredPoets })
  },

  // 跳转到诗人详情
  goPoetDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/poet_detail/poet_detail?id=${id}` })
  },
})
