// utils/voice.js
// 方案 A：最小改动优化
//   - 移除重复的 wx.setInnerAudioOption（由 app.js 调用）
//   - 统一 soundEnabled 判断逻辑
//   - 远程兜底增加重试机制

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

// ---------- 主播放 Context ----------
let _playCtx = null
let _playWord = null   // 主 ctx 当前加载的单词
let _pendingPlay = false
let _playMode = 'local' // 'local' | 'remote'
let _remoteRetryCount = 0 // 远程重试次数

function _ensurePlayCtx() {
  if (!_playCtx) {
    _playCtx = wx.createInnerAudioContext()
    // wx.setInnerAudioOption 已在 app.js 中调用，此处不再重复

    _playCtx.onCanplay(() => {
      if (_pendingPlay) {
        _pendingPlay = false
        _playCtx.play()
      }
    })

    _playCtx.onError(() => {
      console.warn('[voice] 主播放失败，word:', _playWord, 'mode:', _playMode, 'src:', _playCtx.src, 'retry:', _remoteRetryCount)
      const word = _playWord
      if (!word) return

      if (_playMode === 'local') {
        // 本地失败 → 切换到远程
        _playMode = 'remote'
        _remoteRetryCount = 0
        const remoteSrc = _getRemoteSrc(word)
        console.log('[voice] 切换到远程:', remoteSrc)
        _pendingPlay = true
        _playCtx.src = remoteSrc
      } else if (_playMode === 'remote' && _remoteRetryCount < 1) {
        // 远程失败 → 重试一次
        _remoteRetryCount++
        const remoteSrc = _getRemoteSrc(word)
        console.log('[voice] 远程重试，次数:', _remoteRetryCount)
        _pendingPlay = true
        setTimeout(() => {
          _playCtx.src = remoteSrc
        }, 500)
      } else {
        // 重试也失败 → 降级提示
        console.error('[voice] 播放最终失败，word:', word, 'local+remote+retry 均失败')
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

// ---------- 预加载池（最多缓存 3 个词，失败标记为 'failed'）----------
const PRE_POOL_SIZE = 3
const _prePool = new Map() // word -> InnerAudioContext | 'failed'

function _preloadInPool(word) {
  if (!word) return
  if (_prePool.has(word)) return // 已缓存或已失败

  // 超出上限时，移除最早加入的条目
  if (_prePool.size >= PRE_POOL_SIZE) {
    const firstKey = _prePool.keys().next().value
    const firstVal = _prePool.get(firstKey)
    if (firstVal !== 'failed') {
      try { firstVal.destroy() } catch (e) {}
    }
    _prePool.delete(firstKey)
  }

  const ctx = wx.createInnerAudioContext()
  ctx.onError((err) => {
    console.warn('[voice] 预加载失败:', word, err)
    _prePool.set(word, 'failed') // 标记失败，避免重复尝试
  })
  ctx.src = _getLocalSrc(word)
  // 只设 src，不 play → 触发系统缓存
  _prePool.set(word, ctx)
}

/**
 * 播放单词发音（进卡 / 点击发音时调用）
 * 统一 soundEnabled 判断逻辑
 */
function playWordVoice(word) {
  if (!word) return
  const soundEnabled = wx.getStorageSync('soundEnabled')
  // 统一判断：soundEnabled 必须严格等于 true 才播放
  if (soundEnabled !== true) return

  const ctx = _ensurePlayCtx()
  const localSrc = _getLocalSrc(word)

  // 如果预加载池里标记为失败，直接跳过走主流程
  const preloaded = _prePool.get(word)
  if (preloaded === 'failed') {
    console.log('[voice] 预加载已失败，跳过，直接加载主流程')
  }

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
    // onCanplay 触发后自动 play
  }
}

/**
 * 预加载单词音频（切卡后延迟调用，不播放）
 * 写入预加载池，失败则标记为 'failed'
 */
function preloadWordVoice(word) {
  if (!word) return
  const soundEnabled = wx.getStorageSync('soundEnabled')
  if (soundEnabled !== true) return
  _preloadInPool(word)
}

function stopVoice() {
  _pendingPlay = false
  if (_playCtx) {
    try { _playCtx.stop() } catch (e) {}
  }
}

module.exports = { playWordVoice, preloadWordVoice, stopVoice }
