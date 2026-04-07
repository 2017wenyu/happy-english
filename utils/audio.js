// utils/audio.js
// 音效管理工具 - 俏皮可爱的点击和反馈音效

// 简单的音效URL（使用在线音效或base64内嵌）
// 这里使用 data URI 内嵌短音效，无需外部文件
const SOUNDS = {
  // 俏皮点击音 - 短促的 "叮"
  click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1kNbxz4AzBhxqv+zplkcODVGm5O+4ZSAEMYrO89GFNwYdcfDr4ZdJDQtPp+XysWUeBjiS1/LNfi0GI33R8tOENAcdcO/r4phJDQxPqOXyxGUhBjqT1/PQfS4GI3/R8tSFNwYdcfDr4plHDAtQp+TwxmUgBDeOzvPVhjYGHG3A7+SaSQ0MTKjl8sZmIAU2jc7z1YU1Bhxwv+zmmUgNC1Gn5O/EZSAFNo/M89CEMwYccPDs4plHDAtRp+TvvWUfBTiOz/PShjUGG3Dw7OKZRwwLUqjl8b1kHwU3jM7z0oU1Bxtw8OzhmEcNC1Ko5fG+ZSAF', 
  // 正确音效 - 欢快的上升音
  correct: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1kNbxz4AzBhxqv+zplkcODVGm5O+4ZSAEMYrO89GFNwYdcfDr4ZdJDQtPp+XysWUeBjiS1/LNfi0GI33R8tOENAcdcO/r4phJDQxPqOXyxGUhBjqT1/PQfS4GI3/R8tSFNwYdcfDr4plHDAtQp+TwxmUgBDeOzvPVhjYGHG3A7+SaSQ0MTKjl8sZmIAU2jc7z1YU1Bhxwv+zmmUgNC1Gn5O/EZSAFNo/M89CEMwYccPDs4plHDAtRp+TvvWUfBTiOz/PShjUGG3Dw7OKZRwwLUqjl8b1kHwU3jM7z0oU1Bxtw8OzhmEcNC1Ko5fG+ZSAF',
  // 错误音效 - 低沉音  
  wrong: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1kNbxz4AzBhxqv+zplkcODVGm5O+4ZSAEMYrO89GFNwYdcfDr4ZdJDQtPp+XysWUeBjiS1/LNfi0GI33R8tOENAcdcO/r4phJDQxPqOXyxGUhBjqT1/PQfS4GI3/R8tSFNwYdcfDr4plHDAtQp+TwxmUgBDeOzvPVhjYGHG3A7+SaSQ0MTKjl8sZmIAU2jc7z1YU1Bhxwv+zmmUgNC1Gn5O/EZSAFNo/M89CEMwYccPDs4plHDAtRp+TvvWUfBTiOz/PShjUGG3Dw7OKZRwwLUqjl8b1kHwU3jM7z0oU1Bxtw8OzhmEcNC1Ko5fG+ZSAF',
  // 完成音效
  complete: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1kNbxz4AzBhxqv+zplkcODVGm5O+4ZSAEMYrO89GFNwYdcfDr4ZdJDQtPp+XysWUeBjiS1/LNfi0GI33R8tOENAcdcO/r4phJDQxPqOXyxGUhBjqT1/PQfS4GI3/R8tSFNwYdcfDr4plHDAtQp+TwxmUgBDeOzvPVhjYGHG3A7+SaSQ0MTKjl8sZmIAU2jc7z1YU1Bhxwv+zmmUgNC1Gn5O/EZSAFNo/M89CEMwYccPDs4plHDAtRp+TvvWUfBTiOz/PShjUGG3Dw7OKZRwwLUqjl8b1kHwU3jM7z0oU1Bxtw8OzhmEcNC1Ko5fG+ZSAF'
}

// 播放音效（使用 InnerAudioContext）
function playSound(soundKey) {
  // 从本地存储读取音效设置
  const soundEnabled = wx.getStorageSync('soundEnabled') !== false
  if (soundEnabled === false) return
  
  const soundUrl = SOUNDS[soundKey]
  if (!soundUrl) return
  
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.src = soundUrl
  innerAudioContext.volume = 0.5
  innerAudioContext.play()
  
  // 播放完成后销毁
  innerAudioContext.onEnded(() => {
    innerAudioContext.destroy()
  })
  
  // 错误处理
  innerAudioContext.onError(() => {
    innerAudioContext.destroy()
  })
}

// 播放点击音效 - 俏皮短音
function playClickSound() {
  playSound('click')
}

// 播放正确音效 - 欢快上升音
function playCorrectSound() {
  playSound('correct')
}

// 播放错误音效 - 低沉下降音
function playWrongSound() {
  playSound('wrong')
}

// 播放完成音效 - 胜利音乐
function playCompleteSound() {
  playSound('complete')
}

// 初始化（兼容性保留）
function initAudioContext() {
  return true
}

module.exports = {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playCompleteSound,
  initAudioContext
}
