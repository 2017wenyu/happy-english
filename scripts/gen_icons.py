"""
生成微信小程序 TabBar 所需的 6 个 PNG 图标（81x81 像素）
不依赖任何第三方库，纯 Python 标准库实现
"""
import os, struct, zlib

def make_png(width, height, pixels_rgba):
    """生成 RGBA PNG 的字节内容，pixels_rgba 是 height x width x 4 的列表"""
    def chunk(tag, data):
        c = zlib.crc32(tag + data) & 0xffffffff
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', c)

    # IHDR
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    # IDAT
    raw = b''
    for row in pixels_rgba:
        raw += b'\x00'  # filter type None
        for r, g, b, a in row:
            raw += bytes([r, g, b, a])
    compressed = zlib.compress(raw, 9)

    return (
        b'\x89PNG\r\n\x1a\n' +
        chunk(b'IHDR', ihdr) +
        chunk(b'IDAT', compressed) +
        chunk(b'IEND', b'')
    )


def new_canvas(w, h, bg=(0, 0, 0, 0)):
    return [[list(bg) for _ in range(w)] for _ in range(h)]


def set_pixel(canvas, x, y, color):
    h = len(canvas); w = len(canvas[0])
    if 0 <= x < w and 0 <= y < h:
        canvas[y][x] = list(color)


def fill_rect(canvas, x0, y0, x1, y1, color):
    for y in range(y0, y1):
        for x in range(x0, x1):
            set_pixel(canvas, x, y, color)


def fill_circle(canvas, cx, cy, r, color):
    for y in range(cy - r, cy + r + 1):
        for x in range(cx - r, cx + r + 1):
            if (x - cx) ** 2 + (y - cy) ** 2 <= r * r:
                set_pixel(canvas, x, y, color)


def draw_rounded_rect(canvas, x0, y0, x1, y1, r, color):
    fill_rect(canvas, x0 + r, y0, x1 - r, y1, color)
    fill_rect(canvas, x0, y0 + r, x1, y1 - r, color)
    for cx, cy in [(x0+r, y0+r), (x1-r-1, y0+r), (x0+r, y1-r-1), (x1-r-1, y1-r-1)]:
        fill_circle(canvas, cx, cy, r, color)


# --- 颜色定义 ---
GRAY   = (153, 153, 153, 255)  # 未选中
BLUE   = ( 74, 144, 217, 255)  # 选中（主色）
RED    = (255,  77,  79, 255)  # 错题本选中
TRANSP = (  0,   0,   0,   0)

W = 81

# ========== 图标1：首页（房子）==========
def make_home(color):
    c = new_canvas(W, W)
    # 屋顶（三角）
    mid = W // 2
    for i in range(24):
        x0 = mid - i - 1; x1 = mid + i + 1
        y  = 12 + i
        fill_rect(c, x0, y, x1+1, y+1, color)
    # 墙体
    fill_rect(c, 20, 36, 61, 65, color)
    # 门
    fill_rect(c, 33, 48, 48, 65, (0,0,0,0))
    # 补回透明区：先画白色门框
    fill_rect(c, 34, 49, 47, 65, TRANSP)
    return c

# ========== 图标2：错题本（感叹号书本）==========
def make_mistake(color):
    c = new_canvas(W, W)
    # 书本外框
    draw_rounded_rect(c, 14, 12, 67, 68, 6, color)
    # 书脊线
    fill_rect(c, 36, 12, 42, 68, TRANSP)
    # 感叹号 !（右侧）
    fill_rect(c, 51, 24, 57, 46, TRANSP)
    fill_rect(c, 52, 25, 56, 45, (255,255,255,220))
    fill_circle(c, 54, 54, 3, (255,255,255,220))
    return c

# ========== 图标3：我的（人形）==========
def make_profile(color):
    c = new_canvas(W, W)
    mid = W // 2
    # 头部
    fill_circle(c, mid, 22, 13, color)
    # 身体（半圆形）
    for y in range(38, W - 8):
        half = min(int(((y-38)/28)*22 + 4), 26)
        fill_rect(c, mid - half, y, mid + half, y+1, color)
    return c


def save_png(path, canvas):
    pixels = [[(canvas[y][x][0], canvas[y][x][1], canvas[y][x][2], canvas[y][x][3])
               for x in range(W)] for y in range(W)]
    data = make_png(W, W, pixels)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data)
    print(f'  写入: {path}  ({len(data)} bytes)')


base = r'd:\git\happy-english\assets\icons'

print('生成图标文件...')
save_png(f'{base}/home.png',            make_home(GRAY))
save_png(f'{base}/home_active.png',     make_home(BLUE))
save_png(f'{base}/mistake.png',         make_mistake(GRAY))
save_png(f'{base}/mistake_active.png',  make_mistake(RED))
save_png(f'{base}/profile.png',         make_profile(GRAY))
save_png(f'{base}/profile_active.png',  make_profile(BLUE))
print('全部完成！')
