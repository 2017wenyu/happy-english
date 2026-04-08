// data/classic_poems.js
// 经典拓展诗词 - 唐宋元著名诗人经典作品（独立于必背古诗词）
// 按诗人分类，收录各朝代代表性作品

const CLASSIC_POETS = [
  {
    id: 'libai',
    name: '李白',
    dynasty: '唐',
    title: '诗仙',
    avatar: '🌙',
    color: '#531DAB',
    gradient: 'linear-gradient(135deg, #722ED1, #531DAB)',
    bio: '唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。其诗豪迈奔放，想象丰富，语言奇妙，意境深远。',
  },
  {
    id: 'dufu',
    name: '杜甫',
    dynasty: '唐',
    title: '诗圣',
    avatar: '🌾',
    color: '#237804',
    gradient: 'linear-gradient(135deg, #389E0D, #237804)',
    bio: '唐代伟大的现实主义诗人，被后人誉为"诗圣"。其诗深刻反映了唐代由盛转衰的社会现实，被称为"诗史"。',
  },
  {
    id: 'wangwei',
    name: '王维',
    dynasty: '唐',
    title: '诗佛',
    avatar: '⛰️',
    color: '#096DD9',
    gradient: 'linear-gradient(135deg, #1890FF, #096DD9)',
    bio: '唐代著名诗人、画家，与孟浩然并称"王孟"，被苏轼赞为"诗中有画，画中有诗"。',
  },
  {
    id: 'baijuyi',
    name: '白居易',
    dynasty: '唐',
    title: '香山居士',
    avatar: '🌸',
    color: '#EB2F96',
    gradient: 'linear-gradient(135deg, #F759AB, #C41D7F)',
    bio: '唐代著名现实主义诗人，新乐府运动的倡导者。主张"文章合为时而著，歌诗合为事而作"。',
  },
  {
    id: 'lisushangyin',
    name: '李商隐',
    dynasty: '唐',
    title: '玉溪生',
    avatar: '🕯️',
    color: '#5B8FF9',
    gradient: 'linear-gradient(135deg, #5B8FF9, #2B4C8C)',
    bio: '晚唐著名诗人，与杜牧并称"小李杜"。其诗构思新奇，意境朦胧，语言华美，善用典故。',
  },
  {
    id: 'dumu',
    name: '杜牧',
    dynasty: '唐',
    title: '小杜',
    avatar: '🍂',
    color: '#CF1322',
    gradient: 'linear-gradient(135deg, #FF4D4F, #CF1322)',
    bio: '晚唐杰出诗人，与李商隐并称"小李杜"。诗风俊爽清丽，尤擅七言绝句，咏史诗借古讽今。',
  },
  {
    id: 'wangchangling',
    name: '王昌龄',
    dynasty: '唐',
    title: '七绝圣手',
    avatar: '🏯',
    color: '#531DAB',
    gradient: 'linear-gradient(135deg, #722ED1, #531DAB)',
    bio: '盛唐著名边塞诗人，有"七绝圣手"之称。其诗气势雄浑，格调高昂，尤擅七言绝句。',
  },
  {
    id: 'liuyuxi',
    name: '刘禹锡',
    dynasty: '唐',
    title: '诗豪',
    avatar: '🌊',
    color: '#D48806',
    gradient: 'linear-gradient(135deg, #FAAD14, #D48806)',
    bio: '唐代著名诗人，与白居易并称"刘白"。其诗风豪迈奔放，意境开阔，哲理深刻。',
  },
  {
    id: 'menghaoran',
    name: '孟浩然',
    dynasty: '唐',
    title: '孟山人',
    avatar: '🏔️',
    color: '#389E0D',
    gradient: 'linear-gradient(135deg, #52C41A, #389E0D)',
    bio: '唐代著名山水田园诗人，与王维并称"王孟"。其诗清淡自然，意境悠远。',
  },
  {
    id: 'sushi',
    name: '苏轼',
    dynasty: '宋',
    title: '东坡居士',
    avatar: '🎋',
    color: '#1D39C4',
    gradient: 'linear-gradient(135deg, #2F54EB, #1D39C4)',
    bio: '北宋著名文学家、书画家，"唐宋八大家"之一。其诗清新豪健，词开豪放一派。',
  },
  {
    id: 'liqingzhao',
    name: '李清照',
    dynasty: '宋',
    title: '易安居士',
    avatar: '🌺',
    color: '#EB2F96',
    gradient: 'linear-gradient(135deg, #F759AB, #C41D7F)',
    bio: '宋代著名女词人，婉约词派代表人物。其词语言清丽，情感真挚，被誉为"千古第一才女"。',
  },
  {
    id: 'xinqiji',
    name: '辛弃疾',
    dynasty: '宋',
    title: '稼轩居士',
    avatar: '⚔️',
    color: '#CF1322',
    gradient: 'linear-gradient(135deg, #FF4D4F, #CF1322)',
    bio: '南宋豪放派词人代表，与苏轼并称"苏辛"。其词气势磅礴，充满爱国热情。',
  },
  {
    id: 'luyou',
    name: '陆游',
    dynasty: '宋',
    title: '放翁',
    avatar: '📜',
    color: '#D4380D',
    gradient: 'linear-gradient(135deg, #FA541C, #D4380D)',
    bio: '南宋著名诗人，存诗九千余首，是中国文学史上存诗最多的诗人。其诗充满爱国情怀。',
  },
  {
    id: 'yangwanli',
    name: '杨万里',
    dynasty: '宋',
    title: '诚斋先生',
    avatar: '🌻',
    color: '#D48806',
    gradient: 'linear-gradient(135deg, #FADB14, #D48806)',
    bio: '南宋著名诗人，"中兴四大诗人"之一。诗风清新自然，自成"诚斋体"。',
  },
  {
    id: 'mayuan',
    name: '马致远',
    dynasty: '元',
    title: '曲状元',
    avatar: '🍂',
    color: '#8C8C8C',
    gradient: 'linear-gradient(135deg, #BFBFBF, #595959)',
    bio: '元代著名戏曲家、散曲家，"元曲四大家"之一。《天净沙·秋思》被称为"秋思之祖"。',
  },
  // ===== 新增诗人 =====
  ...NEW_CLASSIC_POETS,
]

// ==================== 李白 ====================
const LIBAI_POEMS = [
  {
    id: 'c-libai-001',
    title: '将进酒',
    author: '李白',
    dynasty: '唐',
    content: [
      '君不见黄河之水天上来，', '奔流到海不复回。',
      '君不见高堂明镜悲白发，', '朝如青丝暮成雪。',
      '人生得意须尽欢，', '莫使金樽空对月。',
      '天生我材必有用，', '千金散尽还复来。',
      '烹羊宰牛且为乐，', '会须一饮三百杯。',
      '岑夫子，丹丘生，', '将进酒，杯莫停。',
      '与君歌一曲，', '请君为我倾耳听。',
      '钟鼓馔玉不足贵，', '但愿长醉不复醒。',
      '古来圣贤皆寂寞，', '惟有饮者留其名。',
      '陈王昔时宴平乐，', '斗酒十千恣欢谑。',
      '主人何为言少钱，', '径须沽取对君酌。',
      '五花马，千金裘，', '呼儿将出换美酒，', '与尔同销万古愁。'
    ],
    pinyin: [
      'jūn bú jiàn huáng hé zhī shuǐ tiān shàng lái,', 'bēn liú dào hǎi bú fù huí.',
      'jūn bú jiàn gāo táng míng jìng bēi bái fà,', 'cháo rú qīng sī mù chéng xuě.',
      'rén shēng dé yì xū jìn huān,', 'mò shǐ jīn zūn kōng duì yuè.',
      'tiān shēng wǒ cái bì yǒu yòng,', 'qiān jīn sàn jìn hái fù lái.',
      'pēng yáng zǎi niú qiě wéi lè,', 'huì xū yī yǐn sān bǎi bēi.',
      'cén fū zǐ, dān qiū shēng,', 'qiāng jìn jiǔ, bēi mò tíng.',
      'yǔ jūn gē yī qǔ,', 'qǐng jūn wèi wǒ qīng ěr tīng.',
      'zhōng gǔ zhuàn yù bù zú guì,', 'dàn yuàn cháng zuì bú fù xǐng.',
      'gǔ lái shèng xián jiē jì mò,', 'wéi yǒu yǐn zhě liú qí míng.',
      'chén wáng xī shí yàn píng lè,', 'dǒu jiǔ shí qiān zì huān xuè.',
      'zhǔ rén hé wéi yán shǎo qián,', 'jìng xū gū qǔ duì jūn zhuó.',
      'wǔ huā mǎ, qiān jīn qiú,', 'hū ér jiāng chū huàn měi jiǔ,', 'yǔ ěr tóng xiāo wàn gǔ chóu.'
    ],
    translation: '你没看见吗？黄河之水从天上奔腾而来，流向大海不再返回。你没看见吗？高堂之上对着明镜悲叹白发，早晨还是黑发傍晚就变成白雪。人生得意之时应当尽情欢乐，不要让金杯空对着明月。上天生下我必有我的用处，千金散尽还会再回来。烹羊宰牛姑且作乐，应当一次痛饮三百杯。岑夫子，丹丘生，快喝酒啊，不要停下来。让我为你们唱一曲，请你们侧耳倾听。钟鸣鼎食的富贵生活不足为贵，只愿长久沉醉不再醒来。自古以来圣贤都寂寞无名，只有饮酒的人才能流传美名。陈王曹植当年在平乐观设宴，一斗美酒价值十千，纵情欢乐。主人为什么说钱少，只管买酒来让我们对饮。五花宝马，千金狐裘，叫侍儿拿出去换美酒，和你一同消解这万古长愁。',
    keywords: ['黄河', '金樽', '天生我材', '千金', '万古愁'],
    imageDesc: '黄河奔腾入海，诗人举杯对月，豪情万丈',
    difficulty: 3,
    emotion: '豪放、自信',
  },
  {
    id: 'c-libai-002',
    title: '行路难·其一',
    author: '李白',
    dynasty: '唐',
    content: ['金樽清酒斗十千，', '玉盘珍羞直万钱。', '停杯投箸不能食，', '拔剑四顾心茫然。', '欲渡黄河冰塞川，', '将登太行雪满山。', '闲来垂钓碧溪上，', '忽复乘舟梦日边。', '行路难，行路难，', '多歧路，今安在？', '长风破浪会有时，', '直挂云帆济沧海。'],
    pinyin: ['jīn zūn qīng jiǔ dǒu shí qiān,', 'yù pán zhēn xiū zhí wàn qián.', 'tíng bēi tóu zhù bù néng shí,', 'bá jiàn sì gù xīn máng rán.', 'yù dù huáng hé bīng sāi chuān,', 'jiāng dēng tài háng xuě mǎn shān.', 'xián lái chuí diào bì xī shàng,', 'hū fù chéng zhōu mèng rì biān.', 'xíng lù nán, xíng lù nán,', 'duō qí lù, jīn ān zài?', 'cháng fēng pò làng huì yǒu shí,', 'zhí guà yún fān jì cāng hǎi.'],
    translation: '金杯中的美酒一斗价值十千，玉盘里的珍馐佳肴价值万钱。停下酒杯放下筷子不能进食，拔出宝剑四下张望心中茫然。想渡黄河却被冰雪堵塞河道，要登太行山却被大雪封山。闲暇时像姜太公在碧溪垂钓，忽然又像伊尹梦见乘船经过太阳旁边。行路难啊行路难，岔路这么多，如今身在何处？相信总有一天能乘长风破万里浪，高挂云帆渡过沧海。',
    keywords: ['金樽', '行路难', '长风破浪', '云帆'],
    imageDesc: '诗人面对美酒佳肴却无心进食，拔剑四顾，最终展望乘风破浪',
    difficulty: 3,
    emotion: '迷茫、坚定',
  },
  {
    id: 'c-libai-003',
    title: '月下独酌',
    author: '李白',
    dynasty: '唐',
    content: ['花间一壶酒，', '独酌无相亲。', '举杯邀明月，', '对影成三人。', '月既不解饮，', '影徒随我身。', '暂伴月将影，', '行乐须及春。', '我歌月徘徊，', '我舞影零乱。', '醒时同交欢，', '醉后各分散。', '永结无情游，', '相期邈云汉。'],
    pinyin: ['huā jiān yī hú jiǔ,', 'dú zhuó wú xiāng qīn.', 'jǔ bēi yāo míng yuè,', 'duì yǐng chéng sān rén.', 'yuè jì bù jiě yǐn,', 'yǐng tú suí wǒ shēn.', 'zàn bàn yuè jiāng yǐng,', 'xíng lè xū jí chūn.', 'wǒ gē yuè pái huái,', 'wǒ wǔ yǐng líng luàn.', 'xǐng shí tóng jiāo huān,', 'zuì hòu gè fēn sàn.', 'yǒng jié wú qíng yóu,', 'xiāng qī miǎo yún hàn.'],
    translation: '在花丛中摆上一壶酒，独自饮酒没有亲友相伴。举起酒杯邀请明月，加上自己的影子就成了三个人。月亮本来就不懂得饮酒，影子也只是白白跟随我的身体。暂且与明月和影子为伴，应当及时行乐趁着春光。我唱歌时月亮在空中徘徊，我跳舞时影子也跟着零乱。清醒时一起欢乐，醉酒后各自分散。愿永远结下这忘却世情的交游，相约在遥远的银河再见。',
    keywords: ['花间', '明月', '对影', '云汉'],
    imageDesc: '花丛中诗人独酌，举杯邀月，与月影相伴',
    difficulty: 3,
    emotion: '孤独、浪漫',
  },
]

