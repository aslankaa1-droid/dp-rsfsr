"""
Генератор PNG-иконок ЦП РСФСР из бренд-спецификации.
Воспроизводит SVG-логотип на любых разрешениях.

Размеры:
- PWA / RuStore: 192, 512, 1024
- Android mipmap: 48 (mdpi), 72 (hdpi), 96 (xhdpi), 144 (xxhdpi), 192 (xxxhdpi)
- iOS app icon: 1024 (App Store), 180 (60@3x), 167 (76@3x iPad Pro), 152 (76@2x), 120 (60@2x)
- maskable: 192, 512 с safe-zone 20%
- monochrome: 96, 192, 512 (Android adaptive)
- Feature graphic RuStore: 1024×500
"""
from PIL import Image, ImageDraw
import os

BG = (11, 43, 92, 255)      # #0B2B5C
WHITE = (255, 255, 255, 255)
GOLD = (201, 169, 97, 255)  # #C9A961

OUT_DIR = os.path.dirname(os.path.abspath(__file__))


def draw_logo(size: int, maskable: bool = False, monochrome: bool = False):
    """Рисует логотип ЦП РСФСР заданного размера.
    maskable: оставляет safe-zone 20% по краям (бэкграунд расширен).
    monochrome: только белая буква на прозрачном фоне.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0) if monochrome else BG)
    draw = ImageDraw.Draw(img)

    # Округлённый угол: rx = 108/512 ≈ 21% от стороны (не для maskable / mono)
    if not monochrome:
        rx = round(size * 108 / 512)
        # Создаём маску округлённого квадрата
        mask = Image.new("L", (size, size), 0)
        mdr = ImageDraw.Draw(mask)
        mdr.rounded_rectangle((0, 0, size - 1, size - 1), radius=rx, fill=255)
        # Если maskable — без скругления (Android сам обрежет в круг/squircle)
        if not maskable:
            bg_img = Image.new("RGBA", (size, size), BG)
            img = Image.composite(bg_img, Image.new("RGBA", (size, size), (0, 0, 0, 0)), mask)
        draw = ImageDraw.Draw(img)

    # Scale factor от исходного 512×512
    scale = size / 512.0
    # Для maskable вписываем логотип в 64% (safe zone)
    inner_scale = 0.64 if maskable else 1.0
    s = scale * inner_scale

    # Сдвиг центра при maskable
    offset_x = (size - size * inner_scale) / 2
    offset_y = (size - size * inner_scale) / 2

    def rect(x, y, w, h, fill):
        x1 = round(x * s + offset_x)
        y1 = round(y * s + offset_y)
        x2 = round((x + w) * s + offset_x)
        y2 = round((y + h) * s + offset_y)
        draw.rectangle((x1, y1, x2, y2), fill=fill)

    # Группа "Р" со сдвигом (150,108)
    base_x, base_y = 150, 108
    # вертикальная палка
    rect(base_x + 0, base_y + 0, 52, 296, WHITE)
    # верхняя перекладина
    rect(base_x + 0, base_y + 0, 190, 52, WHITE)
    # правая вертикаль (только верх Р)
    rect(base_x + 138, base_y + 0, 52, 148, WHITE)
    # средняя перекладина
    rect(base_x + 0, base_y + 116, 190, 52, WHITE)
    # Золотой квадратик (только в цветной версии)
    if not monochrome:
        rect(390, 86, 36, 36, GOLD)

    return img


# Стандартные иконки PWA / RuStore
for sz in [192, 512, 1024]:
    img = draw_logo(sz)
    img.save(os.path.join(OUT_DIR, f"icon-{sz}.png"), "PNG", optimize=True)

# Maskable (для adaptive Android / PWA maskable)
for sz in [192, 512]:
    img = draw_logo(sz, maskable=True)
    img.save(os.path.join(OUT_DIR, f"icon-{sz}-maskable.png"), "PNG", optimize=True)

# Monochrome (Android themed icons)
for sz in [192, 512]:
    img = draw_logo(sz, monochrome=True)
    img.save(os.path.join(OUT_DIR, f"icon-{sz}-mono.png"), "PNG", optimize=True)

# Android mipmap
android_dir = os.path.join(OUT_DIR, "..", "..", "Сборки", "android", "res")
os.makedirs(android_dir, exist_ok=True)
for density, sz in [("mdpi", 48), ("hdpi", 72), ("xhdpi", 96), ("xxhdpi", 144), ("xxxhdpi", 192)]:
    mip_dir = os.path.join(android_dir, f"mipmap-{density}")
    os.makedirs(mip_dir, exist_ok=True)
    draw_logo(sz).save(os.path.join(mip_dir, "ic_launcher.png"), "PNG", optimize=True)
    draw_logo(sz, maskable=True).save(os.path.join(mip_dir, "ic_launcher_round.png"), "PNG", optimize=True)
    draw_logo(sz, maskable=True).save(os.path.join(mip_dir, "ic_launcher_foreground.png"), "PNG", optimize=True)

# iOS App Icon
ios_dir = os.path.join(OUT_DIR, "..", "..", "Сборки", "ios", "AppIcon.appiconset")
os.makedirs(ios_dir, exist_ok=True)
for sz in [40, 60, 58, 87, 80, 120, 180, 76, 152, 167, 1024]:
    draw_logo(sz).save(os.path.join(ios_dir, f"icon-{sz}.png"), "PNG", optimize=True)

# Apple touch icon
draw_logo(180).save(os.path.join(OUT_DIR, "apple-touch-icon.png"), "PNG", optimize=True)

# Open Graph
og = Image.new("RGBA", (1200, 630), BG)
ogd = ImageDraw.Draw(og)
# Лого слева
logo = draw_logo(420)
og.paste(logo, (60, 105), logo)
# Текст справа (без шрифта — простой блок)
# Заголовок прямоугольником-плашкой
ogd.rounded_rectangle((520, 200, 1140, 240), radius=20, fill=GOLD)
ogd.rounded_rectangle((520, 280, 1080, 320), radius=20, fill=WHITE)
ogd.rounded_rectangle((520, 360, 1000, 400), radius=20, fill=WHITE)
ogd.rounded_rectangle((520, 440, 1140, 460), radius=10, fill=(255, 255, 255, 180))
og.save(os.path.join(OUT_DIR, "og-image.png"), "PNG", optimize=True)

# RuStore feature graphic 1024×500
fg = Image.new("RGBA", (1024, 500), BG)
fgd = ImageDraw.Draw(fg)
logo = draw_logo(360)
fg.paste(logo, (80, 70), logo)
fgd.rounded_rectangle((480, 150, 940, 190), radius=20, fill=GOLD)
fgd.rounded_rectangle((480, 220, 900, 260), radius=20, fill=WHITE)
fgd.rounded_rectangle((480, 290, 820, 330), radius=20, fill=WHITE)
fgd.rounded_rectangle((480, 360, 940, 380), radius=10, fill=(255, 255, 255, 180))
fg.save(os.path.join(OUT_DIR, "feature-graphic.png"), "PNG", optimize=True)

print("OK: generated", len([f for f in os.listdir(OUT_DIR) if f.endswith('.png')]), "PNGs in icons/")
print("Android mipmap dirs:", os.listdir(os.path.join(OUT_DIR, "..", "..", "Сборки", "android", "res")))
print("iOS AppIcon set:", len(os.listdir(ios_dir)), "files")
