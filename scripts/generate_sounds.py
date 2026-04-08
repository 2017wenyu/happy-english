#!/usr/bin/env python3
"""
生成简单的音效文件
需要安装: pip install numpy wave
"""

import wave
import struct
import math
import os

def generate_tone(filename, frequency, duration, volume=0.5, sample_rate=44100):
    """生成单音调音效"""
    num_samples = int(duration * sample_rate)
    
    # 生成正弦波
    samples = []
    for i in range(num_samples):
        t = i / sample_rate
        # 添加衰减效果
        decay = 1.0 - (i / num_samples) * 0.3
        sample = volume * decay * math.sin(2 * math.pi * frequency * t)
        samples.append(sample)
    
    # 转换为 16 位整数
    audio_data = b''.join(struct.pack('h', int(sample * 32767)) for sample in samples)
    
    # 写入 WAV 文件
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # 单声道
        wav_file.setsampwidth(2)  # 16 位
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_data)
    
    print(f"Generated: {filename}")

def generate_success_sound(filename):
    """生成成功音效 - 清脆的上升音调"""
    sample_rate = 44100
    duration = 0.4
    num_samples = int(duration * sample_rate)
    
    samples = []
    # 两个音调：C5 到 E5
    freq1, freq2 = 523.25, 659.25
    
    for i in range(num_samples):
        t = i / sample_rate
        # 前半段 freq1，后半段 freq2
        if i < num_samples * 0.5:
            freq = freq1
        else:
            freq = freq2
        
        decay = 1.0 - (i / num_samples) * 0.2
        sample = 0.4 * decay * math.sin(2 * math.pi * freq * t)
        samples.append(sample)
    
    audio_data = b''.join(struct.pack('h', int(sample * 32767)) for sample in samples)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_data)
    
    print(f"Generated success sound: {filename}")

def generate_error_sound(filename):
    """生成错误音效 - 低沉的嗡嗡声"""
    sample_rate = 44100
    duration = 0.3
    num_samples = int(duration * sample_rate)
    
    samples = []
    freq = 200  # 低音
    
    for i in range(num_samples):
        t = i / sample_rate
        # 快速衰减
        decay = math.exp(-5 * t)
        # 添加一些谐波让声音更丰富
        sample = 0.5 * decay * (
            math.sin(2 * math.pi * freq * t) +
            0.3 * math.sin(2 * math.pi * freq * 2 * t)
        )
        samples.append(sample)
    
    audio_data = b''.join(struct.pack('h', int(sample * 32767)) for sample in samples)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_data)
    
    print(f"Generated error sound: {filename}")

if __name__ == '__main__':
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'sounds')
    os.makedirs(output_dir, exist_ok=True)
    
    # 生成音效
    generate_success_sound(os.path.join(output_dir, 'success.wav'))
    generate_error_sound(os.path.join(output_dir, 'error.wav'))
    
    print("\n音效文件已生成！")
    print("注意：生成的是 WAV 格式，微信小程序需要 MP3 格式")
    print("你可以使用在线转换工具将 WAV 转换为 MP3")
