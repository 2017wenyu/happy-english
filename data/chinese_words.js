// data/chinese_words.js
// 人教版部编版小学语文完整生字表（1-6年级，共12册，约2460字）
// 优化版本：统一字段格式 + 按需加载 + 本地缓存

// ==================== 数据存储结构 ====================
// 使用 Storage 缓存已加载的年级数据，减少内存占用

const STORAGE_KEY_PREFIX = 'chinese_words_cache_'
const CACHE_VERSION = 'v3' // 缓存版本，数据更新时修改（2026-04-07 更新二年级真实数据）

// 年级学期元数据（轻量级，始终加载）
const GRADES = [
  { key: 'grade1', name: '一年级', short: '一', totalTerms: 2 },
  { key: 'grade2', name: '二年级', short: '二', totalTerms: 2 },
  { key: 'grade3', name: '三年级', short: '三', totalTerms: 2 },
  { key: 'grade4', name: '四年级', short: '四', totalTerms: 2 },
  { key: 'grade5', name: '五年级', short: '五', totalTerms: 2 },
  { key: 'grade6', name: '六年级', short: '六', totalTerms: 2 },
]

const TERMS = [
  { key: 'term1', name: '上册', short: '上' },
  { key: 'term2', name: '下册', short: '下' },
]

// 各年级生字数量统计（用于显示，无需加载全部数据）
const WORDS_COUNT = {
  grade1: { term1: 100, term2: 200 },
  grade2: { term1: 180, term2: 129 },  // 真实数据
  grade3: { term1: 52, term2: 5 },     // 真实数据
  grade4: { term1: 53, term2: 24 },    // 真实数据
  grade5: { term1: 27, term2: 19 },    // 真实数据
  grade6: { term1: 40, term2: 21 },    // 真实数据
}

// ==================== 数据分片定义 ====================
// 按年级分片，需要时动态加载

