#!/usr/bin/env python3
"""Turn the generated 1376x768 masters into fast card and OG images.

Masters live in generated-images/games/ (gitignored); the site serves
800x450 card images and 1200x630 social images from assets/img/games/.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
MASTERS = ROOT / "generated-images" / "games"
OUT = ROOT / "assets" / "img" / "games"
MASTERS.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

THUMB = (800, 450)
OG = (1200, 630)

for candidate in sorted(OUT.glob("*.jpg")):
    if candidate.name.endswith(("-og.jpg", "-card.jpg")):
        continue
    with Image.open(candidate) as im:
        if im.width > 1000:
            master = MASTERS / candidate.name
            if not master.exists():
                import shutil
                shutil.copy2(candidate, master)

for master in sorted(MASTERS.glob("*.jpg")):
    slug = master.stem
    with Image.open(master) as im:
        im = im.convert("RGB")
        thumb = ImageOps.fit(im, THUMB, Image.LANCZOS, centering=(0.5, 0.5))
        thumb.save(OUT / f"{slug}-card.jpg", "JPEG", quality=80, optimize=True, progressive=True)
        og = ImageOps.fit(im, OG, Image.LANCZOS, centering=(0.5, 0.45))
        og.save(OUT / f"{slug}-og.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{slug}: card {THUMB[0]}x{THUMB[1]}, og {OG[0]}x{OG[1]}")

print(f"done: {len(list(MASTERS.glob('*.jpg')))} masters")
