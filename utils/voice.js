// utils/voice.js
// 方案 B：彻底重构
//   - 单例模式：全局只创建一个 _playCtx，避免资源竞争
//   - 懒加载：取消预加载池，用户交互时才开始加载
//   - 错误分级：本地失败 → 远程 → 重试 → 提示
//   - 生命周期：提供 cleanup() 接口，页面卸载时统一清理

// 分包规则：字母序 <= 'may' → audio1，其余 → audio2
function _getPkg(safeName) {
  return safeName.toLowerCase() <= 'may' ? 'audio1' : 'audio2'
}

function _getSafeName(word) {
  return word.replace(/'/g, '_')
}

function _getLocalSrc(word) {
  const safeName = _getSafeName(word)
  return `/subpackages/${_getPkg(safeName)}/${safeName}.mp3`
}

function _getRemoteSrc(word) {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`
}

// ---------- 单例主播放 Context ----------
let _playCtx = null
let _playWord = null   // 当前播放的单词
let _pendingPlay = false
let _playMode = 'local' // 'local' | 'remote'
let _remoteRetryCount = 0
let _isDestroying = false // 是否正在销毁

function _ensurePlayCtx() {
  if (_isDestroying) return null

  if (!_playCtx) {
    _playCtx = wx.createInnerAudioContext()

    _playCtx.onCanplay(() => {
      if (_pendingPlay && !_isDestroying) {
        _pendingPlay = false
        try {
          _playCtx.play()
        } catch (e) {
          console.warn('[voice] play 失败', e)
        }
      }
    })

    _playCtx.onError((err) => {
      if (_isDestroying) return
      console.warn('[voice] 主播放失败，word:', _playWord, 'mode:', _playMode, 'src:', _playCtx.src, 'retry:', _remoteRetryCount)
      const word = _playWord
      if (!word) return

      if (_playMode === 'local') {
        // Level 1：本地失败 → 切换远程
        _playMode = 'remote'
        _remoteRetryCount = 0
        const remoteSrc = _getRemoteSrc(word)
        console.log('[voice] 切换到远程:', remoteSrc)
        _pendingPlay = true
        try { _playCtx.src = remoteSrc } catch (e) {}
      } else if (_playMode === 'remote' && _remoteRetryCount < 1) {
        // Level 2：远程失败 → 500ms 后重试
        _remoteRetryCount++
        const remoteSrc = _getRemoteSrc(word)
        console.log('[voice] 远程重试，次数:', _remoteRetryCount)
        _pendingPlay = true
        setTimeout(() => {
          if (!_isDestroying) {
            try { _playCtx.src = remoteSrc } catch (e) {}
          }
        }, 500)
      } else {
        // Level 3：重试失败 → 弹提示
        console.error('[voice] 播放最终失败，word:', word)
        _pendingPlay = false
        _playMode = 'local'
        _remoteRetryCount = 0
        wx.showToast({ title: '音频加载失败', icon: 'none', duration: 1500 })
      }
    })

    _playCtx.onEnded(() => {
      _pendingPlay = false
      _playMode = 'local'
      _remoteRetryCount = 0
    })
  }
  return _playCtx
}

/**
 * 播放单词发音（懒加载模式）
 * 取消预加载池，直接走主流程
 */
function playWordVoice(word) {
  if (!word) return
  const soundEnabled = wx.getStorageSync('soundEnabled') !== false
  if (soundEnabled === false) return

  const ctx = _ensurePlayCtx()
  if (!ctx) return // 正在销毁中

  const localSrc = _getLocalSrc(word)

  if (_playWord === word && ctx.src === localSrc && _playMode === 'local') {
    // 已加载该词，直接从头播
    _pendingPlay = false
    try { ctx.stop() } catch (e) {}
    ctx.seek(0)
    ctx.play()
  } else {
    // 切换到新词
    _playWord = word
    _playMode = 'local'
    _remoteRetryCount = 0
    _pendingPlay = true
    try { ctx.stop() } catch (e) {}
    ctx.src = localSrc
  }
}

/**
 * 预加载单词音频（方案 B：移除预加载池，保留空接口兼容）
 * 懒加载策略：取消预加载，改为用户交互时才加载
 */
function preloadWordVoice(word) {
  // 方案 B：不再预加载，保留空接口兼容旧代码
  console.log('[voice] 预加载已禁用（懒加载模式）')
}

/**
 * 停止当前播放
 */
function stopVoice() {
  _pendingPlay = false
  if (_playCtx) {
    try { _playCtx.stop() } catch (e) {}
  }
}

/**
 * 清理资源（页面卸载时调用）
 * 销毁 Context，重置所有状态
 */
function cleanup() {
  console.log('[voice] cleanup: 销毁 AudioContext')
  _isDestroying = true
  _pendingPlay = false

  if (_playCtx) {
    try {
      _playCtx.stop()
      _playCtx.destroy()
    } catch (e) {}
    _playCtx = null
  }

  _playWord = null
  _playMode = 'local'
  _remoteRetryCount = 0

  setTimeout(() => {
    _isDestroying = false
  }, 100)
}

module.exports = { playWordVoice, preloadWordVoice, stopVoice, cleanup }