// ==================== 杜甫 ====================
const DUFU_POEMS = [
  {
    id: 'c-dufu-001',
    title: '登高',
    author: '杜甫',
    dynasty: '唐',
    content: ['风急天高猿啸哀，', '渚清沙白鸟飞回。', '无边落木萧萧下，', '不尽长江滚滚来。', '万里悲秋常作客，', '百年多病独登台。', '艰难苦恨繁霜鬓，', '潦倒新停浊酒杯。'],
    pinyin: ['fēng jí tiān gāo yuán xiào āi,', 'zhǔ qīng shā bái niǎo fēi huí.', 'wú biān luò mù xiāo xiāo xià,', 'bú jìn cháng jiāng gǔn gǔn lái.', 'wàn lǐ bēi qiū cháng zuò kè,', 'bǎi nián duō bìng dú dēng tái.', 'jiān nán kǔ hèn fán shuāng bìn,', 'liáo dǎo xīn tíng zhuó jiǔ bēi.'],
    translation: '风急天高，猿猴啼叫显得十分悲哀，水清沙白的河洲上有鸟儿在盘旋。无边无际的树木萧萧地飘下落叶，望不到头的长江水滚滚奔腾而来。悲对秋景感慨万里漂泊常年为客，一生当中疾病缠身今日独上高台。历尽了艰难苦恨白发长满了双鬓，衰颓满心偏又暂停了浇愁的酒杯。',
    keywords: ['猿啸', '落木', '长江', '登高'],
    imageDesc: '秋日登高，风急天高，落叶纷飞，长江滚滚',
    difficulty: 3,
    emotion: '悲凉、感慨',
  },
  {
    id: 'c-dufu-002',
    title: '茅屋为秋风所破歌',
    author: '杜甫',
    dynasty: '唐',
    content: ['八月秋高风怒号，', '卷我屋上三重茅。', '茅飞渡江洒江郊，', '高者挂罥长林梢，', '下者飘转沉塘坳。', '南村群童欺我老无力，', '忍能对面为盗贼。', '公然抱茅入竹去，', '唇焦口燥呼不得，', '归来倚杖自叹息。', '俄顷风定云墨色，', '秋天漠漠向昏黑。', '布衾多年冷似铁，', '娇儿恶卧踏里裂。', '床头屋漏无干处，', '雨脚如麻未断绝。', '自经丧乱少睡眠，', '长夜沾湿何由彻！', '安得广厦千万间，', '大庇天下寒士俱欢颜！', '风雨不动安如山。', '呜呼！何时眼前突兀见此屋，', '吾庐独破受冻死亦足！'],
    pinyin: ['bā yuè qiū gāo fēng nù háo,', 'juǎn wǒ wū shàng sān chóng máo.', 'máo fēi dù jiāng sǎ jiāng jiāo,', 'gāo zhě guà juàn cháng lín shāo,', 'xià zhě piāo zhuǎn chén táng ào.', 'nán cūn qún tóng qī wǒ lǎo wú lì,', 'rěn néng duì miàn wéi dào zéi.', 'gōng rán bào máo rù zhú qù,', 'chún jiāo kǒu zào hū bù dé,', 'guī lái yǐ zhàng zì tàn xī.', 'é qǐng fēng dìng yún mò sè,', 'qiū tiān mò mò xiàng hūn hēi.', 'bù qīn duō nián lěng sì tiě,', 'jiāo ér è wò tà lǐ liè.', 'chuáng tóu wū lòu wú gàn chù,', 'yǔ jiǎo rú má wèi duàn jué.', 'zì jīng sāng luàn shǎo shuì mián,', 'cháng yè zhān shī hé yóu chè!', 'ān dé guǎng shà qiān wàn jiān,', 'dà bì tiān xià hán shì jù huān yán!', 'fēng yǔ bú dòng ān rú shān.', 'wū hū! hé shí yǎn qián tū wù jiàn cǐ wū,', 'wú lú dú pò shòu dòng sǐ yì zú!'],
    translation: '八月秋深，狂风怒号，卷走了我屋顶上的多层茅草。茅草飞过江去，散落在江郊，高的挂在高高的树梢上，低的飘转沉落到池塘水洼里。南村的一群儿童欺负我年老无力，竟忍心当面做"贼"。公然抱着茅草跑进竹林去了，我嘴唇干燥也喝止不住，回来拄着拐杖独自叹息。一会儿风停了，乌云像墨一样黑，秋天的天空阴沉迷蒙渐渐黑下来。布被盖了多年冷得像铁，孩子睡相不好把被里蹬破了。床头屋漏没有干的地方，雨点像麻线一样下个不停。自从经历战乱就很少睡眠，长夜漫漫屋漏床湿如何挨到天亮！如何能得到千万间宽敞的大屋，普遍地庇护天下贫寒的士人，让他们都露出欢颜！风雨不动安稳如山。唉！什么时候眼前能突然出现这样的房屋，即使只有我的茅屋破旧我受冻死去也心甘情愿！',
    keywords: ['茅屋', '秋风', '广厦', '寒士'],
    imageDesc: '秋风中茅屋破败，诗人却心系天下寒士',
    difficulty: 3,
    emotion: '忧国忧民',
  },
  {
    id: 'c-dufu-003',
    title: '蜀相',
    author: '杜甫',
    dynasty: '唐',
    content: ['丞相祠堂何处寻，', '锦官城外柏森森。', '映阶碧草自春色，', '隔叶黄鹂空好音。', '三顾频烦天下计，', '两朝开济老臣心。', '出师未捷身先死，', '长使英雄泪满襟。'],
    pinyin: ['chéng xiàng cí táng hé chù xún,', 'jǐn guān chéng wài bǎi sēn sēn.', 'yìng jiē bì cǎo zì chūn sè,', 'gé yè huáng lí kōng hǎo yīn.', 'sān gù pín fán tiān xià jì,', 'liǎng cháo kāi jì lǎo chén xīn.', 'chū shī wèi jié shēn xiān sǐ,', 'cháng shǐ yīng xióng lèi mǎn jīn.'],
    translation: '丞相诸葛亮的祠堂到哪里去寻找？锦官城外翠柏长得茂密森森。碧草映照石阶自有一片春色，黄鹂在密叶间空有美妙歌声。当年刘备三顾茅庐频繁请教天下大计，诸葛亮辅佐两朝开国济世竭尽老臣之心。可惜出师北伐尚未取胜人先死去，常使后世英雄泪湿衣襟。',
    keywords: ['丞相', '祠堂', '三顾', '出师'],
    imageDesc: '武侯祠翠柏森森，诗人缅怀诸葛亮',
    difficulty: 3,
    emotion: '敬仰、惋惜',
  },
]

// ==================== 王维 ====================
const WANGWEI_POEMS = [
  {
    id: 'c-wangwei-001',
    title: '山居秋暝',
    author: '王维',
    dynasty: '唐',
    content: ['空山新雨后，', '天气晚来秋。', '明月松间照，', '清泉石上流。', '竹喧归浣女，', '莲动下渔舟。', '随意春芳歇，', '王孙自可留。'],
    pinyin: ['kōng shān xīn yǔ hòu,', 'tiān qì wǎn lái qiū.', 'míng yuè sōng jiān zhào,', 'qīng quán shí shàng liú.', 'zhú xuān guī huàn nǚ,', 'lián dòng xià yú zhōu.', 'suí yì chūn fāng xiē,', 'wáng sūn zì kě liú.'],
    translation: '空旷的山林刚下过一场雨，秋天的傍晚天气凉爽。明月透过松林洒下清辉，清澈的泉水在石上流淌。竹林中传来喧闹声，是洗衣的女子归来，荷叶摇动是渔舟顺流而下。任凭春天的花草凋谢吧，这秋景也值得王孙公子留居。',
    keywords: ['空山', '明月', '清泉', '浣女'],
    imageDesc: '秋夜山居，明月松间，清泉石上，浣女归家',
    difficulty: 2,
    emotion: '宁静、恬淡',
  },
  {
    id: 'c-wangwei-002',
    title: '使至塞上',
    author: '王维',
    dynasty: '唐',
    content: ['单车欲问边，', '属国过居延。', '征蓬出汉塞，', '归雁入胡天。', '大漠孤烟直，', '长河落日圆。', '萧关逢候骑，', '都护在燕然。'],
    pinyin: ['dān chē yù wèn biān,', 'shǔ guó guò jū yán.', 'zhēng péng chū hàn sài,', 'guī yàn rù hú tiān.', 'dà mò gū yān zhí,', 'cháng hé luò rì yuán.', 'xiāo guān féng hòu jì,', 'dū hù zài yān rán.'],
    translation: '轻车简从将要出使边疆，经过属国一直向前到居延。像蓬草一样飘出汉家边塞，如归雁一般进入胡人天空。大漠中一缕孤烟笔直上升，黄河上一轮落日又大又圆。在萧关遇到侦察的骑兵，得知都护正在燕然前线。',
    keywords: ['大漠', '孤烟', '长河', '落日'],
    imageDesc: '大漠孤烟直上，黄河落日浑圆，壮阔边塞风光',
    difficulty: 2,
    emotion: '壮阔、苍凉',
  },
]

// ==================== 白居易 ====================
const BAIJUYI_POEMS = [
  {
    id: 'c-baijuyi-001',
    title: '琵琶行',
    author: '白居易',
    dynasty: '唐',
    content: [
      '浔阳江头夜送客，', '枫叶荻花秋瑟瑟。',
      '主人下马客在船，', '举酒欲饮无管弦。',
      '醉不成欢惨将别，', '别时茫茫江浸月。',
      '忽闻水上琵琶声，', '主人忘归客不发。',
      '寻声暗问弹者谁，', '琵琶声停欲语迟。',
      '移船相近邀相见，', '添酒回灯重开宴。',
      '千呼万唤始出来，', '犹抱琵琶半遮面。',
      '转轴拨弦三两声，', '未成曲调先有情。',
      '弦弦掩抑声声思，', '似诉平生不得志。',
      '低眉信手续续弹，', '说尽心中无限事。',
      '轻拢慢捻抹复挑，', '初为《霓裳》后《六幺》。',
      '大弦嘈嘈如急雨，', '小弦切切如私语。',
      '嘈嘈切切错杂弹，', '大珠小珠落玉盘。',
      '间关莺语花底滑，', '幽咽泉流冰下难。',
      '冰泉冷涩弦凝绝，', '凝绝不通声暂歇。',
      '别有幽愁暗恨生，', '此时无声胜有声。',
      '银瓶乍破水浆迸，', '铁骑突出刀枪鸣。',
      '曲终收拨当心画，', '四弦一声如裂帛。',
      '东船西舫悄无言，', '唯见江心秋月白。',
      '沉吟放拨插弦中，', '整顿衣裳起敛容。',
      '自言本是京城女，', '家在虾蟆陵下住。',
      '十三学得琵琶成，', '名属教坊第一部。',
      '曲罢曾教善才服，', '妆成每被秋娘妒。',
      '五陵年少争缠头，', '一曲红绡不知数。',
      '钿头银篦击节碎，', '血色罗裙翻酒污。',
      '今年欢笑复明年，', '秋月春风等闲度。',
      '弟走从军阿姨死，', '暮去朝来颜色故。',
      '门前冷落鞍马稀，', '老大嫁作商人妇。',
      '商人重利轻别离，', '前月浮梁买茶去。',
      '去来江口守空船，', '绕船月明江水寒。',
      '夜深忽梦少年事，', '梦啼妆泪红阑干。',
      '我闻琵琶已叹息，', '又闻此语重唧唧。',
      '同是天涯沦落人，', '相逢何必曾相识！',
      '我从去年辞帝京，', '谪居卧病浔阳城。',
      '浔阳地僻无音乐，', '终岁不闻丝竹声。',
      '住近湓江地低湿，', '黄芦苦竹绕宅生。',
      '其间旦暮闻何物？', '杜鹃啼血猿哀鸣。',
      '春江花朝秋月夜，', '往往取酒还独倾。',
      '岂无山歌与村笛？', '呕哑嘲哳难为听。',
      '今夜闻君琵琶语，', '如听仙乐耳暂明。',
      '莫辞更坐弹一曲，', '为君翻作《琵琶行》。',
      '感我此言良久立，', '却坐促弦弦转急。',
      '凄凄不似向前声，', '满座重闻皆掩泣。',
      '座中泣下谁最多？', '江州司马青衫湿。'
    ],
    pinyin: [
      'xún yáng jiāng tóu yè sòng kè,', 'fēng yè dí huā qiū sè sè.',
      'zhǔ rén xià mǎ kè zài chuán,', 'jǔ jiǔ yù yǐn wú guǎn xián.',
      'zuì bù chéng huān cǎn jiāng bié,', 'bié shí máng máng jiāng jìn yuè.',
      'hū wén shuǐ shàng pí pá shēng,', 'zhǔ rén wàng guī kè bù fā.',
      'xún shēng àn wèn tán zhě shuí,', 'pí pá shēng tíng yù yǔ chí.',
      'yí chuán xiāng jìn yāo xiāng jiàn,', 'tiān jiǔ huí dēng chóng kāi yàn.',
      'qiān hū wàn huàn shǐ chū lái,', 'yóu bào pí pá bàn zhē miàn.',
      'zhuǎn zhóu bō xián sān liǎng shēng,', 'wèi chéng qǔ diào xiān yǒu qíng.',
      'xián xián yǎn yì shēng shēng sī,', 'sì sù píng shēng bù dé zhì.',
      'dī méi xìn shǒu xù xù dàn,', 'shuō jìn xīn zhōng wú xiàn shì.',
      'qīng lǒng màn niǎn mǒ fù tiāo,', 'chū wéi ní cháng hòu liù yāo.',
      'dà xián cáo cáo rú jí yǔ,', 'xiǎo xián qiē qiē rú sī yǔ.',
      'cáo cáo qiē qiē cuò zá dàn,', 'dà zhū xiǎo zhū luò yù pán.',
      'jiān guān yīng yǔ huā dǐ huá,', 'yōu yè quán liú bīng xià nán.',
      'bīng quán lěng sè xián níng jué,', 'níng jué bù tōng shēng zàn xiē.',
      'bié yǒu yōu chóu àn hèn shēng,', 'cǐ shí wú shēng shèng yǒu shēng.',
      'yín píng zhà pò shuǐ jiāng bèng,', 'tiě qí tū chū dāo qiāng míng.',
      'qǔ zhōng shōu bō dāng xīn huà,', 'sì xián yī shēng rú liè bó.',
      'dōng chuán xī fǎng qiāo wú yán,', 'wéi jiàn jiāng xīn qiū yuè bái.',
      'chén yín fàng bō chā xián zhōng,', 'zhěng dùn yī shang qǐ liǎn róng.',
      'zì yán běn shì jīng chéng nǚ,', 'jiā zài há ma líng xià zhù.',
      'shí sān xué dé pí pá chéng,', 'míng shǔ jiào fāng dì yī bù.',
      'qǔ bà céng jiào shàn cái fú,', 'zhuāng chéng měi bèi qiū niáng dù.',
      'wǔ líng nián shào zhēng chán tóu,', 'yī qǔ hóng xiāo bù zhī shù.',
      'diàn tóu yín bì jī jié suì,', 'xuè sè luó qún fān jiǔ wū.',
      'jīn nián huān xiào fù míng nián,', 'qiū yuè chūn fēng děng xián dù.',
      'dì zǒu cóng jūn ā yí sǐ,', 'mù qù zhāo lái yán sè gù.',
      'mén qián lěng luò ān mǎ xī,', 'lǎo dà jià zuò shāng rén fù.',
      'shāng rén zhòng lì qīng bié lí,', 'qián yuè fú liáng mǎi chá qù.',
      'qù lái jiāng kǒu shǒu kōng chuán,', 'rào chuán yuè míng jiāng shuǐ hán.',
      'yè shēn hū mèng shào nián shì,', 'mèng tí zhuāng lèi hóng lán gān.',
      'wǒ wén pí pá yǐ tàn xī,', 'yòu wén cǐ yǔ zhòng jī jī.',
      'tóng shì tiān yá lún luò rén,', 'xiāng féng hé bì céng xiāng shí!',
      'wǒ cóng qù nián cí dì jīng,', 'zhé jū wò bìng xún yáng chéng.',
      'xún yáng dì pì wú yīn yuè,', 'zhōng suì bù wén sī zhú shēng.',
      'zhù jìn pén jiāng dì dī shī,', 'huáng lú kǔ zhú rào zhái shēng.',
      'qí jiān dàn mù wén hé wù?', 'dù juān tí xuè yuán āi míng.',
      'chūn jiāng huā zhāo qiū yuè yè,', 'wǎng wǎng qǔ jiǔ hái dú qīng.',
      'qǐ wú shān gē yǔ cūn dí?', 'ǒu yā zhāo zhā nán wéi tīng.',
      'jīn yè wén jūn pí pá yǔ,', 'rú tīng xiān lè ěr zàn míng.',
      'mò cí gèng zuò dàn yī qǔ,', 'wèi jūn fān zuò pí pá xíng.',
      'gǎn wǒ cǐ yán liáng jiǔ lì,', 'què zuò cù xián xián zhuǎn jí.',
      'qī qī bù sì xiàng qián shēng,', 'mǎn zuò chóng wén jiē yǎn qì.',
      'zuò zhōng qì xià shuí zuì duō?', 'jiāng zhōu sī mǎ qīng shān shī.'
    ],
    translation: '浔阳江头夜晚送别客人，枫叶和荻花在秋风中瑟瑟作响。主人下马客人已在船上，举起酒杯想饮酒却没有音乐。酒喝得不痛快悲惨地将分别，分别时江水茫茫映着月光。忽然听到水上传来琵琶声，主人忘记归去客人也不开船。寻着声音悄悄问弹奏者是谁，琵琶声停下想要回答又迟疑。移船靠近邀请她相见，添酒回灯重新开宴。千呼万唤她才出来，还抱着琵琶半遮着脸。转轴拨弦试弹三两声，还没成曲调先有了感情。弦弦压抑声声含思，似乎在诉说平生不得志。低眉随手连续弹奏，说尽心中无限的心事。轻拢慢捻抹复挑，先弹《霓裳羽衣曲》后弹《六幺》。大弦嘈嘈如急雨，小弦切切如私语。嘈嘈切切错杂弹，大珠小珠落玉盘。间关莺语花底滑，幽咽泉流冰下难。冰泉冷涩弦凝绝，凝绝不通声暂歇。别有幽愁暗恨生，此时无声胜有声。银瓶乍破水浆迸，铁骑突出刀枪鸣。曲终收拨当心画，四弦一声如裂帛。东船西舫悄无言，唯见江心秋月白。沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故。门前冷落鞍马稀，老大嫁作商人妇。商人重利轻别离，前月浮梁买茶去。去来江口守空船，绕船月明江水寒。夜深忽梦少年事，梦啼妆泪红阑干。我闻琵琶已叹息，又闻此语重唧唧。同是天涯沦落人，相逢何必曾相识！我从去年辞别京城，被贬官卧病在浔阳城。浔阳地处偏僻没有音乐，终年听不到丝竹之声。住在湓江附近地势低洼潮湿，黄芦苦竹环绕宅院生长。这里早晚能听到什么？杜鹃啼血猿猴哀鸣。春江花朝秋月夜，往往取酒独自倾饮。难道没有山歌和村笛？呕哑嘲哳实在难听。今夜听到你的琵琶声，如听仙乐耳朵暂时清明。不要推辞再坐下来弹一曲，我为你创作这首《琵琶行》。被我的话感动她站立良久，回身坐下把弦拧紧弹得更急。凄凄切切不像刚才的声音，满座重听都掩面哭泣。座中谁流泪最多？江州司马的青衫都湿了。',
    keywords: ['琵琶', '天涯沦落', '江州司马', '同是天涯沦落人'],
    imageDesc: '秋夜江边，琵琶女弹奏，诗人倾听，同是天涯沦落人',
    difficulty: 3,
    emotion: '悲凉、同情',
  },
  {
    id: 'c-baijuyi-002',
    title: '赋得古原草送别',
    author: '白居易',
    dynasty: '唐',
    content: ['离离原上草，', '一岁一枯荣。', '野火烧不尽，', '春风吹又生。', '远芳侵古道，', '晴翠接荒城。', '又送王孙去，', '萋萋满别情。'],
    pinyin: ['lí lí yuán shàng cǎo,', 'yī suì yī kū róng.', 'yě huǒ shāo bú jìn,', 'chūn fēng chuī yòu shēng.', 'yuǎn fāng qīn gǔ dào,', 'qíng cuì jiē huāng chéng.', 'yòu sòng wáng sūn qù,', 'qī qī mǎn bié qíng.'],
    translation: '原野上的青草长得茂盛，一年一度枯萎又繁荣。野火无法把它烧尽，春风一吹它又生长。远处的芳草蔓延到古道上，晴朗的翠色连接着荒城。又要送别远行的友人，萋萋芳草满怀着离别之情。',
    keywords: ['原上草', '野火', '春风', '送别'],
    imageDesc: '古原春草，野火烧不尽，春风吹又生',
    difficulty: 2,
    emotion: '送别、坚韧',
  },
]

