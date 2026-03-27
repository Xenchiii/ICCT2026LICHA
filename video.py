#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════╗
║  CARAGA REGION XIII — Professional Website Promo Video           ║
║  Drop this file in your project root (next to /images/)          ║
║                                                                   ║
║  Requirements:  pip install pillow numpy opencv-python            ║
║  Also needs:    ffmpeg  (brew install ffmpeg  /  apt install ffmpeg)
║                                                                   ║
║  Run:  python3 make_video.py                                      ║
║  Out:  caraga_promo.mp4                                           ║
╚══════════════════════════════════════════════════════════════════╝
"""

import os, sys, math, time, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# ─────────────────────────────────────────────────────────────────
#  OUTPUT SETTINGS
# ─────────────────────────────────────────────────────────────────
W, H   = 1920, 1080   # full HD
FPS    = 30
OUT    = "caraga_promo.mp4"

# ─────────────────────────────────────────────────────────────────
#  BRAND COLOURS  (from your style.css)
# ─────────────────────────────────────────────────────────────────
DEEP_CYAN  = (0,   133, 129)
MED_GREEN  = (76,  156, 139)
SUM_GREEN  = (150, 228, 176)
HOT_PINK   = (228,  80, 154)
GOLD       = (212, 160,  10)
WHITE      = (255, 255, 255)
DARK       = (4,    26,  24)
CARD_DARK  = (22,   41,  40)
TEXT_MID   = (156, 196, 192)

# ─────────────────────────────────────────────────────────────────
#  SCENES  — edit image paths, titles and timings here
#
#  Each scene dict:
#    image   : path relative to this script  (None = gradient bg)
#    duration: seconds this scene plays
#    title   : big headline
#    subtitle: smaller line
#    label   : tiny ALL-CAPS pill label
#    section : which site section this represents
#    color   : accent colour (R,G,B)
#    ken_burns: (zoom_start, zoom_end, pan_x, pan_y)  — subtle
# ─────────────────────────────────────────────────────────────────
SCENES = [
    # ── INTRO ────────────────────────────────────────────────────
    {
        "image"    : "images/hero-siargao.jpg",
        "duration" : 5,
        "label"    : "CARAGA · REGION XIII · PHILIPPINES",
        "title"    : "Discover the Land of Promise",
        "subtitle" : "Five Provinces  ·  One Region  ·  Endless Wonder",
        "section"  : "intro",
        "color"    : DEEP_CYAN,
        "ken_burns": (1.0, 1.08, 0.0, -0.02),
    },

    # ── HERO / WEBSITE LANDING ───────────────────────────────────
    {
        "image"    : "images/hero-britania.jpg",
        "duration" : 5,
        "label"    : "HERO · LANDING PAGE",
        "title"    : "WEBster · Vertex XIII",
        "subtitle" : "Award-winning tourism website for Caraga Region XIII",
        "section"  : "website",
        "color"    : MED_GREEN,
        "ken_burns": (1.05, 1.0, 0.02, 0.01),
    },

    # ── PROVINCES ────────────────────────────────────────────────
    {
        "image"    : "images/province-agusan-norte.jpg",
        "duration" : 5,
        "label"    : "PROVINCES · AGUSAN DEL NORTE",
        "title"    : "Agusan del Norte",
        "subtitle" : "The Political Heart of Caraga  ·  Butuan City",
        "section"  : "provinces",
        "color"    : DEEP_CYAN,
        "ken_burns": (1.0, 1.07, -0.02, 0.0),
    },
    {
        "image"    : "images/province-agusan-sur.jpg",
        "duration" : 4,
        "label"    : "PROVINCES · AGUSAN DEL SUR",
        "title"    : "Agusan del Sur",
        "subtitle" : "Heart of the Agusan Marsh  ·  Largest Province in Mindanao",
        "section"  : "provinces",
        "color"    : MED_GREEN,
        "ken_burns": (1.06, 1.0, 0.01, -0.01),
    },
    {
        "image"    : "images/province-surigao-norte.jpg",
        "duration" : 4,
        "label"    : "PROVINCES · SURIGAO DEL NORTE",
        "title"    : "Surigao del Norte",
        "subtitle" : "Surfing Capital of the Philippines  ·  Home of Siargao",
        "section"  : "provinces",
        "color"    : (0, 100, 180),
        "ken_burns": (1.0, 1.08, 0.0, 0.02),
    },
    {
        "image"    : "images/province-surigao-sur.jpg",
        "duration" : 4,
        "label"    : "PROVINCES · SURIGAO DEL SUR",
        "title"    : "Surigao del Sur",
        "subtitle" : "Enchanted River  ·  Tinuy-an Falls  ·  Britania Islands",
        "section"  : "provinces",
        "color"    : (0, 130, 80),
        "ken_burns": (1.07, 1.0, -0.01, 0.0),
    },
    {
        "image"    : "images/province-dinagat.jpg",
        "duration" : 4,
        "label"    : "PROVINCES · DINAGAT ISLANDS",
        "title"    : "Dinagat Islands",
        "subtitle" : "Cathedral Caves  ·  Bioluminescence  ·  Sohoton Cove",
        "section"  : "provinces",
        "color"    : (100, 0, 180),
        "ken_burns": (1.0, 1.06, 0.02, -0.02),
    },

    # ── TOURIST SPOTS ─────────────────────────────────────────────
    {
        "image"    : "images/spot-siargao.jpg",
        "duration" : 5,
        "label"    : "TOURIST SPOTS",
        "title"    : "Cloud 9 — Siargao Island",
        "subtitle" : "World-class surf break  ·  Best Island in the World 2021",
        "section"  : "spots",
        "color"    : (0, 80, 160),
        "ken_burns": (1.08, 1.0, -0.03, 0.0),
    },
    {
        "image"    : "images/spot-enchanted.jpg",
        "duration" : 5,
        "label"    : "TOURIST SPOTS",
        "title"    : "Enchanted River",
        "subtitle" : "Hinatuan, Surigao del Sur  ·  Depth unknown — 80m+ and counting",
        "section"  : "spots",
        "color"    : (0, 80, 200),
        "ken_burns": (1.0, 1.06, 0.0, -0.03),
    },
    {
        "image"    : "images/spot-tinuyan.jpg",
        "duration" : 5,
        "label"    : "TOURIST SPOTS",
        "title"    : "Tinuy-an Falls",
        "subtitle" : "The Niagara Falls of the Philippines  ·  95 metres wide",
        "section"  : "spots",
        "color"    : MED_GREEN,
        "ken_burns": (1.05, 1.0, 0.02, 0.02),
    },
    {
        "image"    : "images/spot-marsh.jpg",
        "duration" : 5,
        "label"    : "TOURIST SPOTS",
        "title"    : "Agusan Marsh Wildlife Sanctuary",
        "subtitle" : "Ramsar Wetland  ·  Floating Manobo Communities  ·  14,000+ hectares",
        "section"  : "spots",
        "color"    : (30, 110, 40),
        "ken_burns": (1.0, 1.07, -0.02, 0.01),
    },
    {
        "image"    : "images/spot-britania.jpg",
        "duration" : 4,
        "label"    : "TOURIST SPOTS",
        "title"    : "Britania Islands",
        "subtitle" : "24 pristine islets  ·  San Agustin, Surigao del Sur",
        "section"  : "spots",
        "color"    : (0, 120, 160),
        "ken_burns": (1.06, 1.0, 0.01, -0.02),
    },
    {
        "image"    : "images/spot-sohoton.jpg",
        "duration" : 4,
        "label"    : "TOURIST SPOTS",
        "title"    : "Sohoton Cove",
        "subtitle" : "Dinagat Islands  ·  Jellyfish Sanctuary  ·  Bioluminescent Bay",
        "section"  : "spots",
        "color"    : (80, 0, 180),
        "ken_burns": (1.0, 1.08, 0.03, 0.0),
    },

    # ── CULTURE & EVENTS ──────────────────────────────────────────
    {
        "image"    : "images/festival-balanghai.jpg",
        "duration" : 5,
        "label"    : "CULTURE & EVENTS",
        "title"    : "Balanghai Festival",
        "subtitle" : "August  ·  Butuan City  ·  Fluvial parade on the Agusan River",
        "section"  : "culture",
        "color"    : DEEP_CYAN,
        "ken_burns": (1.04, 1.0, -0.01, 0.02),
    },
    {
        "image"    : "images/festival-cloud9.jpg",
        "duration" : 4,
        "label"    : "CULTURE & EVENTS",
        "title"    : "Siargao International Surfing Cup",
        "subtitle" : "September  ·  Siargao Island  ·  One of Asia's premier surf events",
        "section"  : "culture",
        "color"    : (0, 80, 160),
        "ken_burns": (1.0, 1.06, 0.02, -0.01),
    },
    {
        "image"    : "images/festival-bonok.jpg",
        "duration" : 4,
        "label"    : "CULTURE & EVENTS",
        "title"    : "Bonok-Bonok Maradjao Kataw",
        "subtitle" : "September  ·  Surigao City  ·  Maritime heritage festival",
        "section"  : "culture",
        "color"    : (0, 110, 130),
        "ken_burns": (1.05, 1.0, -0.02, 0.0),
    },

    # ── DELICACIES ───────────────────────────────────────────────
    {
        "image"    : "images/food-kinilaw.jpg",
        "duration" : 5,
        "label"    : "DELICACIES",
        "title"    : "Kinilaw na Isda",
        "subtitle" : "Fresh raw fish in native cane vinegar  ·  The soul of Caraga's coast",
        "section"  : "delicacies",
        "color"    : (0, 80, 150),
        "ken_burns": (1.0, 1.05, 0.0, -0.02),
    },
    {
        "image"    : "images/food-kalamay.jpg",
        "duration" : 4,
        "label"    : "DELICACIES",
        "title"    : "Kalamay",
        "subtitle" : "Glutinous rice · Coconut milk · The sweetest pasalubong from Surigao",
        "section"  : "delicacies",
        "color"    : (160, 60, 100),
        "ken_burns": (1.04, 1.0, 0.02, 0.01),
    },

    # ── NOTABLE PERSONALITIES ─────────────────────────────────────
    {
        "image"    : "images/Manny_Pacquiao.jpg",
        "duration" : 4,
        "label"    : "NOTABLE PERSONALITIES",
        "title"    : "Manny Pacquiao",
        "subtitle" : "8-Division World Boxing Champion  ·  Senator of the Philippines",
        "section"  : "personalities",
        "color"    : (160, 0, 0),
        "ken_burns": (1.0, 1.06, -0.02, 0.0),
    },
    {
        "image"    : "images/Felipe_Padilla.jpg",
        "duration" : 4,
        "label"    : "NOTABLE PERSONALITIES",
        "title"    : "Felipe Padilla de León",
        "subtitle" : "National Artist for Music  ·  Composer of 'Bayan Ko'  ·  Surigao City",
        "section"  : "personalities",
        "color"    : (80, 0, 140),
        "ken_burns": (1.05, 1.0, 0.01, -0.02),
    },

    # ── CONTACT / CLOSING ─────────────────────────────────────────
    {
        "image"    : "images/hero-siargao.jpg",
        "duration" : 6,
        "label"    : "CONTACT US",
        "title"    : "Plan Your Journey to Caraga",
        "subtitle" : "Butuan City  ·  Agusan del Norte  ·  Region XIII  ·  Philippines",
        "section"  : "contact",
        "color"    : DEEP_CYAN,
        "ken_burns": (1.08, 1.0, 0.0, 0.03),
    },
]

TRANSITION_FRAMES = 18   # 0.6s crossfade between scenes

# ─────────────────────────────────────────────────────────────────
#  FONT HELPER
# ─────────────────────────────────────────────────────────────────
def get_font(size, bold=False):
    """Try system fonts in priority order."""
    candidates = []
    if bold:
        candidates = [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
            "C:/Windows/Fonts/arialbd.ttf",
            "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
        ]
    else:
        candidates = [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
            "C:/Windows/Fonts/arial.ttf",
            "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
        ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

# ─────────────────────────────────────────────────────────────────
#  EASING FUNCTIONS
# ─────────────────────────────────────────────────────────────────
def ease_out(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3

def ease_in_out(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))

# ─────────────────────────────────────────────────────────────────
#  IMAGE LOADER  (robust — returns None if missing)
# ─────────────────────────────────────────────────────────────────
_img_cache = {}

def load_image(path):
    if path is None:
        return None
    if path in _img_cache:
        return _img_cache[path]
    if not os.path.exists(path):
        print(f"  [WARN] image not found: {path}")
        _img_cache[path] = None
        return None
    try:
        img = Image.open(path).convert("RGB")
        # Resize to cover W×H while keeping aspect ratio
        iw, ih = img.size
        scale = max(W / iw, H / ih) * 1.15   # 15% extra for Ken Burns room
        nw, nh = int(iw * scale), int(ih * scale)
        img = img.resize((nw, nh), Image.LANCZOS)
        _img_cache[path] = img
        return img
    except Exception as e:
        print(f"  [WARN] could not load {path}: {e}")
        _img_cache[path] = None
        return None

# ─────────────────────────────────────────────────────────────────
#  GRADIENT FALLBACK  (when no image)
# ─────────────────────────────────────────────────────────────────
def gradient_fallback(color):
    """Dark cinematic gradient using the scene accent colour."""
    arr = np.zeros((H, W, 3), np.uint8)
    for y in range(H):
        t = y / H
        # Top: very dark, bottom: colour tinted
        r = int(DARK[0] + (color[0] - DARK[0]) * t * 0.55)
        g = int(DARK[1] + (color[1] - DARK[1]) * t * 0.55)
        b = int(DARK[2] + (color[2] - DARK[2]) * t * 0.55)
        arr[y, :] = [r, g, b]
    return Image.fromarray(arr)

# ─────────────────────────────────────────────────────────────────
#  KEN BURNS CROP
# ─────────────────────────────────────────────────────────────────
def ken_burns_crop(img, progress, zoom_start, zoom_end, pan_x, pan_y):
    """
    Smoothly zoom + pan a PIL image and return a W×H crop.
    progress : 0.0 → 1.0 within this scene
    zoom_start/end : e.g. 1.0 → 1.08
    pan_x/y : how far to drift (fraction of extra space)
    """
    if img is None:
        return None

    p = ease_in_out(progress)
    zoom = zoom_start + (zoom_end - zoom_start) * p

    iw, ih = img.size
    # Target crop size
    cw = int(W / zoom)
    ch = int(H / zoom)
    cw = min(cw, iw)
    ch = min(ch, ih)

    # Centre + pan offset
    cx = (iw - cw) // 2 + int(pan_x * (iw - cw) * p)
    cy = (ih - ch) // 2 + int(pan_y * (ih - ch) * p)
    cx = max(0, min(iw - cw, cx))
    cy = max(0, min(ih - ch, cy))

    cropped = img.crop((cx, cy, cx + cw, cy + ch))
    return cropped.resize((W, H), Image.LANCZOS)

# ─────────────────────────────────────────────────────────────────
#  VIGNETTE  (cached)
# ─────────────────────────────────────────────────────────────────
_VIGNETTE = None
def get_vignette():
    global _VIGNETTE
    if _VIGNETTE is not None:
        return _VIGNETTE
    arr = np.ones((H, W), np.float32)
    cx, cy = W / 2, H / 2
    for y in range(H):
        for x in range(0, W, 4):  # compute at 1/4 then broadcast
            dx = (x - cx) / W
            dy = (y - cy) / H
            v = 1.0 - clamp((dx*dx + dy*dy) / 0.35) ** 1.2 * 0.72
            arr[y, x:x+4] = v
    _VIGNETTE = arr
    return _VIGNETTE

def apply_vignette(arr):
    v = get_vignette()[:, :, None]
    return np.clip(arr.astype(np.float32) * v, 0, 255).astype(np.uint8)

# ─────────────────────────────────────────────────────────────────
#  FILM GRAIN  (subtle, pre-baked)
# ─────────────────────────────────────────────────────────────────
_rng = np.random.RandomState(42)
_GRAIN = [_rng.randint(-6, 6, (H, W, 3), dtype=np.int16) for _ in range(8)]

def apply_grain(arr, fi):
    return np.clip(arr.astype(np.int16) + _GRAIN[fi % 8], 0, 255).astype(np.uint8)

# ─────────────────────────────────────────────────────────────────
#  LETTERBOX
# ─────────────────────────────────────────────────────────────────
LB = 62  # 2.39:1 cinematic bars

def apply_letterbox(arr):
    arr[:LB]  = 0
    arr[-LB:] = 0
    return arr

# ─────────────────────────────────────────────────────────────────
#  COLOUR GRADE  (makes photos feel cinematic)
# ─────────────────────────────────────────────────────────────────
def colour_grade(arr, teal_shift=True):
    """
    Lift shadows, desaturate slightly, push teal in shadows.
    Classic cinematic look.
    """
    f = arr.astype(np.float32) / 255.0

    # Lift blacks slightly (prevents crushed shadows)
    f = f * 0.88 + 0.06

    # Slight cool push in midtones → teal/cyan feel
    if teal_shift:
        f[:, :, 1] = np.clip(f[:, :, 1] * 1.04, 0, 1)   # green up
        f[:, :, 2] = np.clip(f[:, :, 2] * 1.06, 0, 1)   # blue up
        f[:, :, 0] = np.clip(f[:, :, 0] * 0.96, 0, 1)   # red down

    # Contrast S-curve  (mild)
    f = np.where(f < 0.5,
                 2 * f * f,
                 1 - 2 * (1-f)**2)
    f = f * 0.5 + 0.5 * (f * 0.85 + 0.08)   # blend original + S-curve

    return np.clip(f * 255, 0, 255).astype(np.uint8)

# ─────────────────────────────────────────────────────────────────
#  TEXT RENDERING HELPERS
# ─────────────────────────────────────────────────────────────────
def draw_text_centered(draw, text, y, font, color, alpha=255):
    bb = draw.textbbox((0, 0), text, font=font)
    x = (W - (bb[2] - bb[0])) // 2
    draw.text((x, y), text, font=font, fill=(*color, alpha))
    return bb[3] - bb[1]  # height

def make_text_layer(texts_spec):
    """
    texts_spec: list of dicts with keys:
        text, y, font, color, glow_color, glow_r, shadow, alpha
    Returns an RGBA PIL image (H×W).
    """
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    for spec in texts_spec:
        text       = spec["text"]
        y          = spec["y"]
        font       = spec["font"]
        color      = spec.get("color", WHITE)
        glow_color = spec.get("glow_color", DEEP_CYAN)
        glow_r     = spec.get("glow_r", 0)
        alpha      = spec.get("alpha", 1.0)
        shadow     = spec.get("shadow", True)

        a = int(255 * alpha)
        if a < 4:
            continue

        d = ImageDraw.Draw(layer)
        bb = d.textbbox((0, 0), text, font=font)
        tw = bb[2] - bb[0]
        tx = (W - tw) // 2

        # Glow pass
        if glow_r > 0:
            gl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            gd = ImageDraw.Draw(gl)
            gd.text((tx, y), text, font=font, fill=(*glow_color, int(a * 0.85)))
            gl = gl.filter(ImageFilter.GaussianBlur(glow_r))
            layer = Image.alpha_composite(layer, gl)

        # Shadow pass
        if shadow:
            sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            sd = ImageDraw.Draw(sh)
            sd.text((tx + 3, y + 3), text, font=font, fill=(0, 0, 0, int(a * 0.55)))
            sh = sh.filter(ImageFilter.GaussianBlur(4))
            layer = Image.alpha_composite(layer, sh)

        # Main text
        d2 = ImageDraw.Draw(layer)
        d2.text((tx, y), text, font=font, fill=(*color, a))

    return layer

# ─────────────────────────────────────────────────────────────────
#  SCENE TEXT OVERLAYS
# ─────────────────────────────────────────────────────────────────
# Pre-bake text per scene (once, not per frame)
_TEXT_CACHE = {}

def get_scene_text_layer(scene_idx, scene):
    if scene_idx in _TEXT_CACHE:
        return _TEXT_CACHE[scene_idx]

    label    = scene.get("label", "")
    title    = scene["title"]
    subtitle = scene.get("subtitle", "")
    color    = scene["color"]

    # Font sizes
    f_label = get_font(26, bold=True)
    f_title = get_font(90, bold=True)
    f_sub   = get_font(36, bold=False)

    # Measure title height to position everything relative to it
    tmp = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    tb  = tmp.textbbox((0, 0), title, font=f_title)
    th  = tb[3] - tb[1]

    # Vertical centre anchor — put title at ~58% of visible area
    vis_h   = H - 2 * LB
    title_y = LB + int(vis_h * 0.58) - th // 2
    label_y = title_y - 58
    div_y   = title_y + th + 14
    sub_y   = div_y + 24

    specs = []

    # Label pill
    if label:
        specs.append({
            "text"      : label,
            "y"         : label_y,
            "font"      : f_label,
            "color"     : color,
            "glow_color": color,
            "glow_r"    : 18,
            "shadow"    : False,
            "alpha"     : 1.0,
        })

    # Title
    specs.append({
        "text"      : title,
        "y"         : title_y,
        "font"      : f_title,
        "color"     : WHITE,
        "glow_color": color,
        "glow_r"    : 32,
        "shadow"    : True,
        "alpha"     : 1.0,
    })

    # Subtitle
    if subtitle:
        specs.append({
            "text"      : subtitle,
            "y"         : sub_y,
            "font"      : f_sub,
            "color"     : (220, 240, 238),
            "glow_color": DARK,
            "glow_r"    : 0,
            "shadow"    : True,
            "alpha"     : 0.88,
        })

    # Divider line (bake into layer directly)
    layer = make_text_layer(specs)

    # Draw divider
    dl = ImageDraw.Draw(layer)
    bb = dl.textbbox((0, 0), title, font=f_title)
    tw = bb[2] - bb[0]
    hw = min(tw // 2, 400)
    cx = W // 2
    dl.line([(cx - hw, div_y + 6), (cx + hw, div_y + 6)],
            fill=(*color, 180), width=2)
    for ex in [cx - hw, cx, cx + hw]:
        dl.ellipse([(ex - 4, div_y + 2), (ex + 4, div_y + 10)],
                   fill=(*color, 200))

    _TEXT_CACHE[scene_idx] = layer
    return layer

# ─────────────────────────────────────────────────────────────────
#  BOTTOM GRADIENT  (so text pops over bright images)
# ─────────────────────────────────────────────────────────────────
_BOTTOM_GRAD = None
def get_bottom_grad():
    global _BOTTOM_GRAD
    if _BOTTOM_GRAD is not None:
        return _BOTTOM_GRAD
    arr = np.zeros((H, W, 4), np.uint8)
    mid = H // 2
    for y in range(mid, H):
        t = (y - mid) / (H - mid)
        a = int(ease_in_out(t) * 210)
        arr[y, :] = [0, 0, 0, a]
    _BOTTOM_GRAD = Image.fromarray(arr, "RGBA")
    return _BOTTOM_GRAD

# ─────────────────────────────────────────────────────────────────
#  HORIZONTAL SCAN LINE  (very subtle — premium feel)
# ─────────────────────────────────────────────────────────────────
def apply_subtle_scanlines(arr):
    mask = np.ones((H, W, 3), np.float32)
    mask[::2, :] = 0.97  # every other line dim by 3%
    return np.clip(arr.astype(np.float32) * mask, 0, 255).astype(np.uint8)

# ─────────────────────────────────────────────────────────────────
#  COMPOSITE ONE FRAME
# ─────────────────────────────────────────────────────────────────
def composite(photo_arr, text_layer, text_alpha, fi):
    """
    photo_arr  : H×W×3 numpy uint8
    text_layer : RGBA PIL image (precomputed)
    text_alpha : 0.0 → 1.0  (fade in/out)
    fi         : frame index (for grain)
    """
    # 1. Colour grade the photo
    frame = colour_grade(photo_arr)

    # 2. Vignette
    frame = apply_vignette(frame)

    # 3. Composite bottom gradient
    base = Image.fromarray(frame).convert("RGBA")
    base = Image.alpha_composite(base, get_bottom_grad())

    # 4. Composite text at current alpha
    if text_alpha > 0.01 and text_layer is not None:
        if text_alpha < 0.999:
            r, g, b, a = text_layer.split()
            a2 = a.point(lambda v: int(v * text_alpha))
            tl = Image.merge("RGBA", [r, g, b, a2])
        else:
            tl = text_layer
        base = Image.alpha_composite(base, tl)

    # 5. Back to numpy
    frame = np.array(base.convert("RGB"))

    # 6. Film grain
    frame = apply_grain(frame, fi)

    # 7. Letterbox
    frame = apply_letterbox(frame)

    return frame

# ─────────────────────────────────────────────────────────────────
#  CROSSFADE
# ─────────────────────────────────────────────────────────────────
def crossfade(a, b, t):
    t = ease_in_out(t)
    return np.clip(a.astype(np.float32) * (1 - t) +
                   b.astype(np.float32) * t, 0, 255).astype(np.uint8)

# ─────────────────────────────────────────────────────────────────
#  NAVBAR OVERLAY  (subtle top bar matching the website)
# ─────────────────────────────────────────────────────────────────
_NAVBAR = None
def get_navbar():
    global _NAVBAR
    if _NAVBAR is not None:
        return _NAVBAR

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    # Navbar bg
    d.rectangle([(0, LB), (W, LB + 56)], fill=(0, 60, 58, 210))

    # Logo box
    d.rounded_rectangle([(18, LB + 10), (52, LB + 46)], radius=8,
                         fill=(255, 255, 255, 40))
    d.text((22, LB + 14), "XIII", font=get_font(16, True),
           fill=(255, 255, 255, 230))

    # Brand
    d.text((60, LB + 13), "WEBster · Vertex XIII",
           font=get_font(16, True), fill=(255, 255, 255, 220))
    d.text((60, LB + 32), "Region XIII — Caraga",
           font=get_font(12), fill=(*SUM_GREEN, 180))

    # Nav links (right side)
    links = ["Home", "Provinces", "Tourist Spots", "Culture", "Delicacies", "Personalities", "Contact"]
    xr = W - 16
    lf = get_font(13)
    for link in reversed(links):
        bb = d.textbbox((0, 0), link, font=lf)
        lw = bb[2] - bb[0]
        xr -= lw + 18
        d.text((xr + 9, LB + 20), link, font=lf, fill=(255, 255, 255, 190))

    _NAVBAR = layer
    return _NAVBAR

# ─────────────────────────────────────────────────────────────────
#  SECTION BADGE  (top-left, shows which part of the site we're on)
# ─────────────────────────────────────────────────────────────────
_BADGE_CACHE = {}
def get_section_badge(section, color):
    if section in _BADGE_CACHE:
        return _BADGE_CACHE[section]

    LABELS = {
        "intro"        : "",
        "website"      : "WEBSITE OVERVIEW",
        "provinces"    : "PROVINCES",
        "spots"        : "TOURIST SPOTS",
        "culture"      : "CULTURE & EVENTS",
        "delicacies"   : "DELICACIES",
        "personalities": "NOTABLE PERSONALITIES",
        "contact"      : "CONTACT",
    }
    text = LABELS.get(section, "")
    if not text:
        _BADGE_CACHE[section] = None
        return None

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    f = get_font(18, True)
    bb = d.textbbox((0, 0), text, font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    px, py = 14, 8
    # Pill
    d.rounded_rectangle([22, LB + 70, 22 + tw + px * 2, LB + 70 + th + py * 2],
                         radius=20, fill=(*color, 50))
    d.rounded_rectangle([22, LB + 70, 22 + tw + px * 2, LB + 70 + th + py * 2],
                         radius=20, outline=(*color, 140), width=1)
    d.text((22 + px, LB + 70 + py), text, font=f, fill=(*color, 230))

    _BADGE_CACHE[section] = layer
    return layer

# ─────────────────────────────────────────────────────────────────
#  BUILD FRAME LIST
# ─────────────────────────────────────────────────────────────────
def build_frame_list():
    """
    Returns list of (scene_idx, local_progress, is_transition, trans_progress, trans_to)
    one entry per video frame.
    """
    frames = []

    for si, scene in enumerate(SCENES):
        total_frames = int(scene["duration"] * FPS)
        # Reserve transition frames at the END of each scene (except the last)
        main_frames = total_frames - (TRANSITION_FRAMES if si < len(SCENES) - 1 else 0)
        main_frames = max(main_frames, 1)

        for fi in range(main_frames):
            frames.append({
                "scene"     : si,
                "progress"  : fi / max(total_frames - 1, 1),
                "transition": False,
                "trans_t"   : 0.0,
                "trans_to"  : si,
            })

        # Transition frames
        if si < len(SCENES) - 1:
            for ti in range(TRANSITION_FRAMES):
                frames.append({
                    "scene"     : si,
                    "progress"  : (main_frames + ti) / max(total_frames - 1, 1),
                    "transition": True,
                    "trans_t"   : (ti + 1) / (TRANSITION_FRAMES + 1),
                    "trans_to"  : si + 1,
                })

    return frames

# ─────────────────────────────────────────────────────────────────
#  TEXT FADE TIMING
# ─────────────────────────────────────────────────────────────────
def text_alpha(progress, scene_duration):
    """
    Fade in 0→1 during first 20% of scene,
    hold, fade out 1→0 during last 15%.
    """
    fi_frac = progress
    fade_in_end  = 0.20
    fade_out_start = 0.82

    if fi_frac < fade_in_end:
        return ease_out(fi_frac / fade_in_end)
    elif fi_frac > fade_out_start:
        return 1.0 - ease_out((fi_frac - fade_out_start) / (1.0 - fade_out_start))
    else:
        return 1.0

# ─────────────────────────────────────────────────────────────────
#  RENDER
# ─────────────────────────────────────────────────────────────────
def render():
    print(f"\n{'═'*60}")
    print( "  CARAGA REGION XIII — Professional Promo Video")
    print(f"  {W}×{H}  ·  {FPS}fps  ·  {len(SCENES)} scenes")
    print(f"  Output → {OUT}")
    print(f"{'═'*60}\n")

    # Pre-load all images
    print("  Loading images...")
    images = []
    for i, scene in enumerate(SCENES):
        img = load_image(scene.get("image"))
        if img is None:
            img = gradient_fallback(scene["color"])
            print(f"    Scene {i+1}: using gradient fallback")
        images.append(img)
    print(f"  {sum(1 for i in images if i is not None)}/{len(SCENES)} images loaded\n")

    # Pre-bake text layers
    print("  Pre-baking text layers...")
    text_layers = [get_scene_text_layer(i, s) for i, s in enumerate(SCENES)]
    get_bottom_grad()
    get_vignette()
    get_navbar()
    print("  Text layers ready\n")

    # Build frame list
    frame_list = build_frame_list()
    total_frames = len(frame_list)
    total_secs   = total_frames / FPS
    print(f"  Total frames: {total_frames}  ({total_secs:.1f}s)\n")

    # ffmpeg pipe
    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{W}x{H}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "pipe:0",
        "-vcodec", "libx264",
        "-preset", "slow",    # better quality
        "-crf", "16",          # near-lossless
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        OUT,
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    t0 = time.time()

    for fi, fdata in enumerate(frame_list):
        si      = fdata["scene"]
        prog    = fdata["progress"]
        is_trans= fdata["transition"]
        trans_t = fdata["trans_t"]
        trans_to= fdata["trans_to"]

        scene = SCENES[si]
        kb    = scene["ken_burns"]
        img   = images[si]

        # Photo frame A
        arr_a = np.array(ken_burns_crop(img, prog, kb[0], kb[1], kb[2], kb[3]))

        # Text alpha
        ta = text_alpha(prog, scene["duration"])

        if is_trans:
            # Generate frame B (next scene, start position)
            scene_b = SCENES[trans_to]
            kb_b    = scene_b["ken_burns"]
            img_b   = images[trans_to]
            arr_b   = np.array(ken_burns_crop(img_b, 0.0, kb_b[0], kb_b[1], kb_b[2], kb_b[3]))

            fa = composite(arr_a, text_layers[si],   max(0, ta - trans_t * 2), fi)
            fb = composite(arr_b, text_layers[trans_to], 0.0, fi)
            out_arr = crossfade(fa, fb, trans_t)
        else:
            # Normal frame
            tl = text_layers[si]
            nav_alpha = clamp(prog * 6)  # navbar fades in fast
            out_arr = composite(arr_a, tl, ta, fi)

            # Overlay navbar + section badge
            base = Image.fromarray(out_arr).convert("RGBA")
            if nav_alpha > 0.01:
                nav = get_navbar()
                if nav_alpha < 0.999:
                    r, g, b, a = nav.split()
                    a2 = a.point(lambda v: int(v * nav_alpha))
                    nav = Image.merge("RGBA", [r, g, b, a2])
                base = Image.alpha_composite(base, nav)

                badge = get_section_badge(scene["section"], scene["color"])
                if badge and nav_alpha > 0.01:
                    if nav_alpha < 0.999:
                        r, g, b, a = badge.split()
                        a2 = a.point(lambda v: int(v * nav_alpha))
                        badge = Image.merge("RGBA", [r, g, b, a2])
                    base = Image.alpha_composite(base, badge)

            out_arr = np.array(base.convert("RGB"))

        proc.stdin.write(out_arr.tobytes())

        # Progress bar
        if fi % (FPS * 2) == 0 or fi == total_frames - 1:
            el  = time.time() - t0
            fps_r = fi / max(el, 0.001)
            rem = (total_frames - fi) / max(fps_r, 0.001)
            pct = fi / total_frames * 100
            bar = "█" * int(pct / 2) + "░" * (50 - int(pct / 2))
            sc_name = SCENES[si]["title"][:30]
            print(f"\r  [{bar}] {pct:5.1f}%  {fps_r:.1f}fps  ~{rem:.0f}s  {sc_name}",
                  end="", flush=True)

    proc.stdin.close()
    proc.wait()

    elapsed = time.time() - t0
    size_mb = os.path.getsize(OUT) / 1_048_576 if os.path.exists(OUT) else 0

    print(f"\n\n{'═'*60}")
    print(f"  ✅  Done!  {elapsed:.0f}s ({elapsed/60:.1f} min)")
    print(f"  📁  {OUT}  ({size_mb:.1f} MB)")
    print(f"{'═'*60}\n")

# ─────────────────────────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Check ffmpeg
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("ERROR: ffmpeg not found.")
        print("  macOS:   brew install ffmpeg")
        print("  Ubuntu:  sudo apt install ffmpeg")
        print("  Windows: https://ffmpeg.org/download.html")
        sys.exit(1)

    render()