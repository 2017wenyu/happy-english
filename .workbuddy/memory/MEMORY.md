# happy-english 项目长期记忆

## 项目基本信息

- **项目名称**: happy-english（微信小程序）
- **项目路径**: `D:\git\wx`（原路径 `D:\git\happy-english`，2026-03-26 迁移）
- **⚠️ 重要**: 所有文件操作必须使用 `D:\git\wx` 作为根路径，无需用户每次提醒
- **技术栈**: 微信小程序（WXML / WXSS / JS）

## UI 风格约定

- **主色调**: 蓝紫渐变 `linear-gradient(135deg, #4876FF, #722ED1)`
- **强调按钮（确认/全部闪卡）**: 橙色渐变 `linear-gradient(135deg, #FA8C16, #FFA940)`
- **导航栏颜色**: `#4876FF`
- **背景色**: `#F5F8FF`
- **圆角**: 按钮/卡片使用 20~32rpx

## 各页面改动记录

### spelling（拼写页面）
- 输入区域4个元素（首字母、输入框、确认、跳过）改为**纵向排列**（每行一个）
- 题目卡片显示单词翻译（浅黄色背景）
- 正确/错误结果均显示翻译

### index（首页）
- 顶部 header 使用蓝紫渐变
- "全部220词混合闪卡"按钮为橙色，margin-bottom: 32rpx

## 音频文件

- **2026-03-26 修正方案**：音频迁回分包，解决主包 2MB 限制问题（之前尝试迁主包导致超限）
- 分包配置：`subpackages/audio1`（111个，a~may）、`subpackages/audio2`（109个，me~z），按字母序分割
- `app.json` 恢复 subpackages 配置
- `utils/voice.js`：分包路径（`/subpackages/<pkg>/<word>.mp3`），失败时走有道远程兜底
- `app.js`：`wx.setInnerAudioOption({ obeyMuteSwitch: false, speakerOn: true })`，避免 iPhone 静音键导致无声
- `flashcard.js` / `spelling.js`：已添加 `onHide` 停音
- `mistakes.js`：改用统一 `voice.js` 播放逻辑

## 其他配置

- `app.json` 已添加 `"lazyCodeLoading": "requiredComponents"`