// ==================== 李商隐 ====================
const LISHANGYIN_POEMS = [
  {
    id: 'c-lishangyin-001',
    title: '锦瑟',
    author: '李商隐',
    dynasty: '唐',
    content: ['锦瑟无端五十弦，', '一弦一柱思华年。', '庄生晓梦迷蝴蝶，', '望帝春心托杜鹃。', '沧海月明珠有泪，', '蓝田日暖玉生烟。', '此情可待成追忆，', '只是当时已惘然。'],
    pinyin: ['jǐn sè wú duān wǔ shí xián,', 'yī xián yī zhù sī huá nián.', 'zhuāng shēng xiǎo mèng mí hú dié,', 'wàng dì chūn xīn tuō dù juān.', 'cāng hǎi yuè míng zhū yǒu lèi,', 'lán tián rì nuǎn yù shēng yān.', 'cǐ qíng kě dài chéng zhuī yì,', 'zhǐ shì dāng shí yǐ wǎng rán.'],
    translation: '锦瑟没来由地有五十根弦，每一弦每一柱都让我思念逝去的年华。庄周清晨做梦变成了蝴蝶，望帝把伤春之心寄托给杜鹃。沧海明月下珍珠含着泪水，蓝田暖阳中美玉升起轻烟。这份感情何必等到追忆时感伤，只是在当时就已经迷惘了。',
    keywords: ['锦瑟', '华年', '蝴蝶', '杜鹃'],
    imageDesc: '锦瑟五十弦，庄生梦蝶，沧海月明，蓝田玉烟',
    difficulty: 3,
    emotion: '追忆、迷惘',
  },
  {
    id: 'c-lishangyin-002',
    title: '无题·相见时难别亦难',
    author: '李商隐',
    dynasty: '唐',
    content: ['相见时难别亦难，', '东风无力百花残。', '春蚕到死丝方尽，', '蜡炬成灰泪始干。', '晓镜但愁云鬓改，', '夜吟应觉月光寒。', '蓬山此去无多路，', '青鸟殷勤为探看。'],
    pinyin: ['xiāng jiàn shí nán bié yì nán,', 'dōng fēng wú lì bǎi huā cán.', 'chūn cán dào sǐ sī fāng jìn,', 'là jù chéng huī lèi shǐ gān.', 'xiǎo jìng dàn chóu yún bìn gǎi,', 'yè yín yīng jué yuè guāng hán.', 'péng shān cǐ qù wú duō lù,', 'qīng niǎo yīn qín wéi tàn kàn.'],
    translation: '相见很难，离别更难，东风无力百花凋零。春蚕到死才吐尽丝，蜡烛烧成灰才滴干泪。清晨照镜子只愁鬓发改变，夜晚吟诗应感到月光寒冷。蓬莱山离这里没多远，愿青鸟殷勤地为我探望。',
    keywords: ['相见', '春蚕', '蜡炬', '青鸟'],
    imageDesc: '春蚕吐丝，蜡炬成灰，离别相思之苦',
    difficulty: 3,
    emotion: '相思、执着',
  },
]

// ==================== 杜牧 ====================
const DUMU_POEMS = [
  {
    id: 'c-dumu-001',
    title: '赤壁',
    author: '杜牧',
    dynasty: '唐',
    content: ['折戟沉沙铁未销，', '自将磨洗认前朝。', '东风不与周郎便，', '铜雀春深锁二乔。'],
    pinyin: ['zhé jǐ chén shā tiě wèi xiāo,', 'zì jiāng mó xǐ rèn qián cháo.', 'dōng fēng bù yǔ zhōu láng biàn,', 'tóng què chūn shēn suǒ èr qiáo.'],
    translation: '折断的戟沉埋在沙中还没有销蚀，自己拿来磨洗认出是前朝的遗物。假如东风不给周瑜方便，铜雀台深处就会锁住大乔小乔。',
    keywords: ['赤壁', '折戟', '东风', '铜雀'],
    imageDesc: '沉沙折戟，怀古赤壁之战',
    difficulty: 2,
    emotion: '怀古、感慨',
  },
  {
    id: 'c-dumu-002',
    title: '泊秦淮',
    author: '杜牧',
    dynasty: '唐',
    content: ['烟笼寒水月笼沙，', '夜泊秦淮近酒家。', '商女不知亡国恨，', '隔江犹唱后庭花。'],
    pinyin: ['yān lǒng hán shuǐ yuè lǒng shā,', 'yè bó qín huái jìn jiǔ jiā.', 'shāng nǚ bù zhī wáng guó hèn,', 'gé jiāng yóu chàng hòu tíng huā.'],
    translation: '烟雾笼罩着寒水月光笼罩着沙滩，夜晚停泊在秦淮河畔靠近酒家。歌女不知道亡国的恨事，隔着江水还在唱《玉树后庭花》。',
    keywords: ['秦淮', '烟笼', '商女', '后庭花'],
    imageDesc: '秦淮河畔，烟笼寒水，月夜泊船',
    difficulty: 2,
    emotion: '忧国、讽刺',
  },
]

// ==================== 王昌龄 ====================
const WANGCHANGLING_POEMS = [
  {
    id: 'c-wangchangling-001',
    title: '出塞',
    author: '王昌龄',
    dynasty: '唐',
    content: ['秦时明月汉时关，', '万里长征人未还。', '但使龙城飞将在，', '不教胡马度阴山。'],
    pinyin: ['qín shí míng yuè hàn shí guān,', 'wàn lǐ cháng zhēng rén wèi huán.', 'dàn shǐ lóng chéng fēi jiàng zài,', 'bù jiào hú mǎ dù yīn shān.'],
    translation: '秦时的明月汉时的边关，万里出征的将士还没有回还。只要有龙城的飞将军在，就不会让胡人的战马越过阴山。',
    keywords: ['明月', '边关', '飞将', '阴山'],
    imageDesc: '明月边关，万里长征，将士守边',
    difficulty: 2,
    emotion: '豪迈、忧国',
  },
  {
    id: 'c-wangchangling-002',
    title: '芙蓉楼送辛渐',
    author: '王昌龄',
    dynasty: '唐',
    content: ['寒雨连江夜入吴，', '平明送客楚山孤。', '洛阳亲友如相问，', '一片冰心在玉壶。'],
    pinyin: ['hán yǔ lián jiāng yè rù wú,', 'píng míng sòng kè chǔ shān gū.', 'luò yáng qīn yǒu rú xiāng wèn,', 'yī piàn bīng xīn zài yù hú.'],
    translation: '寒雨洒满江面连夜进入吴地，天亮时送别客人只留下楚山孤影。洛阳的亲友如果问起我，就说我的心像冰一样纯洁，装在玉壶中。',
    keywords: ['寒雨', '冰心', '玉壶', '送别'],
    imageDesc: '寒雨连江，楚山孤影，冰心玉壶',
    difficulty: 2,
    emotion: '送别、高洁',
  },
]

// ==================== 刘禹锡 ====================
const LIUYUXI_POEMS = [
  {
    id: 'c-liuyuxi-001',
    title: '乌衣巷',
    author: '刘禹锡',
    dynasty: '唐',
    content: ['朱雀桥边野草花，', '乌衣巷口夕阳斜。', '旧时王谢堂前燕，', '飞入寻常百姓家。'],
    pinyin: ['zhū què qiáo biān yě cǎo huā,', 'wū yī xiàng kǒu xī yáng xié.', 'jiù shí wáng xiè táng qián yàn,', 'fēi rù xún cháng bǎi xìng jiā.'],
    translation: '朱雀桥边长满野草野花，乌衣巷口夕阳西斜。从前王导谢安堂前的燕子，如今飞入普通百姓家中。',
    keywords: ['朱雀桥', '乌衣巷', '王谢', '燕子'],
    imageDesc: '乌衣巷口夕阳斜，燕子飞入百姓家',
    difficulty: 2,
    emotion: '怀古、感慨',
  },
  {
    id: 'c-liuyuxi-002',
    title: '竹枝词',
    author: '刘禹锡',
    dynasty: '唐',
    content: ['杨柳青青江水平，', '闻郎江上唱歌声。', '东边日出西边雨，', '道是无晴却有晴。'],
    pinyin: ['yáng liǔ qīng qīng jiāng shuǐ píng,', 'wén láng jiāng shàng chàng gē shēng.', 'dōng biān rì chū xī biān yǔ,', 'dào shì wú qíng què yǒu qíng.'],
    translation: '杨柳青青江水平静，听到情郎在江上唱歌声。东边出太阳西边下雨，说是没有晴天却有晴天。',
    keywords: ['杨柳', '竹枝', '日出', '无晴'],
    imageDesc: '江边杨柳青青，少女听郎唱歌，东边日出西边雨',
    difficulty: 2,
    emotion: '爱情、含蓄',
  },
]

// ==================== 孟浩然 ====================
const MENGHAORAN_POEMS = [
  {
    id: 'c-menghaoran-001',
    title: '过故人庄',
    author: '孟浩然',
    dynasty: '唐',
    content: ['故人具鸡黍，', '邀我至田家。', '绿树村边合，', '青山郭外斜。', '开轩面场圃，', '把酒话桑麻。', '待到重阳日，', '还来就菊花。'],
    pinyin: ['gù rén jù jī shǔ,', 'yāo wǒ zhì tián jiā.', 'lǜ shù cūn biān hé,', 'qīng shān guō wài xié.', 'kāi xuān miàn cháng pǔ,', 'bǎ jiǔ huà sāng má.', 'dài dào chóng yáng rì,', 'hái lái jiù jú huā.'],
    translation: '老朋友准备了鸡肉和黄米饭，邀请我到他的田舍做客。绿树环绕着村庄，青山在城郭外横斜。打开窗户面对谷场菜园，端起酒杯谈论农事桑麻。等到重阳节那天，还要再来这里赏菊花。',
    keywords: ['鸡黍', '田家', '桑麻', '菊花'],
    imageDesc: '田园风光，绿树青山，故人相聚饮酒',
    difficulty: 2,
    emotion: '闲适、友情',
  },
  {
    id: 'c-menghaoran-002',
    title: '宿建德江',
    author: '孟浩然',
    dynasty: '唐',
    content: ['移舟泊烟渚，', '日暮客愁新。', '野旷天低树，', '江清月近人。'],
    pinyin: ['yí zhōu bó yān zhǔ,', 'rì mù kè chóu xīn.', 'yě kuàng tiān dī shù,', 'jiāng qīng yuè jìn rén.'],
    translation: '把小船停靠在烟雾迷蒙的小洲边，日落时分旅客的愁绪又涌上心头。原野空旷天幕低垂在树后，江水清澈月亮仿佛离人更近。',
    keywords: ['烟渚', '客愁', '天低树', '月近人'],
    imageDesc: '烟渚泊舟，日暮客愁，野旷天低，江清月近',
    difficulty: 2,
    emotion: '孤寂、思乡',
  },
]

