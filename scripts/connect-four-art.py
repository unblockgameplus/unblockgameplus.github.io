#!/usr/bin/env python3
"""Fallback Connect Four thumbnail drawn with PIL."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math

W, H = 1600, 900
OUT = Path(__file__).resolve().parent.parent / "assets" / "img" / "games"
OUT.mkdir(parents=True, exist_ok=True)

img = Image.new("RGB", (W, H))
d = ImageDraw.Draw(img)
for y in range(H):
    t = y / (H - 1)
    d.line([(0, y), (W, y)], fill=(int(4 + 6 * t), int(8 + 12 * t), int(20 + 24 * t)))

# glowing stars / grid
stars = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(stars)
for x in range(0, W, 90):
    sd.line([(x, 0), (x, H)], fill=(60, 170, 255, 20))
for y in range(0, H, 90):
    sd.line([(0, y), (W, y)], fill=(60, 170, 255, 20))
img = Image.alpha_composite(img.convert("RGBA"), stars)

# glow behind board
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.rounded_rectangle([310, 120, 1290, 800], radius=60, fill=(34, 211, 238, 55))
gd.rounded_rectangle([350, 150, 1250, 770], radius=50, fill=(244, 63, 94, 35))
img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(70)))

# board side / frame
board = Image.new("RGBA", (W, H), (0, 0, 0, 0))
bd = ImageDraw.Draw(board)
bd.rounded_rectangle([420, 145, 1180, 775], radius=44, fill=(8, 24, 60, 255))
bd.rounded_rectangle([400, 125, 1160, 755], radius=44, fill=(23, 62, 160, 255))
bd.rounded_rectangle([412, 137, 1148, 743], radius=36, fill=(30, 64, 175, 255))
# top highlight
bd.rounded_rectangle([430, 150, 1130, 170], radius=10, fill=(96, 165, 250, 120))
img = Image.alpha_composite(img, board)

# holes and discs
cell = 96
gap = 12
start_x = 470
start_y = 186
for r in range(6):
    for c in range(7):
        cx = start_x + c * cell + cell / 2
        cy = start_y + r * cell + cell / 2
        d = ImageDraw.Draw(img)
        d.ellipse([cx - 38, cy - 38, cx + 38, cy + 38], fill=(4, 10, 24, 255))
        d.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], fill=(2, 6, 16, 255))

# predefined discs, including a yellow diagonal win
discs = {
    (5, 0): "red", (5, 1): "yellow", (5, 2): "red", (5, 3): "yellow", (5, 4): "red",
    (4, 1): "red", (4, 2): "yellow", (4, 3): "red",
    (3, 2): "red", (3, 3): "yellow", (3, 4): "yellow",
    (2, 3): "yellow", (2, 5): "red",
    (1, 3): "yellow", (1, 4): "red",
}
for (r, c), color in discs.items():
    cx = start_x + c * cell + cell / 2
    cy = start_y + r * cell + cell / 2
    # glow
    gl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdd = ImageDraw.Draw(gl)
    col = (239, 68, 68) if color == "red" else (250, 204, 21)
    gdd.ellipse([cx - 48, cy - 48, cx + 48, cy + 48], fill=col + (70,))
    img = Image.alpha_composite(img, gl.filter(ImageFilter.GaussianBlur(18)))
    d = ImageDraw.Draw(img)
    # body
    for i in range(38, 0, -1):
        t = i / 38
        shade = tuple(int(col[j] * (0.55 + 0.45 * (1 - t))) for j in range(3))
        d.ellipse([cx - i, cy - i, cx + i, cy + i], fill=shade)
    d.ellipse([cx - 26, cy - 28, cx + 2, cy - 2], fill=(255, 255, 255, 60))
    d.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], outline=(255, 255, 255, 40), width=2)

# falling disc above the board
for (cx, cy, col) in [(470 + 3 * cell + cell / 2, 95, (250, 204, 21)), (470 + 5 * cell + cell / 2, 70, (239, 68, 68))]:
    d = ImageDraw.Draw(img)
    d.ellipse([cx - 34, cy - 34, cx + 34, cy + 34], fill=col)
    d.ellipse([cx - 20, cy - 22, cx + 2, cy - 2], fill=(255, 255, 255, 70))

# neon rim
d = ImageDraw.Draw(img)
d.rounded_rectangle([400, 125, 1160, 755], radius=44, outline=(34, 211, 238, 220), width=6)
d.rounded_rectangle([420, 145, 1180, 775], radius=44, outline=(244, 114, 182, 150), width=3)

# vignette
mask = Image.new("L", (W, H), 0)
ImageDraw.Draw(mask).ellipse([-W * 0.2, -H * 0.3, W * 1.2, H * 1.3], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(180)).point(lambda v: 255 - int((255 - v) * 82 / 255))
img = Image.composite(img.convert("RGB"), Image.new("RGB", (W, H), (2, 4, 10)), mask)
img.save(OUT / "connect-four.jpg", "JPEG", quality=92, optimize=True)
print("wrote connect-four.jpg")