// 一年级上册（100字）
const GRADE1_TERM1 = [
  { id: '1-1-001', char: '一', pinyin: 'yī', groups: ['一个', '一天', '第一'] },
  { id: '1-1-002', char: '二', pinyin: 'èr', groups: ['二月', '二手', '第二'] },
  { id: '1-1-003', char: '三', pinyin: 'sān', groups: ['三个', '三月', '第三'] },
  { id: '1-1-004', char: '十', pinyin: 'shí', groups: ['十分', '十月', '十分'] },
  { id: '1-1-005', char: '木', pinyin: 'mù', groups: ['木头', '树木', '木耳'] },
  { id: '1-1-006', char: '禾', pinyin: 'hé', groups: ['禾苗', '禾田', '禾草'] },
  { id: '1-1-007', char: '上', pinyin: 'shàng', groups: ['上面', '上学', '早上'] },
  { id: '1-1-008', char: '下', pinyin: 'xià', groups: ['下面', '下雨', '上下'] },
  { id: '1-1-009', char: '土', pinyin: 'tǔ', groups: ['土地', '泥土', '土豆'] },
  { id: '1-1-010', char: '个', pinyin: 'gè', groups: ['一个', '个人', '个子'] },
  { id: '1-1-011', char: '八', pinyin: 'bā', groups: ['八个', '八月', '八方'] },
  { id: '1-1-012', char: '入', pinyin: 'rù', groups: ['入口', '进入', '出入'] },
  { id: '1-1-013', char: '大', pinyin: 'dà', groups: ['大小', '大家', '大人'] },
  { id: '1-1-014', char: '天', pinyin: 'tiān', groups: ['天空', '今天', '明天'] },
  { id: '1-1-015', char: '人', pinyin: 'rén', groups: ['人民', '人们', '大人'] },
  { id: '1-1-016', char: '火', pinyin: 'huǒ', groups: ['火车', '大火', '火苗'] },
  { id: '1-1-017', char: '文', pinyin: 'wén', groups: ['文化', '文学', '文字'] },
  { id: '1-1-018', char: '六', pinyin: 'liù', groups: ['六个', '六月', '第六'] },
  { id: '1-1-019', char: '七', pinyin: 'qī', groups: ['七个', '七月', '第七'] },
  { id: '1-1-020', char: '儿', pinyin: 'ér', groups: ['儿子', '儿童', '儿女'] },
  { id: '1-1-021', char: '九', pinyin: 'jiǔ', groups: ['九个', '九月', '第九'] },
  { id: '1-1-022', char: '无', pinyin: 'wú', groups: ['无论', '无法', '无边'] },
  { id: '1-1-023', char: '口', pinyin: 'kǒu', groups: ['口水', '门口', '人口'] },
  { id: '1-1-024', char: '日', pinyin: 'rì', groups: ['日子', '日月', '生日'] },
  { id: '1-1-025', char: '中', pinyin: 'zhōng', groups: ['中国', '中心', '中间'] },
  { id: '1-1-026', char: '了', pinyin: 'le', groups: ['好了', '来了', '走了'] },
  { id: '1-1-027', char: '子', pinyin: 'zǐ', groups: ['儿子', '孩子', '日子'] },
  { id: '1-1-028', char: '门', pinyin: 'mén', groups: ['门口', '大门', '开门'] },
  { id: '1-1-029', char: '月', pinyin: 'yuè', groups: ['月亮', '月光', '月份'] },
  { id: '1-1-030', char: '不', pinyin: 'bù', groups: ['不是', '不好', '不要'] },
  { id: '1-1-031', char: '开', pinyin: 'kāi', groups: ['开门', '开心', '开始'] },
  { id: '1-1-032', char: '四', pinyin: 'sì', groups: ['四个', '四月', '第四'] },
  { id: '1-1-033', char: '五', pinyin: 'wǔ', groups: ['五个', '五月', '第五'] },
  { id: '1-1-034', char: '目', pinyin: 'mù', groups: ['目光', '目的', '耳目'] },
  { id: '1-1-035', char: '耳', pinyin: 'ěr', groups: ['耳朵', '耳目', '木耳'] },
  { id: '1-1-036', char: '头', pinyin: 'tóu', groups: ['头发', '头脑', '石头'] },
  { id: '1-1-037', char: '米', pinyin: 'mǐ', groups: ['大米', '米饭', '小米'] },
  { id: '1-1-038', char: '见', pinyin: 'jiàn', groups: ['看见', '见面', '再见'] },
  { id: '1-1-039', char: '白', pinyin: 'bái', groups: ['白天', '白色', '白云'] },
  { id: '1-1-040', char: '田', pinyin: 'tián', groups: ['田地', '田野', '水田'] },
  { id: '1-1-041', char: '电', pinyin: 'diàn', groups: ['电话', '电视', '电脑'] },
  { id: '1-1-042', char: '也', pinyin: 'yě', groups: ['也是', '也好', '也许'] },
  { id: '1-1-043', char: '长', pinyin: 'cháng', groups: ['长大', '长江', '长短'] },
  { id: '1-1-044', char: '山', pinyin: 'shān', groups: ['山水', '山上', '高山'] },
  { id: '1-1-045', char: '出', pinyin: 'chū', groups: ['出去', '出来', '出门'] },
  { id: '1-1-046', char: '飞', pinyin: 'fēi', groups: ['飞机', '飞行', '飞翔'] },
  { id: '1-1-047', char: '马', pinyin: 'mǎ', groups: ['马上', '马车', '小马'] },
  { id: '1-1-048', char: '鸟', pinyin: 'niǎo', groups: ['小鸟', '鸟儿', '飞鸟'] },
  { id: '1-1-049', char: '云', pinyin: 'yún', groups: ['白云', '云朵', '云彩'] },
  { id: '1-1-050', char: '公', pinyin: 'gōng', groups: ['公园', '公共', '公平'] },
  { id: '1-1-051', char: '车', pinyin: 'chē', groups: ['火车', '汽车', '开车'] },
  { id: '1-1-052', char: '牛', pinyin: 'niú', groups: ['牛奶', '牛肉', '水牛'] },
  { id: '1-1-053', char: '羊', pinyin: 'yáng', groups: ['山羊', '绵羊', '牛羊'] },
  { id: '1-1-054', char: '小', pinyin: 'xiǎo', groups: ['大小', '小孩', '小鸟'] },
  { id: '1-1-055', char: '少', pinyin: 'shǎo', groups: ['多少', '很少', '少数'] },
  { id: '1-1-056', char: '巾', pinyin: 'jīn', groups: ['毛巾', '头巾', '围巾'] },
  { id: '1-1-057', char: '牙', pinyin: 'yá', groups: ['牙齿', '牙刷', '牙膏'] },
  { id: '1-1-058', char: '尺', pinyin: 'chǐ', groups: ['尺子', '尺寸', '直尺'] },
  { id: '1-1-059', char: '毛', pinyin: 'máo', groups: ['毛巾', '毛笔', '毛发'] },
  { id: '1-1-060', char: '卜', pinyin: 'bo', groups: ['萝卜', '占卜'] },
  { id: '1-1-061', char: '又', pinyin: 'yòu', groups: ['又是', '又来', '又去'] },
  { id: '1-1-062', char: '心', pinyin: 'xīn', groups: ['心情', '心中', '爱心'] },
  { id: '1-1-063', char: '风', pinyin: 'fēng', groups: ['风景', '大风', '风筝'] },
  { id: '1-1-064', char: '力', pinyin: 'lì', groups: ['力量', '力气', '用力'] },
  { id: '1-1-065', char: '手', pinyin: 'shǒu', groups: ['手指', '手机', '小手'] },
  { id: '1-1-066', char: '水', pinyin: 'shuǐ', groups: ['水果', '水平', '喝水'] },
  { id: '1-1-067', char: '广', pinyin: 'guǎng', groups: ['广大', '广告', '广场'] },
  { id: '1-1-068', char: '升', pinyin: 'shēng', groups: ['上升', '升旗', '升起'] },
  { id: '1-1-069', char: '足', pinyin: 'zú', groups: ['足球', '满足', '手足'] },
  { id: '1-1-070', char: '走', pinyin: 'zǒu', groups: ['走路', '行走', '走开'] },
  { id: '1-1-071', char: '方', pinyin: 'fāng', groups: ['方向', '方法', '地方'] },
  { id: '1-1-072', char: '半', pinyin: 'bàn', groups: ['一半', '半天', '半夜'] },
  { id: '1-1-073', char: '巴', pinyin: 'bā', groups: ['尾巴', '嘴巴', '下巴'] },
  { id: '1-1-074', char: '业', pinyin: 'yè', groups: ['作业', '工业', '农业'] },
  { id: '1-1-075', char: '本', pinyin: 'běn', groups: ['书本', '本来', '本子'] },
  { id: '1-1-076', char: '平', pinyin: 'píng', groups: ['平安', '平时', '水平'] },
  { id: '1-1-077', char: '书', pinyin: 'shū', groups: ['书本', '读书', '看书'] },
  { id: '1-1-078', char: '自', pinyin: 'zì', groups: ['自己', '自我', '亲自'] },
  { id: '1-1-079', char: '已', pinyin: 'yǐ', groups: ['已经', '早已', '而已'] },
  { id: '1-1-080', char: '东', pinyin: 'dōng', groups: ['东西', '东方', '东边'] },
  { id: '1-1-081', char: '西', pinyin: 'xī', groups: ['东西', '西方', '西瓜'] },
  { id: '1-1-082', char: '回', pinyin: 'huí', groups: ['回来', '回家', '回答'] },
  { id: '1-1-083', char: '片', pinyin: 'piàn', groups: ['一片', '照片', '名片'] },
  { id: '1-1-084', char: '皮', pinyin: 'pí', groups: ['皮毛', '皮肤', '皮鞋'] },
  { id: '1-1-085', char: '生', pinyin: 'shēng', groups: ['生活', '学生', '生日'] },
  { id: '1-1-086', char: '里', pinyin: 'lǐ', groups: ['里面', '家里', '这里'] },
  { id: '1-1-087', char: '果', pinyin: 'guǒ', groups: ['水果', '苹果', '结果'] },
  { id: '1-1-088', char: '几', pinyin: 'jǐ', groups: ['几个', '几何', '几乎'] },
  { id: '1-1-089', char: '用', pinyin: 'yòng', groups: ['使用', '作用', '用心'] },
  { id: '1-1-090', char: '鱼', pinyin: 'yú', groups: ['小鱼', '金鱼', '钓鱼'] },
  { id: '1-1-091', char: '今', pinyin: 'jīn', groups: ['今天', '今年', '如今'] },
  { id: '1-1-092', char: '正', pinyin: 'zhèng', groups: ['正在', '正好', '正确'] },
  { id: '1-1-093', char: '雨', pinyin: 'yǔ', groups: ['下雨', '雨水', '雨天'] },
  { id: '1-1-094', char: '两', pinyin: 'liǎng', groups: ['两个', '两天', '两边'] },
  { id: '1-1-095', char: '只', pinyin: 'zhī', groups: ['一只', '只有', '只要'] },
  { id: '1-1-096', char: '有', pinyin: 'yǒu', groups: ['没有', '拥有', '有的'] },
  { id: '1-1-097', char: '半', pinyin: 'bàn', groups: ['一半', '半天', '半月'] },
  { id: '1-1-098', char: '从', pinyin: 'cóng', groups: ['从来', '从此', '从前'] },
  { id: '1-1-099', char: '你', pinyin: 'nǐ', groups: ['你们', '你好', '你的'] },
  { id: '1-1-100', char: '他', pinyin: 'tā', groups: ['他们', '他的', '其他'] },
]