// ==================== 苏轼 ====================
const SUSHI_POEMS = [
  {
    id: 'c-sushi-001',
    title: '念奴娇·赤壁怀古',
    author: '苏轼',
    dynasty: '宋',
    content: ['大江东去，浪淘尽，千古风流人物。', '故垒西边，人道是，三国周郎赤壁。', '乱石穿空，惊涛拍岸，卷起千堆雪。', '江山如画，一时多少豪杰。', '遥想公瑾当年，小乔初嫁了，雄姿英发。', '羽扇纶巾，谈笑间，樯橹灰飞烟灭。', '故国神游，多情应笑我，早生华发。', '人生如梦，一尊还酹江月。'],
    pinyin: ['dà jiāng dōng qù, làng táo jìn, qiān gǔ fēng liú rén wù.', 'gù lěi xī biān, rén dào shì, sān guó zhōu láng chì bì.', 'luàn shí chuān kōng, jīng tāo pāi àn, juǎn qǐ qiān duī xuě.', 'jiāng shān rú huà, yī shí duō shǎo háo jié.', 'yáo xiǎng gōng jǐn dāng nián, xiǎo qiáo chū jià le, xióng zī yīng fā.', 'yǔ shàn guān jīn, tán xiào jiān, qiáng lǔ huī fēi yān miè.', 'gù guó shén yóu, duō qíng yīng xiào wǒ, zǎo shēng huá fà.', 'rén shēng rú mèng, yī zūn huán lèi jiāng yuè.'],
    translation: '大江向东流去，波浪淘尽了多少千古风流人物。旧营垒的西边，人们说那是三国周瑜鏖战的赤壁。陡峭的石壁直插云霄，惊人的巨浪拍打着江岸，卷起千万堆白雪似的浪花。江山美丽如画，一时间涌现了多少英雄豪杰。遥想当年的周瑜，小乔刚嫁给他，他姿态雄峻英气勃发。手持羽扇头戴纶巾，谈笑之间，曹操的战船就灰飞烟灭。神游故国，多情的人应该笑我，过早地生出了白发。人生如梦，还是举起酒杯祭奠江上的明月吧。',
    keywords: ['大江', '赤壁', '周郎', '羽扇纶巾'],
    imageDesc: '赤壁之战，大江奔流，英雄豪杰',
    difficulty: 3,
    emotion: '豪迈、感慨',
    isCi: true,
  },
  {
    id: 'c-sushi-002',
    title: '水调歌头·明月几时有',
    author: '苏轼',
    dynasty: '宋',
    content: ['明月几时有？把酒问青天。', '不知天上宫阙，今夕是何年。', '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。', '起舞弄清影，何似在人间。', '转朱阁，低绮户，照无眠。', '不应有恨，何事长向别时圆？', '人有悲欢离合，月有阴晴圆缺，此事古难全。', '但愿人长久，千里共婵娟。'],
    pinyin: ['míng yuè jǐ shí yǒu? bǎ jiǔ wèn qīng tiān.', 'bù zhī tiān shàng gōng què, jīn xī shì hé nián.', 'wǒ yù chéng fēng guī qù, yòu kǒng qióng lóu yù yǔ, gāo chù bù shèng hán.', 'qǐ wǔ nòng qīng yǐng, hé sì zài rén jiān.', 'zhuǎn zhū gé, dī qǐ hù, zhào wú mián.', 'bù yīng yǒu hèn, hé shì cháng xiàng bié shí yuán?', 'rén yǒu bēi huān lí hé, yuè yǒu yīn qíng yuán quē, cǐ shì gǔ nán quán.', 'dàn yuàn rén cháng jiǔ, qiān lǐ gòng chán juān.'],
    translation: '明月从什么时候开始有的？我端起酒杯问苍天。不知道天上的宫殿，今晚是哪一年。我想乘风回到天上去，又担心美玉砌成的楼阁太高，我经受不住寒冷。起身舞蹈玩赏着月光下的影子，哪里比得上在人间。月光转过朱红楼阁，低低照进雕花窗户，照着无法入眠的人。月亮不应该有怨恨，为什么总在人们离别时才圆？人有悲欢离合，月有阴晴圆缺，这种事自古以来就难以周全。只希望人们平安长久，即使相隔千里也能共赏这美好的月光。',
    keywords: ['明月', '青天', '婵娟', '悲欢离合'],
    imageDesc: '中秋望月，把酒问天，千里共婵娟',
    difficulty: 3,
    emotion: '思念、旷达',
    isCi: true,
  },
  {
    id: 'c-sushi-003',
    title: '江城子·密州出猎',
    author: '苏轼',
    dynasty: '宋',
    content: ['老夫聊发少年狂，左牵黄，右擎苍。', '锦帽貂裘，千骑卷平冈。', '为报倾城随太守，亲射虎，看孙郎。', '酒酣胸胆尚开张，鬓微霜，又何妨！', '持节云中，何日遣冯唐？', '会挽雕弓如满月，西北望，射天狼。'],
    pinyin: ['lǎo fū liáo fā shào nián kuáng, zuǒ qiān huáng, yòu qíng cāng.', 'jǐn mào diāo qiú, qiān jì juǎn píng gāng.', 'wèi bào qīng chéng suí tài shǒu, qīn shè hǔ, kàn sūn láng.', 'jiǔ hān xiōng dǎn shàng kāi zhāng, bìn wēi shuāng, yòu hé fáng!', 'chí jié yún zhōng, hé rì qiǎn féng táng?', 'huì wǎn diāo gōng rú mǎn yuè, xī běi wàng, shè tiān láng.'],
    translation: '老夫姑且发一发少年狂，左手牵着黄犬，右手举着苍鹰。头戴锦帽身穿貂裘，千骑奔驰席卷平坦的山冈。为了报答全城百姓跟随太守，我要亲自射虎，像当年的孙权一样。酒酣耳热胸怀胆气更加豪壮，鬓角微白又有什么关系！什么时候朝廷能像派冯唐赦免魏尚那样重用我？我要拉开雕弓像满月一样，向西北望去，射向那天狼星。',
    keywords: ['少年狂', '射虎', '雕弓', '天狼'],
    imageDesc: '出猎场面，左牵黄右擎苍，挽弓射天狼',
    difficulty: 3,
    emotion: '豪迈、报国',
    isCi: true,
  },
]

// ==================== 李清照 ====================
const LIQINGZHAO_POEMS = [
  {
    id: 'c-liqingzhao-001',
    title: '如梦令·昨夜雨疏风骤',
    author: '李清照',
    dynasty: '宋',
    content: ['昨夜雨疏风骤，', '浓睡不消残酒。', '试问卷帘人，', '却道海棠依旧。', '知否，知否？', '应是绿肥红瘦。'],
    pinyin: ['zuó yè yǔ shū fēng zhòu,', 'nóng shuì bù xiāo cán jiǔ.', 'shì wèn juàn lián rén,', 'què dào hǎi táng yī jiù.', 'zhī fǒu, zhī fǒu?', 'yīng shì lǜ féi hóng shòu.'],
    translation: '昨夜雨点稀疏风势猛烈，沉睡一夜仍有余醉未消。试着问卷帘的侍女，她却说海棠花依然如旧。知道吗？知道吗？应该是绿叶繁茂红花凋零了。',
    keywords: ['雨疏风骤', '海棠', '绿肥红瘦'],
    imageDesc: '雨后清晨，询问海棠，绿肥红瘦',
    difficulty: 2,
    emotion: '惜春、细腻',
    isCi: true,
  },
  {
    id: 'c-liqingzhao-002',
    title: '声声慢·寻寻觅觅',
    author: '李清照',
    dynasty: '宋',
    content: ['寻寻觅觅，冷冷清清，凄凄惨惨戚戚。', '乍暖还寒时候，最难将息。', '三杯两盏淡酒，怎敌他、晚来风急？', '雁过也，正伤心，却是旧时相识。', '满地黄花堆积，憔悴损，如今有谁堪摘？', '守着窗儿，独自怎生得黑？', '梧桐更兼细雨，到黄昏、点点滴滴。', '这次第，怎一个愁字了得！'],
    pinyin: ['xún xún mì mì, lěng lěng qīng qīng, qī qī cǎn cǎn qī qī.', 'zhà nuǎn huán hán shí hòu, zuì nán jiāng xī.', 'sān bēi liǎng zhǎn dàn jiǔ, zěn dí tā, wǎn lái fēng jí?', 'yàn guò yě, zhèng shāng xīn, què shì jiù shí xiāng shí.', 'mǎn dì huáng huā duī jī, qiáo cuì sǔn, rú jīn yǒu shuí kān zhāi?', 'shǒu zhe chuāng ér, dú zì zěn shēng dé hēi?', 'wú tóng gèng jiān xì yǔ, dào huáng hūn, diǎn diǎn dī dī.', 'zhè cì dì, zěn yī gè chóu zì liǎo dé!'],
    translation: '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。天气忽暖忽冷的时候，最难调养休息。喝几杯淡酒，怎么能抵挡傍晚的急风？大雁飞过，正伤心，却是从前相识的旧雁。满地菊花堆积，已经憔悴不堪，如今还有谁忍心去摘？守着窗户，一个人怎么挨到天黑？梧桐叶上又加上细雨，到黄昏时分点点滴滴。这般情景，怎一个愁字能概括得了！',
    keywords: ['寻寻觅觅', '雁过', '黄花', '梧桐细雨'],
    imageDesc: '秋日黄昏，梧桐细雨，满地黄花，独自守窗',
    difficulty: 3,
    emotion: '凄苦、愁绪',
    isCi: true,
  },
]

// ==================== 辛弃疾 ====================
const XINQIJI_POEMS = [
  {
    id: 'c-xinqiji-001',
    title: '永遇乐·京口北固亭怀古',
    author: '辛弃疾',
    dynasty: '宋',
    content: ['千古江山，英雄无觅，孙仲谋处。', '舞榭歌台，风流总被，雨打风吹去。', '斜阳草树，寻常巷陌，人道寄奴曾住。', '想当年，金戈铁马，气吞万里如虎。', '元嘉草草，封狼居胥，赢得仓皇北顾。', '四十三年，望中犹记，烽火扬州路。', '可堪回首，佛狸祠下，一片神鸦社鼓。', '凭谁问，廉颇老矣，尚能饭否？'],
    pinyin: ['qiān gǔ jiāng shān, yīng xióng wú mì, sūn zhòng móu chù.', 'wǔ xiè gē tái, fēng liú zǒng bèi, yǔ dǎ fēng chuī qù.', 'xié yáng cǎo shù, xún cháng xiàng mò, rén dào jì nú céng zhù.', 'xiǎng dāng nián, jīn gē tiě mǎ, qì tūn wàn lǐ rú hǔ.', 'yuán jiā cǎo cǎo, fēng láng jū xū, yíng dé cāng huáng běi gù.', 'sì shí sān nián, wàng zhōng yóu jì, fēng huǒ yáng zhōu lù.', 'kě kān huí shǒu, bì lí cí xià, yī piàn shén yā shè gǔ.', 'píng shuí wèn, lián pō lǎo yǐ, shàng néng fàn fǒu?'],
    translation: '千古江山，再也找不到像孙权那样的英雄。当年的舞榭歌台，那些风流韵事都被雨打风吹去。斜阳照着草树，普通街巷里，人们说刘裕曾住在这里。想当年，他金戈铁马，气势如猛虎吞并万里。元嘉年间草率北伐，想建立封狼居胥的功业，却落得仓皇败退。四十三年过去，遥望中原还记得扬州路上的烽火。怎能回首，佛狸祠下，一片乌鸦叫声和社日鼓声。有谁会问，廉颇老了，还能吃饭吗？',
    keywords: ['千古江山', '金戈铁马', '廉颇', '北固亭'],
    imageDesc: '北固亭怀古，金戈铁马，英雄气概',
    difficulty: 3,
    emotion: '豪迈、忧国',
    isCi: true,
  },
  {
    id: 'c-xinqiji-002',
    title: '青玉案·元夕',
    author: '辛弃疾',
    dynasty: '宋',
    content: ['东风夜放花千树，更吹落，星如雨。', '宝马雕车香满路。', '凤箫声动，玉壶光转，一夜鱼龙舞。', '蛾儿雪柳黄金缕，笑语盈盈暗香去。', '众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。'],
    pinyin: ['dōng fēng yè fàng huā qiān shù, gèng chuī luò, xīng rú yǔ.', 'bǎo mǎ diāo chē xiāng mǎn lù.', 'fèng xiāo shēng dòng, yù hú guāng zhuǎn, yī yè yú lóng wǔ.', 'é ér xuě liǔ huáng jīn lǚ, xiào yǔ yíng yíng àn xiāng qù.', 'zhòng lǐ xún tā qiān bǎi dù, mò rán huí shǒu, nà rén què zài, dēng huǒ lán shān chù.'],
    translation: '东风吹开了元宵夜的火树银花，花灯灿烂像千树花开。焰火纷纷，乱落如雨，又像是满天星斗被吹落。豪华的马车满路芳香。凤箫声悠扬回荡，明月渐渐西斜，鱼灯龙灯彻夜飞舞。美人头上戴着蛾儿、雪柳、黄金丝，笑语盈盈地走过，只留下淡淡香气。在人群中寻找她千百次，忽然回头，那人却在灯火稀疏的地方。',
    keywords: ['花千树', '星如雨', '千百度', '灯火阑珊'],
    imageDesc: '元宵灯火，花千树星如雨，蓦然回首',
    difficulty: 3,
    emotion: '浪漫、惊喜',
    isCi: true,
  },
]

// ==================== 陆游 ====================
const LUYOU_POEMS = [
  {
    id: 'c-luyou-001',
    title: '示儿',
    author: '陆游',
    dynasty: '宋',
    content: ['死去元知万事空，', '但悲不见九州同。', '王师北定中原日，', '家祭无忘告乃翁。'],
    pinyin: ['sǐ qù yuán zhī wàn shì kōng,', 'dàn bēi bú jiàn jiǔ zhōu tóng.', 'wáng shī běi dìng zhōng yuán rì,', 'jiā jì wú wàng gào nǎi wēng.'],
    translation: '死去本来就知道万事皆空，只是悲伤没能见到国家统一。当大宋军队收复中原失地的那一天，家祭时不要忘记告诉我。',
    keywords: ['九州同', '王师', '中原', '家祭'],
    imageDesc: '临终遗嘱，心系国家统一',
    difficulty: 2,
    emotion: '爱国、悲愤',
  },
  {
    id: 'c-luyou-002',
    title: '钗头凤·红酥手',
    author: '陆游',
    dynasty: '宋',
    content: ['红酥手，黄縢酒，满城春色宫墙柳。', '东风恶，欢情薄。', '一怀愁绪，几年离索。', '错、错、错。', '春如旧，人空瘦，泪痕红浥鲛绡透。', '桃花落，闲池阁。', '山盟虽在，锦书难托。', '莫、莫、莫！'],
    pinyin: ['hóng sū shǒu, huáng téng jiǔ, mǎn chéng chūn sè gōng qiáng liǔ.', 'dōng fēng è, huān qíng báo.', 'yī huái chóu xù, jǐ nián lí suǒ.', 'cuò, cuò, cuò.', 'chūn rú jiù, rén kōng shòu, lèi hén hóng yì jiāo xiāo tòu.', 'táo huā luò, xián chí gé.', 'shān méng suī zài, jǐn shū nán tuō.', 'mò, mò, mò!'],
    translation: '红润柔软的手，捧着黄封酒，满城春色宫墙边的杨柳。东风无情，欢情淡薄。满怀愁绪，几年离群索居。错、错、错！春天依旧，人已消瘦，泪痕把鲛绡手帕湿透。桃花飘落，池阁空闲。山盟虽在，锦书难托。莫、莫、莫！',
    keywords: ['红酥手', '黄縢酒', '东风恶', '错错错'],
    imageDesc: '沈园重逢，红酥手黄縢酒，爱情悲剧',
    difficulty: 3,
    emotion: '悲痛、悔恨',
    isCi: true,
  },
]

// ==================== 杨万里 ====================
const YANGWANLI_POEMS = [
  {
    id: 'c-yangwanli-001',
    title: '闲居初夏午睡起',
    author: '杨万里',
    dynasty: '宋',
    content: ['梅子留酸软齿牙，', '芭蕉分绿与窗纱。', '日长睡起无情思，', '闲看儿童捉柳花。'],
    pinyin: ['méi zǐ liú suān ruǎn chǐ yá,', 'bā jiāo fēn lǜ yǔ chuāng shā.', 'rì cháng shuì qǐ wú qíng sī,', 'xián kàn ér tóng zhuō liǔ huā.'],
    translation: '梅子的酸味还留在牙齿间，芭蕉的绿色映照在窗纱上。夏日漫长，午睡醒来没有什么思绪，闲看儿童追逐捕捉柳絮。',
    keywords: ['梅子', '芭蕉', '柳花', '闲居'],
    imageDesc: '初夏闲居，芭蕉映窗，儿童捉柳花',
    difficulty: 2,
    emotion: '闲适、恬淡',
  },
]

