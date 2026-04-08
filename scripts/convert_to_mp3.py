#!/usr/bin/env python3
"""将 WAV 转换为 MP3"""

from pydub import AudioSegment
import os

sounds_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'sounds')

# 转换 success.wav
wav_path = os.path.join(sounds_dir, 'success.wav')
mp3_path = os.path.join(sounds_dir, 'success.mp3')
audio = AudioSegment.from_wav(wav_path)
audio.export(mp3_path, format='mp3')
print(f"Converted: {mp3_path}")

# 转换 error.wav
wav_path = os.path.join(sounds_dir, 'error.wav')
mp3_path = os.path.join(sounds_dir, 'error.mp3')
audio = AudioSegment.from_wav(wav_path)
audio.export(mp3_path, format='mp3')
print(f"Converted: {mp3_path}")

print("\nMP3 文件已生成！")
