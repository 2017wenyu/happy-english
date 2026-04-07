# happy-english 项目长期记忆

## 项目基本信息

- **项目名称**: 小学学习助手（微信小程序，原名 happy-english）
- **项目路径**: `D:\git\wx`（原路径 `D:\git\happy-english`，2026-03-26 迁移）
- **⚠️ 重要**: 所有文件操作必须使用 `D:\git\wx` 作为根路径，无需用户每次提醒
- **技术栈**: 微信小程序（WXML / WXSS / JS）

## 页面结构（2026-04-07 更新）

- `pages/index`：**综合学习主页**，4个学科入口卡片（英语高频词/汉字生字词/古诗/成语）
- `pages/english`：英语高频词学习页（原 index 功能迁移过来）
- `pages/flashcard`：英语单词闪卡
- `pages/spelling`：英语单词拼写默写
- `pages/mistakes`：错题本（支持 subject 参数：english/chinese/poem/idiom）
- `pages/profile`：我的（统计 + 设置，支持学科切换 Tab）
- `pages/chinese`：**汉字生字词主页**（年级学期选择 + 4种玩法入口）✅ 已上线
- `pages/chinese_quiz`：看拼音选汉字 / 看汉字选拼音（共用一个页面，mode 参数区分）
- `pages/chinese_dictation`：听写默写（语音播报 + 大号输入框）
- `pages/chinese_compose`：组词填空（挖空词语模板）

古诗学习 / 成语学习：暂为占位入口，点击显示"敬请期待"

## UI 风格约定

- **主色调**: 蓝紫渐变 `linear-gradient(135deg, #4876FF, #722ED1)`
- **强调按钮（确认/全部闪卡）**: 橙色渐变 `linear-gradient(135deg, #FA8C16, #FFA940)`
- **导航栏颜色**: `#4876FF`
- **背景色**: `#F5F8FF`
- **圆角**: 按钮/卡片使用 20~32rpx

## 各页面改动记录

### index（综合主页）
- 4个学科卡片：左侧渐变图标 + 中间文字 + 右侧箭头
- 未开发功能显示橙色"即将上线"标签，箭头置灰

### english（英语高频词）
- 从原来的 index 页面完整迁移
- 顶部 header 使用蓝紫渐变
- "全部220词混合闪卡"按钮为橙色

### spelling（拼写页面）
- 输入区域4个元素（首字母、输入框、确认、跳过）改为**纵向排列**（每行一个）
- 题目卡片显示单词翻译（浅黄色背景）
- 正确/错误结果均显示翻译

## 音频文件

- **2026-03-26 修正方案**：音频迁回分包，解决主包 2MB 限制问题
- 分包配置：`subpackages/audio1`（111个，a~may）、`subpackages/audio2`（109个，me~z），按字母序分割
- `utils/voice.js`：方案B（懒加载 + 单例 Context + 三级错误处理 + cleanup 生命周期）
  - 本地失败 → 有道远程 → 重试一次 → toast 提示
  - `soundEnabled !== true` 才播放（统一判断）
  - 页面 onUnload/onHide 调用 `voice.cleanup()` 销毁 Context
- 播放延迟 500ms（等卡片渲染完成后再触发）
- `app.js`：`wx.setInnerAudioOption({ obeyMuteSwitch: false, speakerOn: true })`（只调一次）

## 其他配置

- `app.json` 已添加 `"lazyCodeLoading": "requiredComponents"`
- TabBar：首页（home）/ 错题本（mistake）/ 我的（profile）