// ==================== 马致远 ====================
const MAYUAN_POEMS = [
  {
    id: 'c-mayuan-001',
    title: '天净沙·秋思',
    author: '马致远',
    dynasty: '元',
    content: ['枯藤老树昏鸦，', '小桥流水人家，', '古道西风瘦马。', '夕阳西下，', '断肠人在天涯。'],
    pinyin: ['kū téng lǎo shù hūn yā,', 'xiǎo qiáo liú shuǐ rén jiā,', 'gǔ dào xī fēng shòu mǎ.', 'xī yáng xī xià,', 'duàn cháng rén zài tiān yá.'],
    translation: '枯藤缠绕着老树，黄昏时乌鸦归巢，小桥下流水潺潺，旁边有几户人家。古老的道路上西风吹着瘦马。夕阳西下，漂泊天涯的断肠人还在远方。',
    keywords: ['枯藤', '老树', '昏鸦', '断肠人'],
    imageDesc: '秋日黄昏，枯藤老树，小桥流水，古道瘦马',
    difficulty: 2,
    emotion: '思乡、悲凉',
    isCi: true,
  },
  {
    id: 'c-mayuan-002',
    title: '寿阳曲·远浦帆归',
    author: '马致远',
    dynasty: '元',
    content: ['夕阳下，酒旆闲，', '两三航未曾着岸。', '落花水香茅舍晚，', '断桥头卖鱼人散。'],
    pinyin: ['xī yáng xià, jiǔ pèi xián,', 'liǎng sān háng wèi céng zhuó àn.', 'luò huā shuǐ xiāng máo shè wǎn,', 'duàn qiáo tóu mài yú rén sàn.'],
    translation: '夕阳西下，酒旗悠闲地飘动，两三只船还没有靠岸。落花飘香，茅舍在暮色中，断桥头的卖鱼人已经散去。',
    keywords: ['夕阳', '酒旆', '落花', '茅舍'],
    imageDesc: '渔村晚景，夕阳酒旗，落花水香',
    difficulty: 2,
    emotion: '宁静、恬淡',
    isCi: true,
  },

  // 王安石
  {
    id: 'c-wanganshi-001',
    title: '元日',
    author: '王安石',
    dynasty: '宋',
    content: ['爆竹声中一岁除，', '春风送暖入屠苏。', '千门万户曈曈日，', '总把新桃换旧符。'],
    pinyin: ['bào zhú shēng zhōng yī suì chú,', 'chūn fēng sòng nuǎn rù tú sū.', 'qiān mén wàn hù tóng tóng rì,', 'zǒng bǎ xīn táo huàn jiù fú.'],
    translation: '在噼噼作响的爆竹声中，旧的一年已经过去。春风送暖，人们畅饮屠苏酒。千家万户在旭日东升的阳光下，都用新桃符换下旧桃符。',
    keywords: ['元日', '春风', '屠苏', '新桃旧符'],
    imageDesc: '新春喜庆，鞭炮齐鸣，春风送暖',
    difficulty: 1,
    emotion: '喜悦、迎新',
  },
  {
    id: 'c-wanganshi-002',
    title: '泊船瓜洲',
    author: '王安石',
    dynasty: '宋',
    content: ['京口瓜洲一水间，', '钟山只隔数重山。', '春风又绿江南岸，', '明月何时照我还。'],
    pinyin: ['jīng kǒu guā zhōu yī shuǐ jiān,', 'zhōng shān zhǐ gé shù zhòng shān.', 'chūn fēng yòu lǜ jiāng nán àn,', 'míng yuè hé shí zhào wǒ hái.'],
    translation: '京口和瓜洲只隔一条江水，从钟山到这儿也只隔几重山。春风又一次吹绿了江南的河岸，明月什么时候才能照着我返回故乡呢？',
    keywords: ['春风', '绿江南', '明月', '思乡'],
    imageDesc: '长江两岸，春风拂绿，明月当空',
    difficulty: 1,
    emotion: '思乡、感慨',
  },
  {
    id: 'c-wanganshi-003',
    title: '梅花',
    author: '王安石',
    dynasty: '宋',
    content: ['墙角数枝梅，', '凌寒独自开。', '遥知不是雪，', '为有暗香来。'],
    pinyin: ['qiáng jiǎo shù zhī méi,', 'líng hán dú zì kāi.', 'yáo zhī bù shì xuě,', 'wèi yǒu àn xiāng lái.'],
    translation: '墙角有几枝梅花，冒着严寒独自开放。远远看去就知道那不是雪，因为有暗暗的香气飘来。',
    keywords: ['梅花', '凌寒', '暗香', '坚强'],
    imageDesc: '墙角寒梅，独自绽放，暗香浮动',
    difficulty: 1,
    emotion: '坚韧、高洁',
  },

  // 贺知章
  {
    id: 'c-hezhizhang-001',
    title: '咏柳',
    author: '贺知章',
    dynasty: '唐',
    content: ['碧玉妆成一树高，', '万条垂下绿丝绦。', '不知细叶谁裁出，', '二月春风似剪刀。'],
    pinyin: ['bì yù zhuāng chéng yī shù gāo,', 'wàn tiáo chuí xià lǜ sī tāo.', 'bù zhī xì yè shuí cái chū,', 'èr yuè chūn fēng sì jiǎn dāo.'],
    translation: '高高的柳树好像用碧玉装饰而成，万千条柳枝垂下像绿色的丝带。不知道这细密的柳叶是谁裁剪出来的，原来是二月的春风像剪刀一样。',
    keywords: ['柳树', '春风', '丝绦', '剪刀'],
    imageDesc: '春风拂柳，万条垂丝，碧玉妆成',
    difficulty: 1,
    emotion: '欣喜、赞美',
  },
  {
    id: 'c-hezhizhang-002',
    title: '回乡偶书',
    author: '贺知章',
    dynasty: '唐',
    content: ['少小离家老大回，', '乡音无改鬓毛衰。', '儿童相见不相识，', '笑问客从何处来。'],
    pinyin: ['shǎo xiǎo lí jiā lǎo dà huí,', 'xiāng yīn wú gǎi bìn máo shuāi.', 'ér tóng xiāng jiàn bù xiāng shí,', 'xiào wèn kè cóng hé chǔ lái.'],
    translation: '少年时离开家乡，年老了才回来。乡音没有改变，但鬓发已经稀疏变白。孩子们见到我却不认识，笑着问我从哪里来。',
    keywords: ['乡音', '鬓毛', '儿童', '故乡'],
    imageDesc: '老者归乡，儿童笑问，物是人非',
    difficulty: 1,
    emotion: '感慨、温馨',
  },

  // 范仲淹
  {
    id: 'c-fanzhongyan-001',
    title: '渔家傲·秋思',
    author: '范仲淹',
    dynasty: '宋',
    content: ['塞下秋来风景异，', '衡阳雁去无留意。', '四面边声连角起，', '千嶂里，', '长烟落日孤城闭。', '浊酒一杯家万里，', '燕然未勒归无计。', '羌管悠悠霜满地，', '人不寐，', '将军白发征夫泪。'],
    pinyin: ['sài xià qiū lái fēng jǐng yì,', 'héng yáng yàn qù wú liú yì.', 'sì miàn biān shēng lián jiǎo qǐ,', 'qiān zhàng lǐ,', 'cháng yān luò rì gū chéng bì.', 'zhuó jiǔ yī bēi jiāng wàn lǐ,', 'yān rán wèi lè guī wú jì.', 'qiāng guǎn yōu yōu shuāng mǎn dì,', 'rén bù mèi,', 'jiāng jūn bái fà zhēng fū lèi.'],
    translation: '边塞的秋天风景与内地不同，衡阳的大雁飞去毫不留恋。四面八方的边声随着号角响起，在层峦叠嶂中，炊烟袅袅，夕阳西下，孤城紧闭。喝一杯浊酒思念万里之外的家乡，但燕然山还未刻石记功，无法回去。羌笛声悠扬，霜雪满地。将军和征夫都无法入睡，思念家乡的泪水流满了面颊。',
    keywords: ['边塞', '秋思', '浊酒', '归无计'],
    imageDesc: '边塞秋景，孤城落日，羌管悠扬',
    difficulty: 3,
    emotion: '悲壮、思乡',
    isCi: true,
  },

  // 晏殊
  {
    id: 'c-yanshu-001',
    title: '浣溪沙·一曲新词酒一杯',
    author: '晏殊',
    dynasty: '宋',
    content: ['一曲新词酒一杯，', '去年天气旧亭台。', '夕阳西下几时回？', '无可奈何花落去，', '似曾相识燕归来。', '小园香径独徘徊。'],
    pinyin: ['yī qǔ xīn cí jiǔ yī bēi,', 'qù nián tiān qì jiù tíng tái.', 'xī yáng xī xià jǐ shí huí?', 'wú kě nài hé huā luò qù,', 'sì céng xiāng shí yàn guī lái.', 'xiǎo yuán xiāng jìng dú pái huái.'],
    translation: '填一首新词喝一杯酒，还是去年的天气和旧的亭台。夕阳西下，什么时候才能回来？花朵凋落，无法挽留燕子却像认识一样归来。在小园的花径上独自徘徊。',
    keywords: ['新词', '夕阳', '花落燕归', '徘徊'],
    imageDesc: '小园春暮，新词浊酒，燕子归来',
    difficulty: 2,
    emotion: '惆怅、珍惜',
    isCi: true,
  },

  // 柳永
  {
    id: 'c-liuyong-001',
    title: '雨霖铃·寒蝉凄切',
    author: '柳永',
    dynasty: '宋',
    content: ['寒蝉凄切，', '对长亭晚，', '骤雨初歇。', '都门帐饮无绪，', '留恋处，', '兰舟催发。', '执手相看泪眼，', '竟无语凝噎。', '念去去，', '千里烟波，', '暮霭沉沉楚天阔。', '多情自古伤离别，', '更那堪，', '冷落清秋节！', '今宵酒醒何处？', '杨柳岸，', '晓风残月。', '此去经年，', '应是良辰好景虚设。', '便纵有千种风情，', '更与何人说？'],
    pinyin: ['hán chán qī qiè,', 'duì cháng tíng wǎn,', 'zhòu yǔ chū xiē.', 'dū mén zhàng yǐn wú xù,', 'liú liàn chù,', 'lán zhōu cuī fā.', 'zhí shǒu xiāng kàn lèi yǎn,', 'jìng wú yǔ níng yē.', 'niàn qù qù,', 'qiān lǐ yān bō,', 'mù ǎi chén chén chǔ tiān kuò.', 'duō qíng zì gǔ shāng lí bié,', 'gèng nà kān,', 'lěng luò qiū qiū jié!', 'jīn xiāo jiǔ xǐng hé chù?', 'yáng liǔ àn,', 'xiǎo fēng cán yuè.', 'cǐ qù jīng nián,', 'yìng shì liáng chén hǎo jǐng xū shè.', 'biàn zòng yǒu qiān zhǒng fēng qíng,', 'gèng yǔ hé rén shuō?'],
    translation: '秋蝉凄凉地鸣叫已是傍晚时分，长亭外骤雨刚停。在京城门外设帐饮酒却没有情绪，正留恋时，船夫催着出发。握着手互相看着含泪的眼睛，竟然哽咽得说不出话。想到这一去千里烟波，暮色苍茫楚天广阔。自古多情的人就悲伤离别，更何况在这清冷的秋天！今晚酒醒后在哪里？杨柳岸边，晨风残月。这一去就是一年，即使是良辰美景也是虚设。纵然有千种风情，又能和谁说呢？',
    keywords: ['寒蝉', '离别', '杨柳岸', '晓风残月'],
    imageDesc: '长亭晚别，寒蝉凄切，晓风残月',
    difficulty: 3,
    emotion: '离别、悲伤',
    isCi: true,
  },

  // 岳飞
  {
    id: 'c-yuefei-001',
    title: '满江红·写怀',
    author: '岳飞',
    dynasty: '宋',
    content: ['怒发冲冠，', '凭栏处、', '潇潇雨歇。', '抬望眼，', '仰天长啸，', '壮怀激烈。', '三十功名尘与土，', '八千里路云和月。', '莫等闲，', '白了少年头，', '空悲切！', '靖康耻，', '犹未雪。', '臣子恨，', '何时灭！', '驾长车，', '踏破贺兰山缺。', '壮志饥餐胡虏肉，', '笑谈渴饮匈奴血。', '待从头、', '收拾旧山河，', '朝天阙。'],
    pinyin: ['nù fā chōng guān,', 'píng lán chù、', 'xiāo xiāo yǔ xiē.', 'tái wàng yǎn,', 'yǎng tiān cháng xiào,', 'zhuàng huái jī liè.', 'sān shí gōng míng chén yǔ tǔ,', 'bā qiān lǐ lù yún hé yuè.', 'mò děng xián,', 'bái le shào nián tóu,', 'kōng bēi qiè!', 'jìng kāng chǐ,', 'yóu wèi xuě.', 'chén zǐ hèn,', 'shí shí miè!', 'jià cháng chē,', 'tà pò hè lán shān quē.', 'zhuàng zhì jī hú lǔ ròu,', 'xiào tán kě yǐn xiōng nú xuè.', 'dài cóng tóu、', 'shōu shí jiù shān hé,', 'tiān quē.'],
    translation: '愤怒得头发竖起冲帽子，靠在栏杆处，骤雨刚刚停下来。抬头远望，对着天空长啸，壮志胸怀激烈。三十年的功名如同尘土，八千里的路程伴着云月。不要虚度年华，等头发花白时徒然悲切！靖康年的耻辱，还没有洗雪。臣子的仇恨，什么时候才能消灭！驾着战车，踏破贺兰山的缺口。壮志凌云，饿了就吃敌人的肉，谈笑间渴了就喝匈奴的血。待从头开始，收复旧日山河，朝拜皇帝。',
    keywords: ['满江红', '壮怀激烈', '靖康耻', '精忠报国'],
    imageDesc: '凭栏长啸，壮志豪情，精忠报国',
    difficulty: 3,
    emotion: '悲壮、激昂',
    isCi: true,
  },

  // 曹操
  {
    id: 'c-caocao-001',
    title: '观沧海',
    author: '曹操',
    dynasty: '汉',
    content: ['东临碣石，', '以观沧海。', '水何澹澹，', '山岛竦峙。', '树木丛生，', '百草丰茂。', '秋风萧瑟，', '洪波涌起。', '日月之行，', '若出其中。', '星汉灿烂，', '若出其里。', '幸甚至哉，', '歌以咏志。'],
    pinyin: ['dōng lín jié shí,', 'yǐ guān cāng hǎi.', 'shuǐ hé dàn dàn,', 'shān dǎo sǒng zhì.', 'shù mù cóng shēng,', 'bǎi cǎo fēng mào.', 'qiū fēng xiāo sè,', 'hóng bō yǒng qǐ.', 'rì yuè zhī xíng,', 'ruò chū qí zhōng.', 'xīng hàn càn làn,', 'ruò chū qí lǐ.', 'xìng shèn zhì zāi,', 'gē yǐ yǒng zhì.'],
    translation: '东行登上碣石山，来观看苍茫的大海。海水波涛起伏，山岛高耸挺立。岛上树木郁郁葱葱，各种草繁茂生长。秋风吹来萧瑟的声音，巨大的波浪汹涌而起。日月的运行，好像从这海洋中升起。银河星光灿烂，好像从这海洋中涌出。真是幸运极了，用诗歌来表达我的志向。',
    keywords: ['沧海', '碣石', '日月', '星汉'],
    imageDesc: '碣石观海，波涛汹涌，日月之行',
    difficulty: 2,
    emotion: '豪迈、壮观',
  },
  {
    id: 'c-caocao-002',
    title: '龟虽寿',
    author: '曹操',
    dynasty: '汉',
    content: ['神龟虽寿，', '犹有竟时。', '腾蛇乘雾，', '终为土灰。', '老骥伏枥，', '志在千里。', '烈士暮年，', '壮心不已。', '盈缩之期，', '不但在天。', '养怡之福，', '可得永年。', '幸甚至哉，', '歌以咏志。'],
    pinyin: ['shén guī suī shòu,', 'yóu yǒu jìng shí.', 'téng shé chéng wù,', 'zhōng wéi tǔ huī.', 'lǎo jì fú lì,', 'zhì zài qiān lǐ.', 'liè shì mù nián,', 'zhuàng xīn bù yǐ.', 'yíng suō zhī qī,', 'bù dàn zài tiān.', 'yǎng yí zhī fú,', 'kě dé yǒng nián.', 'xìng shèn zhì zāi,', 'gē yǒng yǒng zhì.'],
    translation: '神龟虽然长寿，终究还是有死亡的时候。腾蛇虽然能乘雾飞行，最终也会变成土灰。老马伏在马槽旁，志向还在千里之外。有志之士到了晚年，壮志雄心仍然不已。人的寿命长短，不完全由天决定。保养身心的福气，可以延年益寿。真是幸运极了，用诗歌来表达我的志向。',
    keywords: ['神龟', '老骥伏枥', '壮心不已', '养怡'],
    imageDesc: '老骥伏枥，志在千里，壮心不已',
    difficulty: 2,
    emotion: '豪迈、积极',
  },

  // 曹植
  {
    id: 'c-caozhi-001',
    title: '七步诗',
    author: '曹植',
    dynasty: '魏',
    content: ['煮豆持作羹，', '漉豉以为汁。', '萁在釜下燃，', '豆在釜中泣。', '本是同根生，', '相煎何太急。'],
    pinyin: ['zhǔ dòu chí zuò gēng,', 'lù chǐ yǐ wéi zhī.', 'qí zài fǔ xià rán,', 'dòu zài fǔ zhōng qì.', 'běn shì tóng gēn shēng,', 'xiāng jiān hé tài jí.'],
    translation: '煮豆子来做羹，过滤豆豉来取汁。豆萁在锅下燃烧，豆子在锅中哭泣。我们本是同根所生，为什么相互煎逼如此急迫呢？',
    keywords: ['同根生', '相煎', '豆萁', '兄弟'],
    imageDesc: '同根相煎，豆萁豆子，亲情悲剧',
    difficulty: 1,
    emotion: '悲愤、无奈',
  },
  {
    id: 'c-caozhi-002',
    title: '白马篇',
    author: '曹植',
    dynasty: '魏',
    content: ['白马饰金羁，', '连翩西北驰。', '借问谁家子，', '幽并游侠儿。', '少小去乡邑，', '扬声沙漠垂。', '宿昔秉良弓，', '楛矢何参差。', '控弦破左的，', '右发摧月支。', '仰手接飞猱，', '俯身散马蹄。', '狡捷过猴猿，', '勇剽若豹螭。', '边城多警急，', '胡虏数迁移。', '羽檄从北来，', '厉马登高堤。', '长驱蹈匈奴，', '左顾凌鲜卑。', '弃身锋刃端，', '性命安可怀？', '父母且不顾，', '何言子与妻！', '名编壮士籍，', '不得中顾私。', '捐躯赴国难，', '视死忽如归！'],
    pinyin: ['bái mǎ shì jīn jī,', 'lián piān xī běi chí.', 'jié wèn shuí jiā zǐ,', 'yōu bìng yóu xiá ér.', 'shǎo xiǎo qù xiāng yì,', 'yáng shēng shā mò chuí.', 'xī xī bǐng liáng gōng,', 'hǔ shǐ hé cēn cī.', 'kòng xián pò zuǒ dì,', 'yòu fā cuī yuè zhī.', 'yǎng shǒu jiē fēng náo,', 'fǔ shēn sàn mǎ tí.', 'jiǎo jié guò hóu yuán,', 'yǒng piāo ruò bào chī.', 'biān chéng duō jǐng jí,', 'hú lǔ shù qiān yí.', 'yǔ xǐcóng běi lái,', 'lì mǎ dēng gāo dī.', 'cháng qū dān xiōng nú,', 'zuǒ gù líng xiān bēi.', 'qū shēn fēng rèn duān,', 'xìng mìng ān kě huái?', 'fǔ mǔ qiě bù gù,', 'hé yán zǐ yǔ qī!', 'míng biān zhuàng shì jí,', 'bù dé zhōng gù sī.', 'juān qū fù guó nán,', 'shì sǐ hū rú guī!'],
    translation: '白马装饰着金色马笼头，向西北方向奔驰而去。请问这是谁家的孩子，是幽州并州的游侠儿。少年时就离开了家乡，在沙漠边垂扬名。随时携带良弓，楛木箭参差不齐。开弓射左边的目标，射右边的月支。抬手接住飞驰的猿猴，俯身射散马蹄。敏捷超过猴猿，勇猛如豹螭。边城多次告急，匈奴频繁侵犯。羽檄从北方传来，策马登上高堤。长驱直入打击匈奴，左顾后扫荡鲜卑。置身于锋利的刀刃间，怎么能顾及生命？父母都不能照顾，更不要说妻子孩子了！名字编入壮士名册，不能心中顾念私利。献身赴国难，视死如归！',
    keywords: ['白马', '游侠', '捐躯', '视死如归'],
    imageDesc: '白马金羁西北驰，游侠豪勇捐躯报国',
    difficulty: 3,
    emotion: '豪迈、悲壮',
  },

  // 陶渊明
  {
    id: 'c-taoyuanming-001',
    title: '饮酒·其五',
    author: '陶渊明',
    dynasty: '晋',
    content: ['结庐在人境，', '而无车马喧。', '问君何能尔？', '心远地自偏。', '采菊东篱下，', '悠然见南山。', '山气日夕佳，', '飞鸟相与还。', '此中有真意，', '欲辨已忘言。'],
    pinyin: ['jié lú zài rén jìng,', 'ér wú chē mǎ xuān.', 'wèn jūn hé néng ěr?', 'xīn yuǎn dì zì piān.', 'cǎi jú dōng lǐ xià,', 'yōu rán jiàn nán shān.', 'shān qì rì xī jiā,', 'fēi niǎo xiāng yǔ huán.', 'cǐ zhōng yǒu zhēn yì,', 'yù biàn yǐ wàng yán.'],
    translation: '我在人世间建造住宅，却没有车马的喧闹。问我为什么能这样？心志高远，地方自然偏僻。在东篱下采菊花，悠闲地看到南山。山的气息在傍晚时美好，飞鸟一起归来。这中间有真正的意蕴，想要辨明却忘了如何表达。',
    keywords: ['东篱', '采菊', '南山', '真意'],
    imageDesc: '东篱采菊，悠见南山，飞鸟还巢',
    difficulty: 2,
    emotion: '恬淡、自然',
  },
  {
    id: 'c-taoyuanming-002',
    title: '归园田居·其一',
    author: '陶渊明',
    dynasty: '晋',
    content: ['少无适俗韵，', '性本爱丘山。', '误落尘网中，', '一去三十年。', '羁鸟恋旧林，', '池鱼思故渊。', '开荒南野际，', '守拙归园田。', '方宅十余亩，', '草屋八九间。', '榆柳荫后檐，', '桃李罗堂前。', '暖暖远人村，', '依依墟里烟。', '狗吠深巷中，', '鸡鸣桑树颠。', '户庭无尘杂，', '虚室有余闲。', '久在樊笼里，', '复得返自然。'],
    pinyin: ['shào wú shì sú yùn,', 'xìng běn ài qiū shān.', 'wù luò chén wǎng zhōng,', 'yī qù sān shí nián.', 'jī niǎo liàn jiù lín,', 'chí yú sī gù yuān.', 'kāi huāng yě jì,', 'shǒu zhuō guī yuán tián.', 'fāng zhái shí yú mǔ,', 'cǎo wū bā jiǔ jiān.', 'yú liǔ yìn hòu yán,', 'táo lǐ luó táng qián.', 'ài ài yuǎn rén cūn,', 'yī yī xū lǐ yān.', 'gǒu fèi shēn xiàng zhōng,', 'jī míng sāng shù diān.', 'hù tíng wú chén zá,', 'xū shì yǒu yú xián.', 'jiǔ zài fán lóng lǐ,', 'fù dé fǎn zì rán.'],
    translation: '少年时就没有适应世俗的韵致，性格本来就热爱山林。错误地落在尘世罗网中，一去就是三十年。笼中的鸟依恋原来的森林，池中的鱼思念原来的深渊。在南山边开垦荒地，保持愚拙回归园田。住宅有十余亩，草屋八九间。榆树柳树遮蔽后檐，桃树李树排列堂前。远远看见人烟稀疏的村庄，炊烟袅袅升起。狗在深巷中吠叫，鸡在桑树顶端鸣叫。门庭没有尘世俗事，空室有清闲。长久地在樊笼里，现在又能返回自然了。',
    keywords: ['归园田', '羁鸟', '池鱼', '樊笼'],
    imageDesc: '田园生活，榆柳桃李，鸡犬桑麻',
    difficulty: 2,
    emotion: '闲适、释然',
  },

  // 王冕
  {
    id: 'c-wangmian-001',
    title: '墨梅',
    author: '王冕',
    dynasty: '元',
    content: ['吾家洗砚池头树，', '个个花开淡墨痕。', '不要人夸好颜色，', '只留清气满乾坤。'],
    pinyin: ['wú jiā xǐ yàn chí tóu shù,', 'gè gè huā kāi dàn mò hén.', 'bù yào rén kuā hǎo yán sè,', 'zhǐ liú qíng qì màn qián kūn.'],
    translation: '我家洗砚池边的梅树，每朵花开都带有淡淡的墨痕。不需要别人夸赞颜色好，只想把清新的香气留在天地之间。',
    keywords: ['墨梅', '洗砚', '清气', '乾坤'],
    imageDesc: '墨色梅花，清气满乾坤，高洁脱俗',
    difficulty: 1,
    emotion: '高洁、脱俗',
  },

  // 龚自珍
  {
    id: 'c-gongzizhen-001',
    title: '己亥杂诗·其五',
    author: '龚自珍',
    dynasty: '清',
    content: ['浩荡离愁白日斜，', '吟鞭东指即天涯。', '落红不是无情物，', '化作春泥更护花。'],
    pinyin: ['hào dàng lí chóu bái rì xié,', 'yín biān dōng zhǐ jí tiān yá.', 'luò hóng bù shì wú qíng wù,', 'huà zuò chūn ní gēng hù huā.'],
    translation: '浩荡的离愁随着夕阳西斜而涌起向东挥鞭就是天涯。落花不是无情之物，化作春泥更能护花。',
    keywords: ['落红', '春泥', '护花', '奉献'],
    imageDesc: '夕阳离愁，落红化泥，春泥护花',
    difficulty: 1,
    emotion: '奉献、坚韧',
  },

  // 郑燮
  {
    id: 'c-zhengxie-001',
    title: '竹石',
    author: '郑燮',
    dynasty: '清',
    content: ['咬定青山不放松，', '立根原在破岩中。', '千磨万击还坚劲，', '任尔东西南北风。'],
    pinyin: ['yǎo dìng qīng shān bù fàng sōng,', 'lì gēn yuán zài pò yán zhōng.', 'qiān mó wàn jī hái jīn jìn,', 'rèn ěr dōng xī nán běi fēng.'],
    translation: '牢牢咬住青山毫不放松，根原本扎在破碎的岩石中。经历千万次磨砺打击依然坚韧有力，任凭你从东西南北各个方向吹来的风。',
    keywords: ['竹石', '咬定', '破岩', '坚劲'],
    imageDesc: '青竹扎根岩石，任凭风吹雨打',
    difficulty: 1,
    emotion: '坚韧、刚正',
  },

  // 毛泽东
  {
    id: 'c-maozedong-001',
    title: '沁园春·雪',
    author: '毛泽东',
    dynasty: '现代',
    content: ['北国风光，', '千里冰封，', '万里雪飘。', '望长城内外，', '惟余莽莽；', '大河上下，', '顿失滔滔。', '山舞银蛇，', '原驰蜡象，', '欲与天公试比高。', '须晴日，', '看红装素裹，', '分外妖娆。', '江山如此多娇，', '引无数英雄竞折腰。', '惜秦皇汉武，', '略输文采；', '唐宗宋祖，', '稍逊风骚。', '一代天骄，', '成吉思汗，', '只识弯弓射大雕。', '俱往矣，', '数风流人物，', '还看今朝。'],
    pinyin: ['běi guó fēng guāng,', 'qiān lǐ bīng fēng,', 'wàn lǐ xuě piāo.', 'wàng cháng chéng nèi wài,', 'wéi yú mǎng mǎng;', 'dà hé shàng xià,', 'dùn shī tāo tāo.', 'shān wǔ yín shé,', 'yuán chí là xiàng,', 'yù yǔ tiān gōng shì bǐ gāo.', 'xū qíng rì,', 'kàn hóng zhuāng sù guǒ,', 'fèn wài yāo ráo.', 'jiāng shān rú cǐ duō jiāo,', 'yǐn wú shù yīng xióng jìng zhé yāo.', 'xī qín huáng hàn wǔ,', 'lüè wén cǎi;', 'táng zōng sòng zǔ,', 'shāo xùn fēng sāo.', 'yī dài tiān jiāo,', 'chéng jī sī hàn,', 'zhǐ shí wān gōng shè dà diāo.', 'jù wǎng yǐ,', 'shuō fēng liú rén wù,', 'hái kàn jīn zhāo.'],
    translation: '北方的风光，千里冰封，万里雪飘。远望长城内外，只剩下白茫茫的一片；黄河上下游，瞬间失去了波涛汹涌的气势。山峦像银色的蛇在舞动，高原像白色的象在奔跑，想要与天公比试高低。等到晴天的时候，看那红日映照下的雪景，格外娇艳。江山如此多娇，引得无数英雄竞相倾倒。可叹秦始皇、汉武帝，文采略输一筹；唐太宗、宋太祖，风骚稍逊一筹。称霸一世的英雄成吉思汗，只知道弯弓射大雕。这些都过去了，要说真正的风流人物，还看今天。',
    keywords: ['沁园春', '千里冰封', '红装素裹', '风流人物'],
    imageDesc: '北国雪景，红装素裹，分外妖娆',
    difficulty: 3,
    emotion: '豪迈、雄壮',
    isCi: true,
  },
  {
    id: 'c-maozedong-002',
    title: '卜算子·咏梅',
    author: '毛泽东',
    dynasty: '现代',
    content: ['风雨送春归，', '飞雪迎春到。', '已是悬崖百丈冰，', '犹有花枝俏。', '俏也不争春，', '只把春来报。', '待到山花烂漫时，', '她在丛中笑。'],
    pinyin: ['fēng yǔ sòng chūn guī,', 'fēi xuě yíng chūn dào.', 'yǐ shì xuán yá bǎi zhàng bīng,', 'yóu yǒu huā zhī qiào.', 'qiào yě bù zhēng chūn,', 'zhǐ bǎ chūn lái bào.', 'dài dào shān huā làn màn shí,', 'tā zài cóng zhōng xiào.'],
    translation: '风雨送走了春天，飞雪迎来了春天。已经高达百丈的冰崖上，还有梅花俏丽地开放。俏丽但不与百花争春，只是把春天到来的消息报告。等到漫山遍野山花烂漫的时候，她在花丛中欢笑。',
    keywords: ['梅花', '悬崖百丈冰', '俏', '丛中笑'],
    imageDesc: '悬崖冰梅，俏丽报春，丛中欢笑',
    difficulty: 2,
    emotion: '坚韧、乐观',
    isCi: true,
  },

  // 鲁迅
  {
    id: 'c-luxun-001',
    title: '自嘲',
    author: '鲁迅',
    dynasty: '现代',
    content: ['运交华盖欲何求，', '未敢翻身已碰头。', '破帽遮颜过闹市，', '漏船载酒泛中流。', '横眉冷对千夫指，', '俯首甘为孺子牛。', '躲进小楼成一统，', '管他冬夏与春秋。'],
    pinyin: ['yùn jiāo huá gài yù hé qiú,', 'wèi gǎn fān shēn yǐ pèng tóu.', 'pào mò zhān yán guò nào shì,', 'lòu chuán zài jiǔ fàn zhōng liú.', 'héng méi lěng duì qiān fū zhǐ,', 'fǔ shǒu gān wéi rú zǐ niú.', 'duǒ jìn xiǎo lóu chéng yī tǒng,', 'guǎn tā dōng xià yǔ chūn qiū.'],
    translation: '交上华盖运还有什么要求，还没敢翻身已经碰了头。破帽子遮住脸面经过闹市，像漏船载着酒在江中漂流。对着千夫所指横眉冷对，俯下身子甘愿做孺子牛。躲进小楼成一统，管他冬天夏天与春天秋天。',
    keywords: ['横眉冷对', '孺子牛', '小楼', '自嘲'],
    imageDesc: '横眉冷对千夫指，俯首甘为孺子牛',
    difficulty: 2,
    emotion: '坚韧、幽默',
  },

  // ===== 新增诗人诗数组 =====
  const WANGANSHI_POEMS = [
    { id: 'c-wanganshi-001', title: '元日', author: '王安石', dynasty: '宋', content: ['爆竹声中一岁除，', '春风送暖入屠苏。', '千门万户曈曈日，', '总把新桃换旧符。'], pinyin: ['bào zhú shēng zhōng yī suì chú,', 'chūn fēng sòng nuǎn rù tú sū.', 'qiān mén wàn hù tóng tóng rì,', 'zǒng bǎ xīn táo huàn jiù fú.'], translation: '在噼噼作响的爆竹声中，旧的一年已经过去。春风送暖，人们畅饮屠苏酒。千家万户在旭日东升的阳光下，都用新桃符换下旧桃符。', keywords: ['元日', '春风', '屠苏', '新桃旧符'], imageDesc: '新春喜庆，鞭炮齐鸣，春风送暖', difficulty: 1, emotion: '喜悦、迎新' },
    { id: 'c-wanganshi-002', title: '泊船瓜洲', author: '王安石', dynasty: '宋', content: ['京口瓜洲一水间，', '钟山只隔数重山。', '春风又绿江南岸，', '明月何时照我还。'], pinyin: ['jīng kǒu guā zhōu yī shuǐ jiān,', 'zhōng shān zhǐ gé shù zhòng shān.', 'chūn fēng yòu lǜ jiāng nán àn,', 'míng yuè hé shí zhào wǒ hái.'], translation: '京口和瓜洲只隔一条江水，从钟山到这儿也只隔几重山。春风又一次吹绿了江南的河岸，明月什么时候才能照着我返回故乡呢？', keywords: ['春风', '绿江南', '明月', '思乡'], imageDesc: '长江两岸，春风拂绿，明月当空', difficulty: 1, emotion: '思乡、感慨' },
    { id: 'c-wanganshi-003', title: '梅花', author: '王安石', dynasty: '宋', content: ['墙角数枝梅，', '凌寒独自开。', '遥知不是雪，', '为有暗香来。'], pinyin: ['qiáng jiǎo shù zhī méi,', 'líng hán dú zì kāi.', 'yáo zhī bù shì xuě,', 'wèi yǒu àn xiāng lái.'], translation: '墙角有几枝梅花，冒着严寒独自开放。远远看去就知道那不是雪，因为有暗暗的香气飘来。', keywords: ['梅花', '凌寒', '暗香', '坚强'], imageDesc: '墙角寒梅，独自绽放，暗香浮动', difficulty: 1, emotion: '坚韧、高洁' },
  ]

  const HEZHIZHANG_POEMS = [
    { id: 'c-hezhizhang-001', title: '咏柳', author: '贺知章', dynasty: '唐', content: ['碧玉妆成一树高，', '万条垂下绿丝绦。', '不知细叶谁裁出，', '二月春风似剪刀。'], pinyin: ['bì yù zhuāng chéng yī shù gāo,', 'wàn tiáo chuí xià lǜ sī tāo.', 'bù zhī xì yè shuí cái chū,', 'èr yuè chūn fēng sì jiǎn dāo.'], translation: '高高的柳树好像用碧玉装饰而成，��千条柳枝垂下像绿色的丝带。不知道这细密的柳叶是谁裁剪出来的，原来是二月的春风像剪刀一样。', keywords: ['柳树', '春风', '丝绦', '剪刀'], imageDesc: '春风拂柳，万条垂丝，碧玉妆成', difficulty: 1, emotion: '欣喜、赞美' },
    { id: 'c-hezhizhang-002', title: '回乡偶书', author: '贺知章', dynasty: '唐', content: ['少小离家老大回，', '乡音无改鬓毛衰。', '儿童相见不相识，', '笑问客从何处来。'], pinyin: ['shǎo xiǎo lí jiā lǎo dà huí,', 'xiāng yīn wú gǎi bìn máo shuāi.', 'ér tóng xiāng jiàn bù xiāng shí,', 'xiào wèn kè cóng hé chǔ lái.'], translation: '少年时离开家乡，年老了才回来。乡音没有改变，但鬓发已经稀疏变白。孩子们见到我却不认识，笑着问我从哪里来。', keywords: ['乡音', '鬓毛', '儿童', '故乡'], imageDesc: '老者归乡，儿童笑问，物是人非', difficulty: 1, emotion: '感慨、温馨' },
  ]

  const FANZHONGYAN_POEMS = [
    { id: 'c-fanzhongyan-001', title: '渔家傲·秋思', author: '范仲淹', dynasty: '宋', content: ['塞下秋来风景异，', '衡阳雁去无留意。', '四面边声连角起，', '千嶂里，', '长烟落日孤城闭。', '浊酒一杯家万里，', '燕然未勒归无计。', '羌管悠悠霜满地，', '人不寐，', '将军白发征夫泪。'], pinyin: ['sài xià qiū lái fēng jǐng yì,', 'héng yáng yàn qù wú liú yì.', 'sì miàn biān shēng lián jiǎo qǐ,', 'qiān zhàng lǐ,', 'cháng yān luò rì gū chéng bì.', 'zhuó jiǔ yī bēi jiāng wàn lǐ,', 'yān rán wèi lè guī wú jì.', 'qiāng guǎn yōu yōu shuāng mǎn dì,', 'rén bù mèi,', 'jiāng jūn bái fà zhēng fū lèi.'], translation: '边塞的秋天风景与内地不同，衡阳的大雁飞去毫不留恋。四面八方的边声随着号角响起，在层峦叠嶂中，炊烟袅袅，夕阳西下，孤城紧闭。喝一杯浊酒思念万里之外的家乡，但燕然山还未刻石记功，无法回去。羌笛声悠扬，霜雪满地。将军和征夫都无法入睡，思念家乡的泪水流满了面颊。', keywords: ['边塞', '秋思', '浊酒', '归无计'], imageDesc: '边塞秋景，孤城落日，羌管悠扬', difficulty: 3, emotion: '悲壮、思乡', isCi: true },
  ]

  const YANSHU_POEMS = [
    { id: 'c-yanshu-001', title: '浣溪沙·一曲新词酒一杯', author: '晏殊', dynasty: '宋', content: ['一曲新词酒一杯，', '去年天气旧亭台。', '夕阳西下几时回？', '无可奈何花落去，', '似曾相识燕归来。', '小园香径独徘徊。'], pinyin: ['yī qǔ xīn cí jiǔ yī bēi,', 'qù nián tiān qì jiù tíng tái.', 'xī yáng xī xià jǐ shí huí?', 'wú kě nài hé huā luò qù,', 'sì céng xiāng shí yàn guī lái.', 'xiǎo yuán xiāng jìng dú pái huái.'], translation: '填一首新词喝一杯酒，还是去年的天气和旧的亭台。夕阳西下，什么时候才能回来？花朵凋落，无法挽留燕子却像认识一样归来。在小园的花径上独自徘徊。', keywords: ['新词', '夕阳', '花落燕归', '徘徊'], imageDesc: '小园春暮，新词浊酒，燕子归来', difficulty: 2, emotion: '惆怅、珍惜', isCi: true },
  ]

  const LIUYONG_POEMS = [
    { id: 'c-liuyong-001', title: '雨霖铃·寒蝉凄切', author: '柳永', dynasty: '宋', content: ['寒蝉凄切，', '对长亭晚，', '骤雨初歇。', '都门帐饮无绪，', '留恋处，', '兰舟催发。', '执手相看泪眼，', '竟无语凝噎。', '念去去，', '千里烟波，', '暮霭沉沉楚天阔。', '多情自古伤离别，', '更那堪，', '冷落清秋节！', '今宵酒醒何处？', '杨柳岸，', '晓风残月。', '此去经年，', '应是良辰好景虚设。', '便纵有千种风情，', '更与何人说？'], pinyin: ['hán chán qī qiè,', 'duì cháng tíng wǎn,', 'zhòu yǔ chū xiē.', 'dū mén zhàng yǐn wú xù,', 'liú liàn chù,', 'lán zhōu cuī fā.', 'zhí shǒu xiāng kàn lèi yǎn,', 'jìng wú yǔ níng yē.', 'niàn qù qù,', 'qiān lǐ yān bō,', 'mù ǎi chén chén chǔ tiān kuò.', 'duō qíng zì gǔ shāng lí bié,', 'gèng nà kān,', 'lěng luò qiū qiū jié!', 'jīn xiāo jiǔ xǐng hé chù?', 'yáng liǔ àn,', 'xiǎo fēng cán yuè.', 'cǐ qù jīng nián,', 'yìng shì liáng chén hǎo jǐng xū shè.', 'biàn zòng yǒu qiān zhǒng fēng qíng,', 'gèng yǔ hé rén shuō?'], translation: '秋蝉凄凉地鸣叫已是傍晚时分，长亭外骤雨刚停。在京城门外设帐饮酒却没有情绪，正留恋时，船夫催着出发。握着手互相看着含泪的眼睛，竟然哽咽得说不出话。想到这一去千里烟波，暮色苍茫楚天广阔。自古多情的人就悲伤离别更何况在这清冷的秋天！今晚酒醒后在哪里？杨柳岸边，晨风残月。这一去就是一年，即使是良辰美景也是虚设纵然有千种风情，又能和谁说呢？', keywords: ['寒蝉', '离别', '杨柳岸', '晓风残月'], imageDesc: '长亭晚别，寒蝉凄切，晓风残月', difficulty: 3, emotion: '离别、悲伤', isCi: true },
  ]

  const YUEFEI_POEMS = [
    { id: 'c-yuefei-001', title: '满江红·写怀', author: '岳飞', dynasty: '宋', content: ['怒发冲冠，', '凭栏处、', '潇潇雨歇。', '抬望眼，', '仰天长啸，', '壮怀激烈。', '三十功名尘与土，', '八千里路云和月。', '莫等闲，', '白了少年头，', '空悲切！', '靖康耻，', '犹未雪。', '臣子恨，', '何时灭！', '驾长车，', '踏破贺兰山缺。', '壮志饥餐胡虏肉，', '笑谈渴饮匈奴血。', '待从头、', '收拾旧山河，', '朝天阙。'], pinyin: ['nù fā chōng guān,', 'píng lán chù、', 'xiāo xiāo yǔ xiē.', 'tái wàng yǎn,', 'yǎng tiān cháng xiào,', 'zhuàng huái jī liè.', 'sān shí gōng míng chén yǔ tǔ,', 'bā qiān lǐ lù yún hé yuè.', 'mò děng xián,', 'bái le shào nián tóu,', 'kōng bēi qiè!', 'jìng kāng chǐ,', 'yóu wèi xuě.', 'chén zǐ hèn,', 'shí shí miè!', 'jià cháng chē,', 'tà pò hè lán shān quē.', 'zhuàng zhì jī hú lǔ ròu,', 'xiào tán kě yǐn xiōng nú xuè.', 'dài cóng tóu、', 'shōu shí jiù shān hé,', 'tiān quē.'], translation: '愤怒得头发竖起冲帽子，靠在栏杆处，骤雨刚刚停下来。抬头远望，对着天空长啸，壮志胸怀激烈。三十年的功名如同尘土，八千里的路程伴着云月。不要虚度年华，等头发花白时徒然悲切！靖康年的耻辱，还没有洗雪。臣子的仇恨，什么时候才能消灭！驾着战车，踏破贺兰山的缺口。壮志凌云，饿了就吃敌人的肉，谈笑间渴了就喝匈奴的血。待从头开始，收复旧日山河，朝拜皇帝。', keywords: ['满江红', '壮怀激烈', '靖康耻', '精忠报国'], imageDesc: '凭栏长啸，壮志豪情，精忠报国', difficulty: 3, emotion: '悲壮、激昂', isCi: true },
  ]

  const CAOCAO_POEMS = [
    { id: 'c-caocao-001', title: '观沧海', author: '曹操', dynasty: '汉', content: ['东临碣石，', '以观沧海。', '水何澹澹，', '山岛竦峙。', '树木丛生，', '百草丰茂。', '秋风萧瑟，', '洪波涌起。', '日月之行，', '若出其中。', '星汉灿烂，', '若出其里。', '幸甚至哉，', '歌以咏志。'], pinyin: ['dōng lín jié shí,', 'yǐ guān cāng hǎi.', 'shuǐ hé dàn dàn,', 'shān dǎo sǒng zhì.', 'shù mù cóng shēng,', 'bǎi cǎo fēng mào.', 'qiū fēng xiāo sè,', 'hóng bō yǒng qǐ.', 'rì yuè zhī xíng,', 'ruò chū qí zhōng.', 'xīng hàn càn làn,', 'ruò chū qí lǐ.', 'xìng shèn zhì zāi,', 'gē yǐ yǒng zhì.'], translation: '东行登上碣石山，来观看苍茫的大海。海水波涛起伏，山岛高耸挺立。岛上树木郁郁葱葱，各种草繁茂生长。秋风吹来萧瑟的声音，巨大的波浪汹涌而起。日月的运行，好像从这海洋中升起。银河星光灿烂，好像从这海洋中涌出。真是幸运极了，用诗歌来表达我的志向。', keywords: ['沧海', '碣石', '日月', '星汉'], imageDesc: '碣石观海，波涛汹涌，日月之行', difficulty: 2, emotion: '豪迈、壮观' },
    { id: 'c-caocao-002', title: '龟虽寿', author: '曹操', dynasty: '汉', content: ['神龟虽寿，', '犹有竟时。', '腾蛇乘雾，', '终为土灰。', '老骥伏枥，', '志在千里。', '烈士暮年，', '壮心不已。', '盈缩之期，', '不但在天。', '养怡之福，', '可得永年。', '幸甚至哉，', '歌以咏志。'], pinyin: ['shén guī suī shòu,', 'yóu yǒu jìng shí.', 'téng shé chéng wù,', 'zhōng wéi tǔ huī.', 'lǎo jì fú lì,', 'zhì zài qiān lǐ.', 'liè shì mù nián,', 'zhuàng xīn bù yǐ.', 'yíng suō zhī qī,', 'bù dàn zài tiān.', 'yǎng yí zhī fú,', 'kě dé yǒng nián.', 'xìng shèn zhì zāi,', 'gē yǒng yǒng zhì.'], translation: '神龟虽然长寿，终究还是有死亡的时候。腾蛇虽然能乘雾飞行，最终也会变成土灰。老马伏在马槽旁，志向还在千里之外。有志之士到了晚年，壮志雄心仍然不已。人的寿命长短，不完全由天决定。保养身心的福气，可以延年益寿。真是幸运极了，用诗歌来表达我的志向。', keywords: ['神龟', '老骥伏枥', '壮心不已', '养怡'], imageDesc: '老骥伏枥，志在千里，壮心不已', difficulty: 2, emotion: '豪迈、积极' },
  ]

  const CAOZHI_POEMS = [
    { id: 'c-caozhi-001', title: '七步诗', author: '曹植', dynasty: '魏', content: ['煮豆持作羹，', '漉豉以为汁。', '萁在釜下燃，', '豆在釜中泣。', '本是同根生，', '相煎何太急。'], pinyin: ['zhǔ dòu chí zuò gēng,', 'lù chǐ yǐ wéi zhī.', 'qí zài fǔ xià rán,', 'dòu zài fǔ zhōng qì.', 'běn shì tóng gēn shēng,', 'xiāng jiān hé tài jí.'], translation: '煮豆子来做羹，过滤豆豉来取汁。豆萁在锅下燃烧，豆子在锅中哭泣。我们本是同根所生，为什么相互煎逼如此急迫呢？', keywords: ['同根生', '相煎', '豆萁', '兄弟'], imageDesc: '同根相煎，豆萁豆子，亲情悲剧', difficulty: 1, emotion: '悲愤、无奈' },
    { id: 'c-caozhi-002', title: '白马篇', author: '曹植', dynasty: '魏', content: ['白马饰金羁，', '连翩西北驰。', '借问谁家子，', '幽并游侠儿。', '少小去乡邑，', '扬声沙漠垂。'], pinyin: ['bái mǎ shì jīn jī,', 'lián piān xī běi chí.', 'jié wèn shuí jiā zǐ,', 'yōu bìng yóu xiá ér.', 'shǎo xiǎo qù xiāng yì,', 'yáng shēng shā mò chuí.'], translation: '白马装饰着金色马笼头，向西北方向奔驰而去。请问这是谁家的孩子，是幽州并州的游侠儿。少年时就离开了家乡，在沙漠边垂扬名。', keywords: ['白马', '游侠', '捐躯', '视死如归'], imageDesc: '白马金羁西北驰，游侠豪勇捐躯报国', difficulty: 3, emotion: '豪迈、悲壮' },
  ]

  const TAOYUANMING_POEMS = [
    { id: 'c-taoyuanming-001', title: '饮酒·其五', author: '陶渊明', dynasty: '晋', content: ['结庐在人境，', '而无车马喧。', '问君何能尔？', '心远地自偏。', '采菊东篱下，', '悠然见南山。', '山气日夕佳，', '飞鸟相与还。', '此中有真意，', '欲辨已忘言。'], pinyin: ['jié lú zài rén jìng,', 'ér wú chē mǎ xuān.', 'wèn jūn hé néng ěr?', 'xīn yuǎn dì zì piān.', 'cǎi jú dōng lǐ xià,', 'yōu rán jiàn nán shān.', 'shān qì rì xī jiā,', 'fēi niǎo xiāng yǔ huán.', 'cǐ zhōng yǒu zhēn yì,', 'yù biàn yǐ wàng yán.'], translation: '我在人世间建造住宅，却没有车马的喧闹。问我为什么能这样？心志高远，地方自然偏僻。在东篱下采菊花，悠闲地看到南山。山的气息在傍晚时美好，飞鸟一起归来。这中间有真正的意蕴，想要辨明却忘了如何表达。', keywords: ['东篱', '采菊', '南山', '真意'], imageDesc: '东篱采菊，悠见南山，飞鸟还巢', difficulty: 2, emotion: '恬淡、自然' },
    { id: 'c-taoyuanming-002', title: '归园田居·其一', author: '陶渊明', dynasty: '晋', content: ['少无适俗韵，', '性本爱丘山。', '误落尘网中，', '一去三十年。', '羁鸟恋旧林，', '池鱼思故渊。'], pinyin: ['shào wú shì sú yùn,', 'xìng běn ài qiū shān.', 'wù luò chén wǎng zhōng,', 'yī qù sān shí nián.', 'jī niǎo liàn jiù lín,', 'chí yú sī gù yuān.'], translation: '少年时就没有适应世俗的韵致，性格本来就热爱山林。错误地落在尘世罗网中，一去就是三十年。笼中的鸟依恋原来的森林，池中的鱼思念原来的深渊。', keywords: ['归园田', '羁鸟', '池鱼', '樊笼'], imageDesc: '田园生活，榆柳桃李，鸡犬桑麻', difficulty: 2, emotion: '闲适、释然' },
  ]

  const WANGMIAN_POEMS = [
    { id: 'c-wangmian-001', title: '墨梅', author: '王冕', dynasty: '元', content: ['吾家洗砚池头树，', '个个花开淡墨痕。', '不要人夸好颜色，', '只留清气满乾坤。'], pinyin: ['wú jiā xǐ yàn chí tóu shù,', 'gè gè huā kāi dàn mò hén.', 'bù yào rén kuā hǎo yán sè,', 'zhǐ liú qíng qì màn qián kūn.'], translation: '我家洗砚池边的梅树，每朵花开都带有淡淡的墨痕。不需要别人夸赞颜色好，只想把清新的香气留在天地之间。', keywords: ['墨梅', '洗砚', '清气', '乾坤'], imageDesc: '墨色梅花，清气满乾坤，高洁脱俗', difficulty: 1, emotion: '高洁、脱俗' },
  ]

  const GONGZIZHEN_POEMS = [
    { id: 'c-gongzizhen-001', title: '己亥杂诗·其五', author: '龚自珍', dynasty: '清', content: ['浩荡离愁白日斜，', '吟鞭东指即天涯。', '落红不是无情物，', '化作春泥更护花。'], pinyin: ['hào dàng lí chóu bái rì xié,', 'yín biān dōng zhǐ jí tiān yá.', 'luò hóng bù shì wú qíng wù,', 'huà zuò chūn ní gēng hù huā.'], translation: '浩荡的离愁随着夕阳西斜而涌起，向东挥鞭就是天涯。落花不是无情之物，化作春泥更能护花。', keywords: ['落红', '春泥', '护花', '奉献'], imageDesc: '夕阳离愁，落红化泥，春泥护花', difficulty: 1, emotion: '奉献、坚韧' },
  ]

  const ZHENGXIE_POEMS = [
    { id: 'c-zhengxie-001', title: '竹石', author: '郑燮', dynasty: '清', content: ['咬定青山不放松，', '立根原在破岩中。', '千磨万击还坚劲，', '任尔东西南北风。'], pinyin: ['yǎo dìng qīng shān bù fàng sōng,', 'lì gēn yuán zài pò yán zhōng.', 'qiān mó wàn jī hái jīn jìn,', 'rèn ěr dōng xī nán běi fēng.'], translation: '牢牢咬住青山毫不放松，根原本扎在破碎的岩石中。经历千万次磨砺打击依然坚韧有力，任凭你从东西南北各个方向吹来的风。', keywords: ['竹石', '咬定', '破岩', '坚劲'], imageDesc: '青竹扎根岩石，任凭风吹雨打', difficulty: 1, emotion: '坚韧、刚正' },
  ]

  const MAOZEDONG_POEMS = [
    { id: 'c-maozedong-001', title: '沁园春·雪', author: '毛泽东', dynasty: '现代', content: ['北国风光，', '千里冰封，', '万里雪飘。', '望长城内外，', '惟余莽莽；', '大河上下，', '顿失滔滔。', '山舞银蛇，', '原驰蜡象，', '欲与天公试比高。', '须晴日，', '看红装素裹，', '分外妖娆。', '江山如此多娇，', '引无数英雄竞折腰。'], pinyin: ['běi guó fēng guāng,', 'qiān lǐ bīng fēng,', 'wàn lǐ xuě piāo.', 'wàng cháng chéng nèi wài,', 'wéi yú mǎng mǎng;', 'dà hé shàng xià,', 'dùn shī tāo tāo.', 'shān wǔ yín shé,', 'yuán chí là xiàng,', 'yù yǔ tiān gōng shì bǐ gāo.', 'xū qíng rì,', 'kàn hóng zhuāng sù guǒ,', 'fèn wài yāo ráo.', 'jiāng shān rú cǐ duō jiāo,', 'yǐn wú shù yīng xióng jìng zhé yāo.'], translation: '北方的风光，千里冰封，万里雪飘。远望长城内外，只剩下白茫茫的一片；黄河上下游，瞬间失去了波涛汹涌的气势。山峦像银色的蛇在舞动，高原像白色的象在奔跑，想要与天公比试高低。等到晴天的时候，看那红日映照下的雪景，格外娇艳。江山如此多娇，引得无数英雄竞相倾倒。', keywords: ['沁园春', '千里冰封', '红装素裹', '风流人物'], imageDesc: '北国雪景，红装素裹，分外妖娆', difficulty: 3, emotion: '豪迈、雄壮', isCi: true },
  ]

  const LUXUN_POEMS = [
    { id: 'c-luxun-001', title: '自嘲', author: '鲁迅', dynasty: '现代', content: ['运交华盖欲何求，', '未敢翻身已碰头。', '破帽遮颜过闹市，', '漏船载酒泛中流。', '横眉冷对千夫指，', '俯首甘为孺子牛。', '躲进小楼成一统，', '管他冬夏与春秋。'], pinyin: ['yùn jiāo huá gài yù hé qiú,', 'wèi gǎn fān shēn yǐ pèng tóu.', 'pào mò zhān yán guò nào shì,', 'lòu chuán zài jiǔ fàn zhōng liú.', 'héng méi lěng duì qiān fū zhǐ,', 'fǔ shǒu gān wéi rú zǐ niú.', 'duǒ jìn xiǎo lóu chéng yī tǒng,', 'guǎn tā dōng xià yǔ chūn qiū.'], translation: '交上华盖运还有什么要求是没敢翻身已经碰了头。破帽子遮住脸面经过闹市，像漏船载着酒在江中漂流。对着千夫所指横眉冷对，俯下身子甘愿做孺子牛。躲进小楼成一统，管他冬天夏天与春天秋天。', keywords: ['横眉冷对', '孺子牛', '小楼', '自嘲'], imageDesc: '横眉冷对千夫指，俯首甘为孺子牛', difficulty: 2, emotion: '坚韧、幽默' },
  ]

  // ===== 新增诗人信息到 CLASSIC_POETS =====
  const NEW_CLASSIC_POETS = [
    { id: 'wanganshi', name: '王安石', dynasty: '宋', bio: '字介甫，号半山，北宋著名政治家、文学家，位列"唐宋八大家"。主持"熙宁变法"，力图富国强兵。诗作语言精练，立意新颖。' },
    { id: 'hezhizhang', name: '贺知章', dynasty: '唐', bio: '字季真，号四明狂客，盛唐著名诗人、书法家。性格旷达不羁，与李白交好。诗风清新自然。' },
    { id: 'fanzhongyan', name: '范仲淹', dynasty: '宋', bio: '字希文，北宋著名政治家、文学家。以"先天下之忧而忧，后天下之乐而乐"名垂千古。' },
    { id: 'yanshu', name: '晏殊', dynasty: '宋', bio: '字同叔，北宋著名词人，官至宰相。词风温润秀洁，雍容华贵，多写闲情逸致。' },
    { id: 'liuyong', name: '柳永', dynasty: '宋', bio: '原名三变，字景庄，北宋著名词人，婉约派代表人物。词风缠绵悱恻，善于铺叙。' },
    { id: 'yuefei', name: '岳飞', dynasty: '宋', bio: '字鹏举，南宋抗金名将、民族英雄。其词慷慨激昂，气壮山河。' },
    { id: 'caocao', name: '曹操', dynasty: '汉', bio: '字孟德，东汉末年杰出的政治家、军事家、文学家，曹魏政权的奠基人。' },
    { id: 'caozhi', name: '曹植', dynasty: '魏', bio: '字子建，三国时期曹魏著名文学家，建安文学的代表人物。才高八斗。' },
    { id: 'taoyuanming', name: '陶渊明', dynasty: '晋', bio: '名潜，字元亮，东晋末期至南朝宋初期诗人。中国第一位田园诗人。' },
    { id: 'wangmian', name: '王冕', dynasty: '元', bio: '字元章，号煮石山农，元代著名画家、诗人。出身贫寒，自学成才，尤擅画梅。' },
    { id: 'gongzizhen', name: '龚自珍', dynasty: '清', bio: '字璱人，号定庵，清代著名思想家、文学家。其诗气势磅礴，充满变革精神。' },
    { id: 'zhengxie', name: '郑燮', dynasty: '清', bio: '字克柔，号板桥，清代著名书画家、"扬州八怪"代表人物。诗书画三绝。' },
    { id: 'maozedong', name: '毛泽东', dynasty: '现代', bio: '字润之，中国共产党、中国人民解放军和中华人民共和国的主要缔造者和领导人。其诗词气魄宏伟。' },
    { id: 'luxun', name: '鲁迅', dynasty: '现代', bio: '原名周树人，字豫才，中国现代文学的奠基人。其旧体诗深沉凝练，充满战斗精神。' },
  ]

]

