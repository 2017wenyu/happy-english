"""
批量下载 220 个高频词的发音 MP3
来源：有道词典 TTS（美式发音 type=2）
输出：assets/audio/<word>.mp3
"""

import urllib.request
import urllib.parse
import os
import time

WORDS = [
    "a","and","are","as","at","be","black","blue","boat","box","boy","come","did","do",
    "down","find","for","funny","go","good","green","help","here","I","in","is","it",
    "little","look","make","me","my","no","not","on","or","out","play","red","run",
    "say","see","the","three","two","up","us","very","was","we","well","what","white",
    "who","yes","you",
    "after","again","always","am","any","around","ask","ate","back","because","been",
    "before","best","both","but","buy","came","can","could","cut","don't","done","drink",
    "each","far","fast","found","first","fly","from","give","going","had","has","have",
    "he","her","hers","him","his","how",
    "I'll","I'm","if","into","its","just","know","late","leave","let","live","long",
    "made","many","may","might","more","most","much","must","never","now","of","off",
    "often","once","only","our","ours","over","own","put","read","right","sat","saw",
    "shall","she","should","show",
    "sing","sit","sleep","so","some","sound","stand","start","still","take","tell",
    "than","them","then","there","these","they","thing","think","those","through",
    "today","together","too","under","use","walk","want","watch","were","when","where",
    "which","while","why","will","with","word","work",
    "would","write","year","your","about","better","bring","carry","clean","color",
    "cold","dry","eight","every","four","full","get","got","grow","half","hand","hard",
    "hot","keep","kind","last","light","like","lose","men","mountain","name","near",
    "new","number","oil","old","one","paper","open","part","place","plant","pull"
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio')
os.makedirs(OUTPUT_DIR, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

ok, skip, fail = 0, 0, 0
total = len(WORDS)

for i, word in enumerate(WORDS, 1):
    # 文件名：特殊字符替换（I'll → I_ll，I'm → I_m）
    safe_name = word.replace("'", "_")
    out_path = os.path.join(OUTPUT_DIR, f'{safe_name}.mp3')

    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f'[{i:3}/{total}] SKIP {word}')
        skip += 1
        continue

    url = f'https://dict.youdao.com/dictvoice?audio={urllib.parse.quote(word)}&type=2'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        if len(data) < 1000:
            raise ValueError(f'文件太小({len(data)}B)，可能是错误响应')
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f'[{i:3}/{total}] OK  {word} ({len(data)//1024}KB)')
        ok += 1
    except Exception as e:
        print(f'[{i:3}/{total}] ERR {word} -- {e}')
        fail += 1

    # 限速，避免被封
    time.sleep(0.3)

print(f'\nDone! OK:{ok}  SKIP:{skip}  FAIL:{fail}  TOTAL:{total}')
if fail > 0:
    print('Re-run to retry failed words (existing files will be skipped).')