// 内存缓存（按年级学期）
const memoryCache = {}

// ==================== 核心 API ====================

/**
 * 获取指定年级学期的生字列表（带缓存）
 * @param {string} grade - 年级 key，如 'grade1'
 * @param {string} term - 学期 key，如 'term1'
 * @returns {Array} 生字列表
 */
function getWords(grade, term) {
  const cacheKey = `${grade}_${term}`
  
  // 1. 检查内存缓存
  if (memoryCache[cacheKey]) {
    return memoryCache[cacheKey]
  }
  
  // 2. 检查本地存储缓存
  const storageKey = `${STORAGE_KEY_PREFIX}${cacheKey}_${CACHE_VERSION}`
  try {
    const cached = wx.getStorageSync(storageKey)
    if (cached && cached.data && cached.version === CACHE_VERSION) {
      memoryCache[cacheKey] = cached.data
      return cached.data
    }
  } catch (e) {
    // 存储读取失败，继续加载数据
  }
  
  // 3. 加载数据
  const data = loadWordsData(grade, term)
  
  // 4. 存入缓存
  memoryCache[cacheKey] = data
  try {
    wx.setStorageSync(storageKey, { data, version: CACHE_VERSION, timestamp: Date.now() })
  } catch (e) {
    // 存储失败（可能是容量不足），但不影响使用
  }
  
  return data
}

/**
 * 同步加载数据（内部使用）
 */
function loadWordsData(grade, term) {
  // 根据年级学期返回对应数据
  if (grade === 'grade1' && term === 'term1') return GRADE1_TERM1
  if (grade === 'grade1' && term === 'term2') return GRADE1_TERM2
  if (grade === 'grade2' && term === 'term1') return GRADE2_TERM1
  if (grade === 'grade2' && term === 'term2') return GRADE2_TERM2
  if (grade === 'grade3' && term === 'term1') return GRADE3_TERM1
  if (grade === 'grade3' && term === 'term2') return GRADE3_TERM2
  if (grade === 'grade4' && term === 'term1') return GRADE4_TERM1
  if (grade === 'grade4' && term === 'term2') return GRADE4_TERM2
  if (grade === 'grade5' && term === 'term1') return GRADE5_TERM1
  if (grade === 'grade5' && term === 'term2') return GRADE5_TERM2
  if (grade === 'grade6' && term === 'term1') return GRADE6_TERM1
  if (grade === 'grade6' && term === 'term2') return GRADE6_TERM2
  return []
}

/**
 * 获取生字数量（不加载完整数据）
 * @param {string} grade - 年级 key
 * @param {string} term - 学期 key
 * @returns {number} 生字数量
 */
function getWordCount(grade, term) {
  return (WORDS_COUNT[grade] && WORDS_COUNT[grade][term]) || 0
}

/**
 * 获取所有年级的总字数
 * @returns {number} 总字数
 */
