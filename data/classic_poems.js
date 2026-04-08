// data/classic_poems.js
// 经典拓展诗词 - 简化版本

// ===== 诗人列表 =====
const CLASSIC_POETS = [
  { id: 'libai', name: '李白', dynasty: '唐', title: '诗仙', avatar: '🌙', color: '#531DAB', gradient: 'linear-gradient(135deg, #722ED1, #531DAB)', bio: '唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。' },
  { id: 'dufu', name: '杜甫', dynasty: '唐', title: '诗圣', avatar: '🌾', color: '#237804', gradient: 'linear-gradient(135deg, #389E0D, #237804)', bio: '唐代伟大的现实主义诗人，被后人誉为"诗圣"。' },
  { id: 'wangwei', name: '王维', dynasty: '唐', title: '诗佛', avatar: '🏔️', color: '#0958D9', gradient: 'linear-gradient(135deg, #1890FF, #0958D9)', bio: '唐代著名诗人、画家，诗中有画，画中有诗。' },
  { id: 'baijuyi', name: '白居易', dynasty: '唐', title: '诗魔', avatar: '📜', color: '#D4380D', gradient: 'linear-gradient(135deg, #FA541C, #D4380D)', bio: '唐代伟大的现实主义诗人，诗平易近人。' },
  { id: 'lishangyin', name: '李商隐', dynasty: '唐', title: '诗鬼', avatar: '🌙', color: '#722ED1', gradient: 'linear-gradient(135deg, #722ED1, #531DAB)', bio: '唐代著名诗人，其诗构思新奇，风格浓丽。' },
  { id: 'dumu', name: '杜牧', dynasty: '唐', title: '小杜', avatar: '🍂', color: '#389E0D', gradient: 'linear-gradient(135deg, #52C41A, #389E0D)', bio: '唐代著名诗人，以七言绝句著称。' },
  { id: 'sushi', name: '苏轼', dynasty: '宋', title: '东坡居士', avatar: '🍃', color: '#389E0D', gradient: 'linear-gradient(135deg, #52C41A, #389E0D)', bio: '北宋著名文学家，词开豪放一派。' },
  { id: 'liqingzhao', name: '李清照', dynasty: '宋', title: '千古第一才女', avatar: '🌸', color: '#EB2F96', gradient: 'linear-gradient(135deg, #F759AB, #C41D7F)', bio: '宋代著名女词人，婉约清新。' },
  { id: 'xinqiji', name: '辛弃疾', dynasty: '宋', title: '词中之龙', avatar: '🐉', color: '#722ED1', gradient: 'linear-gradient(135deg, #722ED1, #531DAB)', bio: '南宋著名词人，词风豪放悲壮。' },
  { id: 'luyou', name: '陆游', dynasty: '宋', title: '放翁', avatar: '🏮', color: '#D4380D', gradient: 'linear-gradient(135deg, #FA541C, #D4380D)', bio: '南宋著名诗人，充满爱国热情。' },
  { id: 'mayuan', name: '马致远', dynasty: '元', title: '曲状元', avatar: '🍂', color: '#8C8C8C', gradient: 'linear-gradient(135deg, #BFBFBF, #595959)', bio: '元代著名散曲家，《天净沙·秋思》被称为"秋思之祖"。' },
]

