#!/usr/bin/env python3
"""下载音效文件"""

import urllib.request
import os
import ssl

# 禁用 SSL 验证（某些网站需要）
ssl._create_default_https_context = ssl._create_unverified_context

sounds_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'sounds')
os.makedirs(sounds_dir, exist_ok=True)

# 使用 GitHub 上的开源音效
success_url = "https://raw.githubusercontent.com/Tonejs/audio/master/salamander/C4.mp3"
error_url = "https://raw.githubusercontent.com/Tonejs/audio/master/salamander/G2.mp3"

def download_file(url, filename):
    filepath = os.path.join(sounds_dir, filename)
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"Downloaded: {filepath}")
        return True
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
        return False

# 下载音效
download_file(success_url, "success.mp3")
download_file(error_url, "error.mp3")

print("\n音效文件下载完成！")