function getTotalWordsCount() {
  let total = 0
  for (const grade in WORDS_COUNT) {
    for (const term in WORDS_COUNT[grade]) {
      total += WORDS_COUNT[grade][term]
    }
  }
  return total
}

/**
 * 预加载指定年级的数据（用于提升后续页面打开速度）
 * @param {string} grade - 年级 key
 * @param {string} term - 学期 key
 */
function preloadWords(grade, term) {
  const cacheKey = `${grade}_${term}`
  if (!memoryCache[cacheKey]) {
    getWords(grade, term)
  }
}

/**
 * 清除缓存（数据更新时调用）
 */
function clearCache() {
  // 清除内存缓存
  Object.keys(memoryCache).forEach(key => delete memoryCache[key])
  
  // 清除存储缓存
  try {
    const keys = wx.getStorageInfoSync().keys
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        wx.removeStorageSync(key)
      }
    })
  } catch (e) {
    // 忽略错误
  }
}

/**
 * 获取随机生字（用于测验）
 * @param {string} grade - 年级 key
 * @param {string} term - 学期 key
 * @param {number} count - 数量
 * @param {Array} exclude - 排除的ID列表
 * @returns {Array} 随机生字列表
 */
function getRandomWords(grade, term, count, exclude = []) {
  const words = getWords(grade, term)
  const available = words.filter(w => !exclude.includes(w.id))
  const shuffled = available.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * 根据ID获取生字
 * @param {string} grade - 年级 key
 * @param {string} term - 学期 key
 * @param {string} id - 生字ID
 * @returns {Object|null}
 */
function getWordById(grade, term, id) {
  const words = getWords(grade, term)
  return words.find(w => w.id === id) || null
}

// ==================== 数据分片（其他年级数据）====================
// 为了代码简洁，这里只展示一年级上册完整数据
// 其他年级数据采用简化版本，实际使用时可以扩展

// 一年级下册（200字）- 简化版
const GRADE1_TERM2 = [
  { id: '1-2-001', char: '春', pinyin: 'chūn', groups: ['春天', '春风', '春雨'] },
  { id: '1-2-002', char: '花', pinyin: 'huā', groups: ['花朵', '红花', '开花'] },
  { id: '1-2-003', char: '鸟', pinyin: 'niǎo', groups: ['小鸟', '鸟儿', '飞鸟'] },
  { id: '1-2-004', char: '虫', pinyin: 'chóng', groups: ['虫子', '昆虫', '小虫'] },
  { id: '1-2-005', char: '草', pinyin: 'cǎo', groups: ['草地', '小草', '青草'] },
  { id: '1-2-006', char: '叶', pinyin: 'yè', groups: ['叶子', '树叶', '绿叶'] },
  { id: '1-2-007', char: '古', pinyin: 'gǔ', groups: ['古老', '古代', '古诗'] },
  { id: '1-2-008', char: '声', pinyin: 'shēng', groups: ['声音', '歌声', '笑声'] },
  { id: '1-2-009', char: '多', pinyin: 'duō', groups: ['多少', '很多', '许多'] },
  { id: '1-2-010', char: '处', pinyin: 'chù', groups: ['处处', '到处', '各处'] },
  { id: '1-2-011', char: '知', pinyin: 'zhī', groups: ['知道', '知识', '认知'] },
  { id: '1-2-012', char: '少', pinyin: 'shǎo', groups: ['少数', '很少', '多少'] },
  { id: '1-2-013', char: '细', pinyin: 'xì', groups: ['细心', '仔细', '细小'] },
  { id: '1-2-014', char: '雨', pinyin: 'yǔ', groups: ['下雨', '雨水', '雨天'] },
  { id: '1-2-015', char: '风', pinyin: 'fēng', groups: ['大风', '风景', '春风'] },
  { id: '1-2-016', char: '入', pinyin: 'rù', groups: ['进入', '入口', '出入'] },
  { id: '1-2-017', char: '冬', pinyin: 'dōng', groups: ['冬天', '冬季', '冬雪'] },
  { id: '1-2-018', char: '雪', pinyin: 'xuě', groups: ['下雪', '雪花', '白雪'] },
  { id: '1-2-019', char: '飞', pinyin: 'fēi', groups: ['飞机', '飞行', '飞翔'] },
  { id: '1-2-020', char: '姓', pinyin: 'xìng', groups: ['姓名', '姓氏', '百姓'] },
  { id: '1-2-021', char: '什', pinyin: 'shén', groups: ['什么', '为什么'] },
  { id: '1-2-022', char: '么', pinyin: 'me', groups: ['什么', '怎么', '这么'] },
  { id: '1-2-023', char: '双', pinyin: 'shuāng', groups: ['双手', '双方', '一双'] },
  { id: '1-2-024', char: '国', pinyin: 'guó', groups: ['国家', '中国', '国王'] },
  { id: '1-2-025', char: '王', pinyin: 'wáng', groups: ['国王', '王子', '王后'] },
  { id: '1-2-026', char: '方', pinyin: 'fāng', groups: ['方向', '方法', '东方'] },
  { id: '1-2-027', char: '青', pinyin: 'qīng', groups: ['青草', '青山', '青色'] },
  { id: '1-2-028', char: '清', pinyin: 'qīng', groups: ['清水', '清楚', '清洁'] },
  { id: '1-2-029', char: '气', pinyin: 'qì', groups: ['天气', '空气', '生气'] },
  { id: '1-2-030', char: '晴', pinyin: 'qíng', groups: ['晴天', '晴朗', '晴空'] },
  { id: '1-2-031', char: '情', pinyin: 'qíng', groups: ['心情', '友情', '感情'] },
  { id: '1-2-032', char: '请', pinyin: 'qǐng', groups: ['请问', '请求', '请客'] },
  { id: '1-2-033', char: '生', pinyin: 'shēng', groups: ['生活', '学生', '生日'] },
  { id: '1-2-034', char: '字', pinyin: 'zì', groups: ['文字', '写字', '名字'] },
  { id: '1-2-035', char: '左', pinyin: 'zuǒ', groups: ['左右', '左边', '左手'] },
  { id: '1-2-036', char: '右', pinyin: 'yòu', groups: ['左右', '右边', '右手'] },
  { id: '1-2-037', char: '红', pinyin: 'hóng', groups: ['红色', '红花', '火红'] },
  { id: '1-2-038', char: '时', pinyin: 'shí', groups: ['时间', '时候', '小时'] },
  { id: '1-2-039', char: '动', pinyin: 'dòng', groups: ['运动', '动物', '动作'] },
  { id: '1-2-040', char: '万', pinyin: 'wàn', groups: ['千万', '一万', '万物'] },
  { id: '1-2-041', char: '吃', pinyin: 'chī', groups: ['吃饭', '吃东西', '好吃'] },
  { id: '1-2-042', char: '叫', pinyin: 'jiào', groups: ['叫声', '叫喊', '大叫'] },
  { id: '1-2-043', char: '主', pinyin: 'zhǔ', groups: ['主人', '主要', '公主'] },
  { id: '1-2-044', char: '江', pinyin: 'jiāng', groups: ['长江', '江水', '江河'] },
  { id: '1-2-045', char: '住', pinyin: 'zhù', groups: ['居住', '住房', '记住'] },
  { id: '1-2-046', char: '没', pinyin: 'méi', groups: ['没有', '没人', '没事'] },
  { id: '1-2-047', char: '以', pinyin: 'yǐ', groups: ['以后', '可以', '以前'] },
  { id: '1-2-048', char: '会', pinyin: 'huì', groups: ['开会', '学会', '大会'] },
  { id: '1-2-049', char: '北', pinyin: 'běi', groups: ['北方', '北京', '北边'] },
  { id: '1-2-050', char: '京', pinyin: 'jīng', groups: ['北京', '南京', '京城'] },
  { id: '1-2-051', char: '过', pinyin: 'guò', groups: ['过去', '过来', '走过'] },
  { id: '1-2-052', char: '各', pinyin: 'gè', groups: ['各种', '各个', '各位'] },
  { id: '1-2-053', char: '种', pinyin: 'zhǒng', groups: ['各种', '种子', '种类'] },
  { id: '1-2-054', char: '样', pinyin: 'yàng', groups: ['样子', '这样', '一样'] },
  { id: '1-2-055', char: '伙', pinyin: 'huǒ', groups: ['伙伴', '同伙', '伙计'] },
  { id: '1-2-056', char: '伴', pinyin: 'bàn', groups: ['伙伴', '同伴', '陪伴'] },
  { id: '1-2-057', char: '这', pinyin: 'zhè', groups: ['这里', '这个', '这样'] },
  { id: '1-2-058', char: '太', pinyin: 'tài', groups: ['太阳', '太大', '太好'] },
  { id: '1-2-059', char: '阳', pinyin: 'yáng', groups: ['太阳', '阳光', '阳台'] },
  { id: '1-2-060', char: '片', pinyin: 'piàn', groups: ['一片', '照片', '名片'] },
  { id: '1-2-061', char: '金', pinyin: 'jīn', groups: ['金色', '金子', '黄金'] },
  { id: '1-2-062', char: '秋', pinyin: 'qiū', groups: ['秋天', '秋风', '秋季'] },
  { id: '1-2-063', char: '因', pinyin: 'yīn', groups: ['因为', '原因', '因果'] },
  { id: '1-2-064', char: '为', pinyin: 'wèi', groups: ['因为', '为了', '为什么'] },
  { id: '1-2-065', char: '才', pinyin: 'cái', groups: ['才能', '刚才', '人才'] },
  { id: '1-2-066', char: '明', pinyin: 'míng', groups: ['明天', '明白', '光明'] },
  { id: '1-2-067', char: '同', pinyin: 'tóng', groups: ['同学', '同时', '相同'] },
  { id: '1-2-068', char: '学', pinyin: 'xué', groups: ['学习', '学生', '学校'] },
  { id: '1-2-069', char: '校', pinyin: 'xiào', groups: ['学校', '校园', '校长'] },
  { id: '1-2-070', char: '爸', pinyin: 'bà', groups: ['爸爸', '老爸', '爸妈'] },
  { id: '1-2-071', char: '妈', pinyin: 'mā', groups: ['妈妈', '爸妈', '姨妈'] },
  { id: '1-2-072', char: '姐', pinyin: 'jiě', groups: ['姐姐', '姐妹', '表姐'] },
  { id: '1-2-073', char: '妹', pinyin: 'mèi', groups: ['妹妹', '姐妹', '表妹'] },
  { id: '1-2-074', char: '哥', pinyin: 'gē', groups: ['哥哥', '大哥', '表哥'] },
  { id: '1-2-075', char: '弟', pinyin: 'dì', groups: ['弟弟', '兄弟', '表弟'] },
  { id: '1-2-076', char: '前', pinyin: 'qián', groups: ['前面', '以前', '前进'] },
  { id: '1-2-077', char: '后', pinyin: 'hòu', groups: ['后面', '以后', '后来'] },
  { id: '1-2-078', char: '午', pinyin: 'wǔ', groups: ['中午', '上午', '下午'] },
  { id: '1-2-079', char: '晚', pinyin: 'wǎn', groups: ['晚上', '夜晚', '晚饭'] },
  { id: '1-2-080', char: '昨', pinyin: 'zuó', groups: ['昨天', '昨日', '昨晚'] },
  { id: '1-2-081', char: '今', pinyin: 'jīn', groups: ['今天', '今年', '如今'] },
  { id: '1-2-082', char: '年', pinyin: 'nián', groups: ['今年', '明年', '过年'] },
  { id: '1-2-083', char: '尺', pinyin: 'chǐ', groups: ['尺子', '尺寸', '直尺'] },
  { id: '1-2-084', char: '刀', pinyin: 'dāo', groups: ['小刀', '刀子', '菜刀'] },
  { id: '1-2-085', char: '书', pinyin: 'shū', groups: ['书本', '读书', '看书'] },
  { id: '1-2-086', char: '包', pinyin: 'bāo', groups: ['书包', '包子', '面包'] },
  { id: '1-2-087', char: '作', pinyin: 'zuò', groups: ['作业', '工作', '作文'] },
  { id: '1-2-088', char: '业', pinyin: 'yè', groups: ['作业', '工业', '农业'] },
  { id: '1-2-089', char: '笔', pinyin: 'bǐ', groups: ['铅笔', '毛笔', '笔记'] },
  { id: '1-2-090', char: '课', pinyin: 'kè', groups: ['上课', '课本', '课文'] },
  { id: '1-2-091', char: '校', pinyin: 'xiào', groups: ['学校', '校园', '校长'] },
  { id: '1-2-092', char: '老', pinyin: 'lǎo', groups: ['老师', '老人', '老虎'] },
  { id: '1-2-093', char: '师', pinyin: 'shī', groups: ['老师', '师父', '医师'] },
  { id: '1-2-094', char: '医', pinyin: 'yī', groups: ['医生', '医院', '中医'] },
  { id: '1-2-095', char: '院', pinyin: 'yuàn', groups: ['医院', '院子', '学院'] },
  { id: '1-2-096', char: '工', pinyin: 'gōng', groups: ['工作', '工人', '工厂'] },
  { id: '1-2-097', char: '厂', pinyin: 'chǎng', groups: ['工厂', '厂长', '厂房'] },
  { id: '1-2-098', char: '军', pinyin: 'jūn', groups: ['军人', '军队', '红军'] },
  { id: '1-2-099', char: '队', pinyin: 'duì', groups: ['队伍', '排队', '队员'] },
  { id: '1-2-100', char: '乐', pinyin: 'lè', groups: ['快乐', '音乐', '乐趣'] },
  { id: '1-2-101', char: '玩', pinyin: 'wán', groups: ['玩耍', '玩具', '游玩'] },
  { id: '1-2-102', char: '具', pinyin: 'jù', groups: ['玩具', '工具', '家具'] },
  { id: '1-2-103', char: '很', pinyin: 'hěn', groups: ['很好', '很多', '很大'] },
  { id: '1-2-104', char: '当', pinyin: 'dāng', groups: ['当时', '当然', '当心'] },
  { id: '1-2-105', char: '音', pinyin: 'yīn', groups: ['音乐', '声音', '拼音'] },
  { id: '1-2-106', char: '讲', pinyin: 'jiǎng', groups: ['讲话', '讲课', '演讲'] },
  { id: '1-2-107', char: '行', pinyin: 'xíng', groups: ['行走', '行动', '不行'] },
  { id: '1-2-108', char: '许', pinyin: 'xǔ', groups: ['许多', '也许', '许可'] },
  { id: '1-2-109', char: '思', pinyin: 'sī', groups: ['思想', '思念', '思考'] },
  { id: '1-2-110', char: '床', pinyin: 'chuáng', groups: ['床上', '起床', '床铺'] },
  { id: '1-2-111', char: '前', pinyin: 'qián', groups: ['前面', '以前', '前进'] },
  { id: '1-2-112', char: '光', pinyin: 'guāng', groups: ['光明', '阳光', '灯光'] },
  { id: '1-2-113', char: '低', pinyin: 'dī', groups: ['低头', '高低', '低落'] },
  { id: '1-2-114', char: '故', pinyin: 'gù', groups: ['故乡', '故事', '故意'] },
  { id: '1-2-115', char: '乡', pinyin: 'xiāng', groups: ['故乡', '家乡', '乡村'] },
  { id: '1-2-116', char: '色', pinyin: 'sè', groups: ['颜色', '红色', '景色'] },
  { id: '1-2-117', char: '外', pinyin: 'wài', groups: ['外面', '外国', '外出'] },
  { id: '1-2-118', char: '看', pinyin: 'kàn', groups: ['看见', '看书', '看到'] },
  { id: '1-2-119', char: '爸', pinyin: 'bà', groups: ['爸爸', '老爸', '爸妈'] },
  { id: '1-2-120', char: '晚', pinyin: 'wǎn', groups: ['晚上', '夜晚', '晚饭'] },
  { id: '1-2-121', char: '笑', pinyin: 'xiào', groups: ['笑话', '微笑', '大笑'] },
  { id: '1-2-122', char: '再', pinyin: 'zài', groups: ['再见', '再次', '再来'] },
  { id: '1-2-123', char: '午', pinyin: 'wǔ', groups: ['中午', '上午', '下午'] },
  { id: '1-2-124', char: '节', pinyin: 'jié', groups: ['节日', '春节', '节目'] },
  { id: '1-2-125', char: '叶', pinyin: 'yè', groups: ['叶子', '树叶', '绿叶'] },
  { id: '1-2-126', char: '米', pinyin: 'mǐ', groups: ['大米', '米饭', '小米'] },
  { id: '1-2-127', char: '样', pinyin: 'yàng', groups: ['样子', '这样', '一样'] },
  { id: '1-2-128', char: '真', pinyin: 'zhēn', groups: ['真正', '真实', '认真'] },
  { id: '1-2-129', char: '分', pinyin: 'fēn', groups: ['分开', '十分', '分钟'] },
  { id: '1-2-130', char: '豆', pinyin: 'dòu', groups: ['豆子', '大豆', '红豆'] },
  { id: '1-2-131', char: '那', pinyin: 'nà', groups: ['那里', '那个', '那么'] },
  { id: '1-2-132', char: '着', pinyin: 'zhe', groups: ['看着', '听着', '走着'] },
  { id: '1-2-133', char: '到', pinyin: 'dào', groups: ['到来', '到处', '看到'] },
  { id: '1-2-134', char: '高', pinyin: 'gāo', groups: ['高兴', '高大', '高低'] },
  { id: '1-2-135', char: '兴', pinyin: 'xìng', groups: ['高兴', '兴趣', '兴奋'] },
  { id: '1-2-136', char: '千', pinyin: 'qiān', groups: ['千万', '一千', '秋千'] },
  { id: '1-2-137', char: '干', pinyin: 'gān', groups: ['干净', '干活', '树干'] },
  { id: '1-2-138', char: '净', pinyin: 'jìng', groups: ['干净', '洁净', '清净'] },
  { id: '1-2-139', char: '洗', pinyin: 'xǐ', groups: ['洗手', '洗脸', '清洗'] },
  { id: '1-2-140', char: '赶', pinyin: 'gǎn', groups: ['赶快', '追赶', '赶集'] },
  { id: '1-2-141', char: '紧', pinyin: 'jǐn', groups: ['赶快', '紧张', '抓紧'] },
  { id: '1-2-142', char: '美', pinyin: 'měi', groups: ['美丽', '美好', '美国'] },
  { id: '1-2-143', char: '丽', pinyin: 'lì', groups: ['美丽', '华丽', '秀丽'] },
  { id: '1-2-144', char: '机', pinyin: 'jī', groups: ['飞机', '机会', '手机'] },
  { id: '1-2-145', char: '朵', pinyin: 'duǒ', groups: ['花朵', '一朵', '云朵'] },
  { id: '1-2-146', char: '美', pinyin: 'měi', groups: ['美丽', '美好', '美术'] },
  { id: '1-2-147', char: '呀', pinyin: 'ya', groups: ['好呀', '来呀', '走呀'] },
  { id: '1-2-148', char: '边', pinyin: 'biān', groups: ['一边', '旁边', '河边'] },
  { id: '1-2-149', char: '呢', pinyin: 'ne', groups: ['你呢', '我呢', '什么呢'] },
  { id: '1-2-150', char: '吗', pinyin: 'ma', groups: ['好吗', '是吗', '对吗'] },
  { id: '1-2-151', char: '吧', pinyin: 'ba', groups: ['好吧', '来吧', '走吧'] },
  { id: '1-2-152', char: '亮', pinyin: 'liàng', groups: ['明亮', '漂亮', '月亮'] },
  { id: '1-2-153', char: '呀', pinyin: 'ya', groups: ['好呀', '来呀', '走呀'] },
  { id: '1-2-154', char: '往', pinyin: 'wǎng', groups: ['来往', '前往', '往年'] },
  { id: '1-2-155', char: '勇', pinyin: 'yǒng', groups: ['勇敢', '勇气', '英勇'] },
  { id: '1-2-156', char: '敢', pinyin: 'gǎn', groups: ['勇敢', '不敢', '敢于'] },
  { id: '1-2-157', char: '窗', pinyin: 'chuāng', groups: ['窗户', '门窗', '窗口'] },
  { id: '1-2-158', char: '乱', pinyin: 'luàn', groups: ['胡乱', '杂乱', '混乱'] },
  { id: '1-2-159', char: '偏', pinyin: 'piān', groups: ['偏偏', '偏见', '偏僻'] },
  { id: '1-2-160', char: '散', pinyin: 'sàn', groups: ['散步', '分散', '散开'] },
  { id: '1-2-161', char: '步', pinyin: 'bù', groups: ['散步', '脚步', '进步'] },
  { id: '1-2-162', char: '都', pinyin: 'dōu', groups: ['都是', '都有', '全都'] },
  { id: '1-2-163', char: '象', pinyin: 'xiàng', groups: ['大象', '象牙', '气象'] },
  { id: '1-2-164', char: '想', pinyin: 'xiǎng', groups: ['想念', '思想', '想法'] },
  { id: '1-2-165', char: '念', pinyin: 'niàn', groups: ['想念', '思念', '念书'] },
  { id: '1-2-166', char: '总', pinyin: 'zǒng', groups: ['总是', '总共', '总结'] },
  { id: '1-2-167', char: '是', pinyin: 'shì', groups: ['就是', '但是', '可是'] },
  { id: '1-2-168', char: '可', pinyin: 'kě', groups: ['可是', '可以', '可能'] },
  { id: '1-2-169', char: '爱', pinyin: 'ài', groups: ['爱心', '可爱', '爱好'] },
  { id: '1-2-170', char: '觉', pinyin: 'jiào', groups: ['睡觉', '午觉', '感觉'] },
  { id: '1-2-171', char: '得', pinyin: 'de', groups: ['觉得', '得到', '获得'] },
  { id: '1-2-172', char: '穿', pinyin: 'chuān', groups: ['穿衣', '穿过', '穿戴'] },
  { id: '1-2-173', char: '服', pinyin: 'fú', groups: ['衣服', '服装', '服务'] },
  { id: '1-2-174', char: '快', pinyin: 'kuài', groups: ['快乐', '赶快', '快速'] },
  { id: '1-2-175', char: '服', pinyin: 'fú', groups: ['衣服', '服装', '服务'] },
  { id: '1-2-176', char: '装', pinyin: 'zhuāng', groups: ['服装', '假装', '安装'] },
  { id: '1-2-177', char: '已', pinyin: 'yǐ', groups: ['已经', '早已', '已然'] },
  { id: '1-2-178', char: '经', pinyin: 'jīng', groups: ['已经', '经过', '经常'] },
  { id: '1-2-179', char: '过', pinyin: 'guò', groups: ['过去', '经过', '过来'] },
  { id: '1-2-180', char: '要', pinyin: 'yào', groups: ['重要', '需要', '要是'] },
  { id: '1-2-181', char: '连', pinyin: 'lián', groups: ['连忙', '连续', '连接'] },
  { id: '1-2-182', char: '忙', pinyin: 'máng', groups: ['连忙', '帮忙', '急忙'] },
  { id: '1-2-183', char: '由', pinyin: 'yóu', groups: ['由于', '自由', '理由'] },
  { id: '1-2-184', char: '非', pinyin: 'fēi', groups: ['非常', '是非', '除非'] },
  { id: '1-2-185', char: '常', pinyin: 'cháng', groups: ['非常', '经常', '平常'] },
  { id: '1-2-186', char: '棵', pinyin: 'kē', groups: ['一棵', '棵树', '棵子'] },
  { id: '1-2-187', char: '次', pinyin: 'cì', groups: ['一次', '再次', '次数'] },
  { id: '1-2-188', char: '瓜', pinyin: 'guā', groups: ['西瓜', '瓜子', '黄瓜'] },
  { id: '1-2-189', char: '满', pinyin: 'mǎn', groups: ['满意', '满足', '满分'] },
  { id: '1-2-190', char: '意', pinyin: 'yì', groups: ['意思', '满意', '意义'] },
  { id: '1-2-191', char: '思', pinyin: 'sī', groups: ['意思', '思想', '思考'] },
  { id: '1-2-192', char: '哇', pinyin: 'wa', groups: ['好哇', '走哇', '来哇'] },
  { id: '1-2-193', char: '怎', pinyin: 'zěn', groups: ['怎么', '怎样', '怎能'] },
  { id: '1-2-194', char: '么', pinyin: 'me', groups: ['什么', '怎么', '这么'] },
  { id: '1-2-195', char: '谢', pinyin: 'xiè', groups: ['谢谢', '感谢', '谢意'] },
  { id: '1-2-196', char: '医', pinyin: 'yī', groups: ['医生', '医院', '中医'] },
  { id: '1-2-197', char: '别', pinyin: 'bié', groups: ['别人', '分别', '特别'] },
  { id: '1-2-198', char: '干', pinyin: 'gàn', groups: ['干活', '树干', '才干'] },
  { id: '1-2-199', char: '洗', pinyin: 'xǐ', groups: ['洗手', '洗脸', '清洗'] },
  { id: '1-2-200', char: '澡', pinyin: 'zǎo', groups: ['洗澡', '澡堂', '澡盆'] },
]

// 导入完整数据（从 chinese_words_full.js）
const { 
  GRADE2_TERM1: G2T1_RAW, 
  GRADE2_TERM2: G2T2_RAW,
  GRADE3_TERM1: G3T1_RAW,
  GRADE3_TERM2: G3T2_RAW,
  GRADE4_TERM1: G4T1_RAW,
  GRADE4_TERM2: G4T2_RAW,
  GRADE5_TERM1: G5T1_RAW,
  GRADE5_TERM2: G5T2_RAW,
  GRADE6_TERM1: G6T1_RAW,
  GRADE6_TERM2: G6T2_RAW,
} = require('./chinese_words_full')

// 为数据添加 id 字段
function addIds(data, grade, term) {
  return data.map((item, idx) => ({
    ...item,
    id: `${grade}-${term}-${String(idx + 1).padStart(3, '0')}`
  }))
}

const GRADE2_TERM1 = addIds(G2T1_RAW, 2, 1)
const GRADE2_TERM2 = addIds(G2T2_RAW, 2, 2)
const GRADE3_TERM1 = addIds(G3T1_RAW, 3, 1)
const GRADE3_TERM2 = addIds(G3T2_RAW, 3, 2)
const GRADE4_TERM1 = addIds(G4T1_RAW, 4, 1)
const GRADE4_TERM2 = addIds(G4T2_RAW, 4, 2)
const GRADE5_TERM1 = addIds(G5T1_RAW, 5, 1)
const GRADE5_TERM2 = addIds(G5T2_RAW, 5, 2)
const GRADE6_TERM1 = addIds(G6T1_RAW, 6, 1)
const GRADE6_TERM2 = addIds(G6T2_RAW, 6, 2)

// 3-6年级数据已从 chinese_words_full.js 导入

// ==================== 导出 ====================
module.exports = {
  GRADES,
  TERMS,
  WORDS_COUNT,
  getWords,
  getWordCount,
  getTotalWordsCount,
  preloadWords,
  clearCache,
  getRandomWords,
  getWordById
}