// ===== 诗词数据 =====
const CLASSIC_POEMS = [
  { id: 'cp-001', title: '静夜思', author: '李白', dynasty: '唐', content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'], pinyin: ['chuáng qián míng yuè guāng,', 'yí shì dì shàng shuāng.', 'jǔ tóu wàng míng yuè,', 'dī tóu sī gù xiāng.'], translation: '明亮的月光洒在床前，好像地上泛起了一层霜。我禁不住抬起头来看明月，不由得低头沉思，想起远方的家乡。', keywords: ['静夜思', '明月', '思乡'], imageDesc: '明月当空，床前思乡', difficulty: 1, emotion: '思乡、宁静' },
  { id: 'cp-002', title: '望庐山瀑布', author: '李白', dynasty: '唐', content: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。'], pinyin: ['rì zhào xiāng lú shēng zǐ yān,', 'yáo kàn pù bù guà qián chuān.', 'fēi liú zhí xià sān qiān chǐ,', 'yí shì yín hé luò jiǔ tiān.'], translation: '太阳照耀着香炉峰，山间升起了紫色的云烟。远远望去，瀑布像一条白练高挂在山前。水流从高处飞快地直泻而下，仿佛是银河从天上落到了人间。', keywords: ['庐山', '瀑布', '银河'], imageDesc: '庐山瀑布，飞流直下', difficulty: 1, emotion: '豪迈、壮观' },
  { id: 'cp-003', title: '春夜喜雨', author: '杜甫', dynasty: '唐', content: ['好雨知时节，', '当春乃发生。', '随风潜入夜，', '润物细无声。'], pinyin: ['hǎo yǔ zhī shí jié,', 'dāng chūn nǎi fā shēng.', 'suí fēng qián rù yè,', 'rùn wù xì wú shēng.'], translation: '好的雨知道选择合适的季节，当春天来临的时候就及时落下。伴随着春风在夜里悄悄来到，滋润万物无声无息。', keywords: ['春雨', '好雨', '润物'], imageDesc: '春夜细雨，润物无声', difficulty: 1, emotion: '喜悦、赞美' },
  { id: 'cp-004', title: '绝句', author: '杜甫', dynasty: '唐', content: ['两个黄鹂鸣翠柳，', '一行白鹭上青天。', '窗含西岭千秋雪，', '门泊东吴万里船。'], pinyin: ['liǎng gè huáng lí míng cuì liǔ,', 'yī háng bái lù shàng qīng tiān.', 'chuāng hán xī lǐng qiān qiū xuě,', 'mén bó dōng wú wàn lǐ chuán.'], translation: '两只黄鹂鸟在翠绿的柳树上歌唱，一行白鹭排成整齐的队列飞向蓝蓝的天空。从窗口望去可以看见西岭千年不化的积雪，门前停泊着从万里之外的东吴驶来的船只。', keywords: ['黄鹂', '白鹭', '西岭雪'], imageDesc: '黄鹂翠柳，白鹭青天', difficulty: 1, emotion: '明快、愉悦' },
  { id: 'cp-005', title: '相思', author: '王维', dynasty: '唐', content: ['红豆生南国，', '春来发几枝。', '愿君多采撷，', '此物最相思。'], pinyin: ['hóng dòu shēng nán guó,', 'chūn lái fā jǐ zhī.', 'yuàn jūn duō cǎi xié,', 'cǐ wù zuì xiāng sī.'], translation: '红豆生长在南方，春天来了它又发出新的枝条。希望你多多采摘它，因为它最能代表我的相思之情。', keywords: ['红豆', '相思'], imageDesc: '红豆相思，春意盎然', difficulty: 1, emotion: '相思、深情' },
  { id: 'cp-006', title: '草', author: '白居易', dynasty: '唐', content: ['离离原上草，', '一岁一枯荣。', '野火烧不尽，', '春风吹又生。'], pinyin: ['lí lí yuán shàng cǎo,', 'yī suì yī kū róng.', 'yě huǒ shāo bù jìn,', 'chūn fēng chuī yòu shēng.'], translation: '原野上的青草多么茂盛，每年都要经历一次枯萎和繁荣。野火无法烧尽所有的草，春风一吹它们又重新生长起来。', keywords: ['草', '野火', '春风'], imageDesc: '原野草青，野火春风', difficulty: 1, emotion: '坚韧、希望' },
  { id: 'cp-007', title: '山行', author: '杜牧', dynasty: '唐', content: ['远上寒山石径斜，', '白云生处有人家。', '停车坐爱枫林晚，', '霜叶红于二月花。'], pinyin: ['yuǎn shàng hán shān shí jìng xié,', 'bái yún shēng chù yǒu rén jiā.', 'tíng chē zuò ài fēng lín wǎn,', 'shuāng yè hóng yú èr yuè huā.'], translation: '远远地登上寒山，石子小路弯弯曲曲。白云缭绕的地方住着几户人家。我停下车来是因为喜爱这傍晚的枫林，经霜的枫叶比二月的春花还要红艳。', keywords: ['寒山', '枫林', '霜叶'], imageDesc: '寒山石径，枫林霜叶', difficulty: 1, emotion: '喜悦、赞美' },
  { id: 'cp-008', title: '清明', author: '杜牧', dynasty: '唐', content: ['清明时节雨纷纷，', '路上行人欲断魂。', '借问酒家何处有，', '牧童遥指杏花村。'], pinyin: ['qīng míng shí jié yǔ fēn fēn,', 'lù shàng xíng rén yù duàn hún.', 'jiè wèn jiǔ jiā hé chù yǒu,', 'mù tóng yáo zhǐ xìng huā cūn.'], translation: '清明时节细雨纷纷飘落，路上的行人忧愁得像是丢了魂。请问哪里有酒家？牧童远远地指向杏花盛开的村庄。', keywords: ['清明', '雨', '杏花村'], imageDesc: '清明时节，雨中行人', difficulty: 1, emotion: '惆怅、凄迷' },
  { id: 'cp-009', title: '赠刘景文', author: '苏轼', dynasty: '宋', content: ['荷尽已无擎雨盖，', '菊残犹有傲霜枝。', '一年好景君须记，', '正是橙黄橘绿时。'], pinyin: ['hé jìn yǐ wú qíng yǔ gài,', 'jú cán yóu yǒu ào shuāng zhī.', 'yī nián hǎo jǐng jūn xū jì,', 'zhèng shì chéng huáng jú lǜ shí.'], translation: '荷花已经凋谢，连擎雨的叶子也没有了。菊花也枯萎了，但仍有傲霜的枝条在挺立。一年中最好的景色你要记住，正是这橙子金黄、橘子青绿的时节。', keywords: ['荷花', '菊花', '橙黄橘绿'], imageDesc: '秋末冬初，橙黄橘绿', difficulty: 1, emotion: '旷达、乐观' },
  { id: 'cp-010', title: '饮湖上初晴后雨', author: '苏轼', dynasty: '宋', content: ['水光潋滟晴方好，', '山色空蒙雨亦奇。', '欲把西湖比西子，', '淡妆浓抹总相宜。'], pinyin: ['shuǐ guāng liàn yàn qíng fāng hǎo,', 'shān sè kōng méng yǔ yì qí.', 'yù bǎ xī hú bǐ xī zǐ,', 'dàn zhuāng nóng mò zǒng xiāng yí.'], translation: '晴天的西湖水波粼粼，光彩照人；雨天的西湖云雾缭绕，景色也很奇妙。如果把西湖比作美女西施，那么淡妆也好，浓妆也好，总是很美的。', keywords: ['西湖', '西子', '晴雨'], imageDesc: '西湖晴雨，水光潋滟', difficulty: 1, emotion: '赞美、旷达' },
  { id: 'cp-011', title: '天净沙·秋思', author: '马致远', dynasty: '元', content: ['枯藤老树昏鸦，', '小桥流水人家，', '古道西风瘦马。', '夕阳西下，', '断肠人在天涯。'], pinyin: ['kū téng lǎo shù hūn yā,', 'xiǎo qiáo liú shuǐ rén jiā,', 'gǔ dào xī fēng shòu mǎ.', 'xī yáng xī xià,', 'duàn cháng rén zài tiān yá.'], translation: '枯萎的藤蔓缠绕着老树，黄昏的乌鸦在树上栖息。小桥下溪水潺潺，桥边住着几户人家。古老的道路上，西风吹拂，瘦马艰难前行。夕阳西下，忧愁的人浪迹在天涯。', keywords: ['秋思', '枯藤', '断肠人'], imageDesc: '枯藤老树，夕阳西下', difficulty: 1, emotion: '悲凉、思乡', isCi: true },
]

// ===== 工具函数 =====

function getAllClassicPoems() {
  return CLASSIC_POEMS
}

function getAllClassicPoets() {
  return CLASSIC_POETS
}

function getClassicPoetById(id) {
  return CLASSIC_POETS.find(p => p.id === id) || null
}

function getClassicPoemsByAuthor(authorName) {
  return CLASSIC_POEMS.filter(p => p.author === authorName)
}

function getClassicPoemById(id) {
  return CLASSIC_POEMS.find(p => p.id === id) || null
}

function getClassicPoemsByDynasty(dynasty) {
  return CLASSIC_POEMS.filter(p => p.dynasty === dynasty)
}

function getClassicStats() {
  const totalPoems = CLASSIC_POEMS.length
  const totalPoets = CLASSIC_POETS.length
  const byDynasty = {}
  CLASSIC_POEMS.forEach(p => {
    byDynasty[p.dynasty] = (byDynasty[p.dynasty] || 0) + 1
  })
  return { totalPoems, totalPoets, byDynasty }
}

module.exports = {
  CLASSIC_POETS,
  CLASSIC_POEMS,
  getAllClassicPoems,
  getAllClassicPoets,
  getClassicPoetById,
  getClassicPoemsByAuthor,
  getClassicPoemById,
  getClassicPoemsByDynasty,
  getClassicStats,
}
