// pages/classic_poems/classic_poems.js
// 经典拓展诗词页面

const classicData = require('../../data/classic_poems')

Page({
  data: {
    poets: [],
    filteredPoets: [],
    dynastyFilter: 'all',
    dynasties: [
      { key: 'all', name: '全部' },
      { key: '唐', name: '唐' },
      { key: '宋', name: '宋' },
      { key: '元', name: '元' },
    ],
    stats: null,
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '经典拓展' })
    
    // 获取诗人列表，并计算每个诗人的作品数量
    const allPoems = classicData.getAllClassicPoems()
    const poets = classicData.getAllClassicPoets().map(poet => {
      const workCount = allPoems.filter(p => p.author === poet.name).length
      return { ...poet, workCount }
    })
    
    const stats = classicData.getClassicStats()
    
    this.setData({ 
      poets, 
      filteredPoets: poets,
      stats 
    })
  },

  // 朝代筛选
  filterByDynasty(e) {
    const dynasty = e.currentTarget.dataset.dynasty
    const { poets } = this.data
    const filteredPoets = dynasty === 'all' 
      ? poets 
      : poets.filter(p => p.dynasty === dynasty)
    this.setData({ dynastyFilter: dynasty, filteredPoets })
  },

  // 跳转到诗人诗词列表
  goPoetPoems(e) {
    const id = e.currentTarget.dataset.id
    const poet = classicData.getClassicPoetById(id)
    if (poet) {
      wx.navigateTo({
        url: `/pages/classic_poem_list/classic_poem_list?poetId=${id}&poetName=${encodeURIComponent(poet.name)}`
      })
    }
  },

  // 返回
  goBack() {
    wx.navigateBack()
  },
})
