"""
重新下载 hot/run/in/going 4个词的发音
尝试多个 TTS 源，找到体积正常（<30KB）的就保存
"""
import urllib.request
import urllib.parse
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.join(SCRIPT_DIR, '..', 'subpackages')

AUDIO1_DIR = os.path.join(BASE_DIR, 'audio1')  # a~may
AUDIO2_DIR = os.path.join(BASE_DIR, 'audio2')  # me~z

# 词 → 目标目录（按 safeName.lower() <= 'may' 路由）
WORDS = {
    'going': AUDIO1_DIR,  # g <= may
    'in':    AUDIO1_DIR,  # i <= may
    'hot':   AUDIO2_DIR,  # h... wait, h < m, so audio1!
    'run':   AUDIO2_DIR,  # r > may → audio2
}

# 修正：hot(h) < may → audio1；in(i) < may → audio1
# going(g) < may → audio1；run(r) > may → audio2
WORDS = {
    'going': AUDIO1_DIR,
    'in':    AUDIO1_DIR,
    'hot':   AUDIO1_DIR,   # 'hot' <= 'may' → audio1
    'run':   AUDIO2_DIR,   # 'run' > 'may' → audio2
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://dict.youdao.com/',
}

# 多个 TTS 接口备用
def make_urls(word):
    q = urllib.parse.quote(word)
    return [
        f'https://dict.youdao.com/dictvoice?audio={q}&type=1',  # 英式
        f'https://dict.youdao.com/dictvoice?audio={q}&type=2',  # 美式
        f'https://fanyi.youdao.com/tts?audio={q}&type=1&ext=mp3&le=eng',
    ]

MAX_SIZE = 30 * 1024  # 30KB，超出视为异常

for word, dest_dir in WORDS.items():
    out_path = os.path.join(dest_dir, f'{word}.mp3')
    saved = False
    for url in make_urls(word):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
            size = len(data)
            if size < 1000:
                print(f'  [{word}] {url} → 太小({size}B)，跳过')
                continue
            if size > MAX_SIZE:
                print(f'  [{word}] {url} → 太大({size//1024}KB)，跳过')
                continue
            with open(out_path, 'wb') as f:
                f.write(data)
            print(f'OK [{word}] -> {dest_dir.split(os.sep)[-1]}/{word}.mp3  ({size//1024}KB)  from: {url}')
            saved = True
            break
        except Exception as e:
            print(f'  [{word}] {url} → 错误: {e}')

    if not saved:
        print(f'FAIL [{word}] all sources failed or oversized, skip')

print('\nDone.')
