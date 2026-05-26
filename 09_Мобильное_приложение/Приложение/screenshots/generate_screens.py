"""
Генератор скриншотов 1080×1920 для RuStore / Google Play / App Store.
Не пиксельная копия PWA, а composer-стиль (как генерируется в Figma для маркетинга).
"""
from PIL import Image, ImageDraw, ImageFont
import os

BG = (11, 43, 92, 255)
WHITE = (255, 255, 255, 255)
GOLD = (201, 169, 97, 255)
SUBTLE = (255, 255, 255, 25)
FG = (24, 28, 38, 255)

W, H = 1080, 1920
OUT = os.path.dirname(os.path.abspath(__file__))

def find_font(size, weight="regular"):
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if weight == "bold" else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if weight == "bold" else r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def header(img, draw, title):
    # Тёмная плашка-статусбар
    draw.rectangle((0, 0, W, 60), fill=(0, 0, 0, 80))
    # Лого + название
    draw.rounded_rectangle((40, 90, 130, 180), radius=20, fill=BG, outline=GOLD, width=2)
    draw.text((42, 100), "Р", fill=GOLD, font=find_font(56, "bold"))
    draw.text((150, 100), "ЦП РСФСР", fill=BG, font=find_font(34, "bold"))
    draw.text((150, 142), "Сервис финансирования соц. развития", fill=(100, 110, 130), font=find_font(20))

def card(draw, x, y, w, h, fill=WHITE, shadow=True):
    if shadow:
        draw.rounded_rectangle((x+4, y+8, x+w+4, y+h+8), radius=24, fill=(0, 0, 0, 18))
    draw.rounded_rectangle((x, y, x+w, y+h), radius=24, fill=fill, outline=(225, 225, 235, 255), width=1)

