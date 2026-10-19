#!/usr/bin/env python3
"""Neon-arcade fallback thumbnails drawn with PIL.

Only used if the image model is out of capacity. Output is 16:9 and gets
resized to the same card/OG sizes as the generated art.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "games"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1600, 900
random.seed(7)


def gradient(top, bottom):
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return img.convert("RGBA")


def glow(img, draw_fn, blur=24):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_fn(ImageDraw.Draw(layer))
    return Image.alpha_composite(img, layer.filter(ImageFilter.GaussianBlur(blur)))


def grid(img, step=90, alpha=18, color=(70, 200, 255)):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=color + (alpha,))
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=color + (alpha,))
    return Image.alpha_composite(img, layer)


def vignette(img, strength=80):
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse([-W * 0.2, -H * 0.3, W * 1.2, H * 1.3], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(180)).point(lambda v: 255 - int((255 - v) * strength / 255))
    return Image.composite(img, Image.new("RGB", (W, H), (2, 4, 10)), mask)


def sky_hopper():
    img = gradient((4, 7, 20), (8, 40, 66))
    img = glow(img, lambda d: d.ellipse([W * 0.7, -100, W, H * 0.38], fill=(120, 220, 255, 40)), 90)
    stars = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(stars)
    for _ in range(190):
        x, y = random.uniform(0, W), random.uniform(0, H * 0.72)
        r = random.choice([0.8, 1, 1.2, 1.6, 2.2])
        d.ellipse([x - r, y - r, x + r, y + r], fill=(210, 245, 255, random.randint(90, 230)))
    img = Image.alpha_composite(img, stars)
    img = grid(img, step=90, alpha=18, color=(70, 200, 255))

    clouds = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(clouds)
    for _ in range(9):
        cx, cy = random.uniform(-100, W + 100), random.uniform(H * 0.62, H * 0.96)
        cw, ch = random.uniform(140, 320), random.uniform(30, 70)
        cd.ellipse([cx - cw, cy - ch, cx + cw, cy + ch], fill=(30, 90, 150, 70))
    img = Image.alpha_composite(img, clouds.filter(ImageFilter.GaussianBlur(22)))

    platforms = [
        (120, 690, 300, 40, (57, 255, 136)),
        (520, 540, 250, 36, (34, 211, 238)),
        (900, 640, 280, 38, (163, 230, 53)),
        (1180, 450, 230, 34, (168, 85, 247)),
        (250, 390, 210, 32, (34, 211, 238)),
        (700, 300, 200, 30, (57, 255, 136)),
    ]
    for x, y, w, h, color in platforms:
        img = glow(img, lambda d, x=x, y=y, w=w, h=h, color=color:
                   d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=color + (110,)), 18)
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=(8, 18, 38, 255))
        d.rounded_rectangle([x + 4, y + 3, x + w - 4, y + h - 8], radius=h // 2, fill=color + (235,))
        d.rounded_rectangle([x + 10, y + 6, x + w - 10, y + 12], radius=4, fill=(255, 255, 255, 90))

    sx, sy = 400, 690
    d = ImageDraw.Draw(img)
    for i in range(3):
        d.arc([sx - 22, sy - 40 + i * 12, sx + 22, sy - 16 + i * 12], 200, 340, fill=(250, 204, 21, 255), width=7)
    d.rounded_rectangle([sx - 26, sy - 48, sx + 26, sy - 38], radius=5, fill=(249, 115, 22, 255))

    px, py, pr = 640, 430, 86
    img = glow(img, lambda d: d.ellipse([px - pr * 2, py - pr * 2, px + pr * 2, py + pr * 2], fill=(120, 255, 80, 95)), 50)
    d = ImageDraw.Draw(img)
    d.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(163, 230, 53, 255))
    d.ellipse([px - pr + 12, py - pr + 10, px + pr - 20, py + pr - 30], fill=(190, 245, 90, 255))
    d.ellipse([px - 38, py - 26, px - 12, py], fill=(255, 255, 255, 255))
    d.ellipse([px + 12, py - 26, px + 38, py], fill=(255, 255, 255, 255))
    d.ellipse([px - 32, py - 20, px - 16, py - 4], fill=(20, 40, 20, 255))
    d.ellipse([px + 18, py - 20, px + 34, py - 4], fill=(20, 40, 20, 255))
    d.arc([px - 26, py + 12, px + 26, py + 44], 20, 160, fill=(54, 83, 20, 255), width=6)
    d.ellipse([px - 46, py + pr - 18, px - 8, py + pr + 16], fill=(132, 204, 22, 255))
    d.ellipse([px + 8, py + pr - 18, px + 46, py + pr + 16], fill=(132, 204, 22, 255))

    motion = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    md = ImageDraw.Draw(motion)
    for i in range(3):
        md.arc([px - 200 - i * 28, py - 120 + i * 30, px + 60, py + 200], 200, 330, fill=(180, 255, 120, 90), width=5)
    for _ in range(30):
        x, y = random.uniform(px - 260, px + 220), random.uniform(py - 180, py + 180)
        r = random.uniform(1.5, 4)
        md.ellipse([x - r, y - r, x + r, y + r], fill=(190, 255, 120, random.randint(80, 200)))
    img = Image.alpha_composite(img, motion)
    vignette(img, 70).save(OUT / "sky-hopper.jpg", "JPEG", quality=90, optimize=True)
    print("wrote sky-hopper.jpg")


def penalty():
    img = gradient((3, 6, 16), (8, 24, 44))
    stands = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stands)
    sd.polygon([(0, 250), (W, 250), (W, 470), (0, 470)], fill=(10, 16, 30, 255))
    for _ in range(520):
        x, y = random.uniform(0, W), random.uniform(270, 450)
        r = random.uniform(1.5, 3.5)
        sd.ellipse([x - r, y - r, x + r, y + r], fill=random.choice([(30, 58, 138), (76, 29, 149), (124, 45, 18), (17, 94, 89)]) + (255,))
    img = Image.alpha_composite(img, stands)

    for lx, ly in [(180, 60), (W - 180, 60), (460, 30), (W - 460, 30)]:
        img = glow(img, lambda d, lx=lx, ly=ly: d.ellipse([lx - 160, ly - 160, lx + 160, ly + 160], fill=(220, 240, 255, 50)), 70)
        d = ImageDraw.Draw(img)
        d.rectangle([lx - 42, ly - 8, lx + 42, ly + 20], fill=(230, 240, 255, 255))
        d.rectangle([lx - 8, ly + 20, lx + 8, ly + 150], fill=(70, 82, 100, 255))

    pitch = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(pitch)
    for y in range(470, H):
        t = (y - 470) / (H - 470)
        pd.line([(0, y), (W, y)], fill=(int(10 + 14 * t), int(92 - 30 * t), int(52 - 18 * t), 255))
    for i in range(8):
        x0 = i * 220 - 100
        pd.polygon([(x0, 470), (x0 + 110, 470), (x0 + 200, H), (x0 + 30, H)], fill=(255, 255, 255, 8))
    img = Image.alpha_composite(img, pitch)

    d = ImageDraw.Draw(img)
    gx0, gy0, gx1, gy1 = 430, 220, 1170, 560
    d.rectangle([gx0, gy0, gx1, gy1], fill=(10, 20, 40, 90))
    for x in range(gx0 + 15, gx1, 24):
        d.line([(x, gy0), (x, gy1)], fill=(210, 230, 255, 45))
    for y in range(gy0 + 15, gy1, 24):
        d.line([(gx0, y), (gx1, y)], fill=(210, 230, 255, 45))
    d.rectangle([gx0 - 10, gy0 - 10, gx0 + 10, gy1], fill=(245, 250, 255, 255))
    d.rectangle([gx1 - 10, gy0 - 10, gx1 + 10, gy1], fill=(245, 250, 255, 255))
    d.rectangle([gx0 - 10, gy0 - 10, gx1 + 10, gy0 + 10], fill=(245, 250, 255, 255))

    d.line([(250, H), (520, 560)], fill=(235, 245, 255, 150), width=5)
    d.line([(W - 250, H), (W - 520, 560)], fill=(235, 245, 255, 150), width=5)
    d.line([(520, 560), (W - 520, 560)], fill=(235, 245, 255, 150), width=5)
    d.arc([W / 2 - 180, 610, W / 2 + 180, 770], 200, 340, fill=(235, 245, 255, 150), width=5)

    kx, ky = 1030, 380
    d.ellipse([kx - 28, ky - 96, kx + 28, ky - 40], fill=(249, 115, 22, 255))
    d.rounded_rectangle([kx - 34, ky - 44, kx + 34, ky + 60], radius=22, fill=(249, 115, 22, 255))
    d.line([(kx - 30, ky - 30), (kx - 130, ky - 110)], fill=(249, 115, 22, 255), width=22)
    d.line([(kx + 30, ky - 30), (kx + 120, ky - 80)], fill=(249, 115, 22, 255), width=22)
    d.line([(kx - 20, ky + 55), (kx - 90, ky + 140)], fill=(249, 115, 22, 255), width=22)
    d.line([(kx + 20, ky + 55), (kx + 80, ky + 120)], fill=(249, 115, 22, 255), width=22)
    d.ellipse([kx - 145, ky - 128, kx - 110, ky - 93], fill=(255, 255, 255, 255))
    d.ellipse([kx + 105, ky - 98, kx + 140, ky - 63], fill=(255, 255, 255, 255))

    bx, by, br = 800, 720, 62
    img = glow(img, lambda d: d.ellipse([bx - br - 10, by + br - 8, bx + br + 10, by + br + 24], fill=(0, 0, 0, 130)), 14)
    d = ImageDraw.Draw(img)
    d.ellipse([bx - br, by - br, bx + br, by + br], fill=(250, 250, 255, 255))
    d.ellipse([bx - br + 8, by - br + 6, bx + br - 22, by + br - 30], fill=(255, 255, 255, 255))
    d.polygon([(bx, by - 28), (bx + 26, by - 8), (bx + 16, by + 24), (bx - 16, by + 24), (bx - 26, by - 8)], fill=(16, 20, 30, 255))
    for ang in [0, 72, 144, 216, 288]:
        a = math.radians(ang)
        px, py = bx + math.cos(a) * 41, by + math.sin(a) * 41
        d.ellipse([px - 9, py - 7, px + 9, py + 7], fill=(16, 20, 30, 255))
    d.arc([bx - br, by - br, bx + br, by + br], 200, 330, fill=(255, 255, 255, 180), width=4)

    arc = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ad = ImageDraw.Draw(arc)
    ad.arc([bx - 300, by - 420, bx + 360, by + 40], 190, 300, fill=(163, 230, 53, 140), width=6)
    for i in range(10):
        t = i / 9
        x, y = bx - 230 + t * 380, by - 250 + t * t * 180
        ad.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(163, 230, 53, int(180 * (1 - t))))
    img = Image.alpha_composite(img, arc)
    img = grid(img, step=100, alpha=10, color=(80, 160, 255))
    vignette(img, 80).save(OUT / "penalty-shootout.jpg", "JPEG", quality=90, optimize=True)
    print("wrote penalty-shootout.jpg")


if __name__ == "__main__":
    sky_hopper()
    penalty()
