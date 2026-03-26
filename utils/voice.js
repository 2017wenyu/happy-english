// utils/voice.js — 本地音频方案（双子包）
// audio1: a ~ may  (subpackages/audio1/, 108个词, ~1021KB)
// audio2: me ~ z   (subpackages/audio2/, 108个词, ~1062KB)
// 缺失的词(hot/run/in/going) 静默失败

let _audioCtx = null

/**
 * 播放单词发音
 * @param {string} word  英文单词
 */
function playWordVoice(word) {
  if (!word) return

  _stopCurrent()

  // 特殊字符替换（I'll→I_ll, I'm→I_m, don't→don_t）
  const safeName = word.replace(/'/g, '_')

  // 字母序 <= "may" 在 audio1，否则在 audio2
  const pkg = safeName.toLowerCase() <= 'may' ? 'audio1' : 'audio2'
  const src = `/subpackages/${pkg}/${safeName}.mp3`

  const ctx = wx.createInnerAudioContext()
  _audioCtx = ctx
  ctx.src = src
  ctx.play()

  ctx.onError(() => {
    _audioCtx = null
  })
  ctx.onEnded(() => {
    _audioCtx = null
  })
}

function _stopCurrent() {
  if (_audioCtx) {
    try { _audioCtx.stop(); _audioCtx.destroy() } catch (e) {}
    _audioCtx = null
  }
}

function stopVoice() {
  _stopCurrent()
}

module.exports = { playWordVoice, stopVoice }