def bar(draw, x, y, w, h, fill=GOLD):
    draw.rounded_rectangle((x, y, x+w, y+h), radius=h//2, fill=fill)

def label(draw, text, x, y, size=24, fill=FG, weight="regular"):
    draw.text((x, y), text, fill=fill, font=find_font(size, weight))

# === 01 Home ===
img = Image.new("RGBA", (W, H), (245, 247, 252, 255))
draw = ImageDraw.Draw(img)
header(img, draw, "Главная")
# Баланс
card(draw, 40, 240, 1000, 280, fill=BG)
draw.text((80, 280), "Совокупный портфель", fill=(255,255,255,200), font=find_font(28))
draw.text((80, 330), "₽ 12 480 000", fill=WHITE, font=find_font(72, "bold"))
draw.text((80, 430), "+2,4% за месяц · 4 ЦФА · 2 актива", fill=GOLD, font=find_font(26))
# Карточки действий
for i, (t, sub) in enumerate([("Новый ЦФА", "Создать заявку"), ("Активы", "Управление"), ("Отчёты", "Скачать PDF"), ("Поддержка", "Чат с оператором")]):
    x = 40 + (i % 2) * 510
    y = 560 + (i // 2) * 200
    card(draw, x, y, 490, 170)
    bar(draw, x+30, y+30, 60, 60, GOLD)
    label(draw, t, x+30, y+105, 30, FG, "bold")
    label(draw, sub, x+30, y+140, 22, (110, 120, 140, 255))
# Лента операций
card(draw, 40, 990, 1000, 460)
label(draw, "Последние операции", 80, 1020, 30, FG, "bold")
for i in range(4):
    yi = 1090 + i * 90
    draw.rounded_rectangle((80, yi, 120, yi+40), radius=10, fill=GOLD)
    label(draw, f"Выпуск ЦФА · {i+1} млн ₽", 150, yi, 26, FG)
    label(draw, f"24.0{i+1}.2026", 150, yi+34, 20, (130, 140, 160, 255))
# Bottom nav
draw.rectangle((0, H-160, W, H), fill=WHITE)
draw.line((0, H-160, W, H-160), fill=(220, 224, 232, 255), width=2)
for i, t in enumerate(["Главная", "Активы", "ЦФА", "Профиль"]):
    x = 40 + i * 250
    bar(draw, x+90, H-130, 60, 6, BG if i == 0 else (200,206,220,255))
    label(draw, t, x+50, H-100, 24, BG if i == 0 else (130,140,160,255), "bold" if i == 0 else "regular")
img.save(os.path.join(OUT, "screen-01-home.png"), "PNG", optimize=True)

# === 02 Assets ===
img = Image.new("RGBA", (W, H), (245, 247, 252, 255))
draw = ImageDraw.Draw(img)
header(img, draw, "Активы")
label(draw, "Мои активы", 40, 240, 48, FG, "bold")
label(draw, "Объекты залога · 2 активных", 40, 310, 26, (110, 120, 140, 255))
for i, (t, v, status) in enumerate([
    ("Квартира, Москва", "₽ 18 500 000", "Под залогом"),
    ("Коммерческая недвижимость", "₽ 32 000 000", "Оценка")
]):
    y = 380 + i * 280
    card(draw, 40, y, 1000, 240)
    bar(draw, 80, y+40, 90, 90, GOLD)
    label(draw, t, 200, y+50, 32, FG, "bold")
    label(draw, v, 200, y+100, 30, BG, "bold")
    label(draw, status, 200, y+150, 22, (130, 140, 160, 255))
    bar(draw, 200, y+190, 200, 30, GOLD if i == 0 else (200,206,220,255))
# CTA
card(draw, 40, 1000, 1000, 200, fill=BG)
label(draw, "+ Добавить актив", 80, 1060, 38, GOLD, "bold")
label(draw, "Оценка, документы, токенизация", 80, 1120, 24, (255,255,255,180))
draw.rectangle((0, H-160, W, H), fill=WHITE)
draw.line((0, H-160, W, H-160), fill=(220, 224, 232, 255), width=2)
for i, t in enumerate(["Главная", "Активы", "ЦФА", "Профиль"]):
    x = 40 + i * 250
    bar(draw, x+90, H-130, 60, 6, BG if i == 1 else (200,206,220,255))
    label(draw, t, x+50, H-100, 24, BG if i == 1 else (130,140,160,255), "bold" if i == 1 else "regular")
img.save(os.path.join(OUT, "screen-02-assets.png"), "PNG", optimize=True)

# === 03 CFA catalog ===
img = Image.new("RGBA", (W, H), (245, 247, 252, 255))
draw = ImageDraw.Draw(img)
header(img, draw, "ЦФА")
label(draw, "Каталог ЦФА", 40, 240, 48, FG, "bold")
label(draw, "Целевые цифровые финансовые активы", 40, 310, 24, (110, 120, 140, 255))
for i, (t, ticker, vol) in enumerate([
    ("Инфраструктура ЖКХ-2026", "RSFSR-INF-01", "Объём 1,2 млрд ₽"),
    ("Соц. жильё (пилот, Татарстан)", "RSFSR-SOC-02", "Объём 850 млн ₽"),
    ("Школьная сеть (пилот)", "RSFSR-EDU-03", "Объём 420 млн ₽"),
]):
    y = 380 + i * 230
    card(draw, 40, y, 1000, 200)
    bar(draw, 70, y+30, 90, 90, BG)
    label(draw, "ЦФА", 92, y+58, 26, GOLD, "bold")
    label(draw, t, 190, y+40, 28, FG, "bold")
    label(draw, ticker, 190, y+82, 22, (110,120,140,255))
    label(draw, vol, 190, y+118, 22, BG, "bold")
    bar(draw, 190, y+150, 140, 28, GOLD)
draw.rectangle((0, H-160, W, H), fill=WHITE)
draw.line((0, H-160, W, H-160), fill=(220, 224, 232, 255), width=2)
for i, t in enumerate(["Главная", "Активы", "ЦФА", "Профиль"]):
    x = 40 + i * 250
    bar(draw, x+90, H-130, 60, 6, BG if i == 2 else (200,206,220,255))
    label(draw, t, x+50, H-100, 24, BG if i == 2 else (130,140,160,255), "bold" if i == 2 else "regular")
img.save(os.path.join(OUT, "screen-03-cfa.png"), "PNG", optimize=True)

# === 04 Profile / KYC ===
img = Image.new("RGBA", (W, H), (245, 247, 252, 255))
draw = ImageDraw.Draw(img)
header(img, draw, "Профиль")
card(draw, 40, 240, 1000, 280, fill=BG)
draw.ellipse((80, 280, 220, 420), fill=GOLD)
label(draw, "К", 130, 305, 80, BG, "bold")
label(draw, "Кагиров А.-Х. А.", 260, 290, 36, WHITE, "bold")
label(draw, "Верифицирован ЕСИА + ЕБС", 260, 340, 22, GOLD)
label(draw, "ID · 4011265", 260, 380, 22, (255,255,255,180))
# KYC статусы
for i, (t, s, ok) in enumerate([
    ("ЕСИА", "Подтверждена", True),
    ("Биометрия (ЕБС)", "Подтверждена", True),
    ("Налоговый резидент", "РФ", True),
    ("ПОД/ФТ (115-ФЗ)", "Активен", True),
]):
    y = 560 + i * 130
    card(draw, 40, y, 1000, 110)
    bar(draw, 80, y+30, 50, 50, GOLD if ok else (220,80,80,255))
    label(draw, t, 160, y+25, 28, FG, "bold")
    label(draw, s, 160, y+62, 22, (130,140,160,255))
draw.rectangle((0, H-160, W, H), fill=WHITE)
draw.line((0, H-160, W, H-160), fill=(220, 224, 232, 255), width=2)
for i, t in enumerate(["Главная", "Активы", "ЦФА", "Профиль"]):
    x = 40 + i * 250
    bar(draw, x+90, H-130, 60, 6, BG if i == 3 else (200,206,220,255))
    label(draw, t, x+50, H-100, 24, BG if i == 3 else (130,140,160,255), "bold" if i == 3 else "regular")
img.save(os.path.join(OUT, "screen-04-profile.png"), "PNG", optimize=True)

print("OK: 4 screenshots generated in", OUT)