// ==================== 合并所有诗词 ====================
const CLASSIC_POEMS = [
  ...LIBAI_POEMS,
  ...DUFU_POEMS,
  ...WANGWEI_POEMS,
  ...BAIJUYI_POEMS,
  ...LISHANGYIN_POEMS,
  ...DUMU_POEMS,
  ...WANGCHANGLING_POEMS,
  ...LIUYUXI_POEMS,
  ...MENGHAORAN_POEMS,
  ...SUSHI_POEMS,
  ...LIQINGZHAO_POEMS,
  ...XINQIJI_POEMS,
  ...LUYOU_POEMS,
  ...YANGWANLI_POEMS,
  ...MAYUAN_POEMS,
  ...WANGANSHI_POEMS,
  ...HEZHIZHANG_POEMS,
  ...FANZHONGYAN_POEMS,
  ...YANSHU_POEMS,
  ...LIUYONG_POEMS,
  ...YUEFEI_POEMS,
  ...CAOCAO_POEMS,
  ...CAOZHI_POEMS,
  ...TAOYUANMING_POEMS,
  ...WANGMIAN_POEMS,
  ...GONGZIZHEN_POEMS,
  ...ZHENGXIE_POEMS,
  ...MAOZEDONG_POEMS,
  ...LUXUN_POEMS,
]

// ==================== 工具函数 ====================

// 获取所有经典诗词
function getAllClassicPoems() {
  return CLASSIC_POEMS
}

// 获取所有经典诗人
function getAllClassicPoets() {
  return CLASSIC_POETS
}

// 根据诗人ID获取诗人信息
function getClassicPoetById(id) {
  return CLASSIC_POETS.find(p => p.id === id) || null
}

// 根据诗人名字获取其所有诗词
function getClassicPoemsByAuthor(authorName) {
  return CLASSIC_POEMS.filter(p => p.author === authorName)
}

// 根据诗词ID获取诗词
function getClassicPoemById(id) {
  return CLASSIC_POEMS.find(p => p.id === id) || null
}

// 根据朝代筛选诗词
function getClassicPoemsByDynasty(dynasty) {
  return CLASSIC_POEMS.filter(p => p.dynasty === dynasty)
}

// 获取统计信息
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
