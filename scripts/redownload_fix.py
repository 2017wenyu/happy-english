"""
重新下载体积异常的单词 MP3（强制覆盖）
有道词典 type=1 英式发音
"""
import urllib.request
import urllib.parse
import os
import time

# 需要重新下载的词（有道返回了异常大文件）
FIX_WORDS = [
    "carry", "see", "part",          # 之前删掉的 100KB+ 文件
    "then", "hot", "run", "in",      # 25-30KB 异常
    "going", "because", "with",      # 18-25KB 异常
    "have", "every",                 # 15-17KB 异常
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'subpackages', 'audio')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

for word in FIX_WORDS:
    safe_name = word.replace("'", "_")
    out_path = os.path.join(OUTPUT_DIR, f'{safe_name}.mp3')

    # 尝试 type=1（英式）
    url = f'https://dict.youdao.com/dictvoice?audio={urllib.parse.quote(word)}&type=1'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        size_kb = len(data) / 1024
        # 如果还是超过 20KB，认为是垃圾响应，不保存
        if len(data) < 500:
            print(f'ERR  {word} -- too small')
            continue
        if size_kb > 20:
            print(f'SKIP {word} -- still too large ({size_kb:.1f}KB), keeping old or skipping')
            continue
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f'OK   {word} ({size_kb:.1f}KB)')
    except Exception as e:
        print(f'ERR  {word} -- {e}')
    time.sleep(0.4)

# 统计总大小
total_bytes = sum(
    os.path.getsize(os.path.join(OUTPUT_DIR, f))
    for f in os.listdir(OUTPUT_DIR) if f.endswith('.mp3')
)
print(f'\nTotal: {total_bytes//1024}KB / 2048KB limit')
print(f'Count: {len([f for f in os.listdir(OUTPUT_DIR) if f.endswith(".mp3")])} files')
