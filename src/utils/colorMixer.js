export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => Math.round(Math.clamp ? Math.clamp(v, 0, 255) : Math.min(255, Math.max(0, v)))
      .toString(16).padStart(2, '0'))
    .join('')
}

export function mixColors(hex1, hex2, ratio = 0.5) {
  const c1 = hexToRgb(hex1)
  const c2 = hexToRgb(hex2)
  const r = Math.round(c1.r + (c2.r - c1.r) * ratio)
  const g = Math.round(c1.g + (c2.g - c1.g) * ratio)
  const b = Math.round(c1.b + (c2.b - c1.b) * ratio)
  const hex = '#' + [r, g, b]
    .map(v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0'))
    .join('')
  return { r, g, b, hex }
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function getContrastColor(hex) {
  const { r, g, b } = hexToRgb(hex)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#1a1a1a' : '#f0f0f0'
}

const PREMIUM_PALETTE = [
  '#c9a96e','#1a1a2e','#e8613a','#0d1b2a','#7b2fff',
  '#6b9e8f','#4a0e2b','#0f3460','#e8c5c0','#cfb53b',
  '#003153','#b5651d','#00a86b','#5c6b7a','#a0522d',
  '#b8a9c9','#1e3a2f','#ffbf47','#c0392b','#ace1af',
  '#00f5ff','#5f0fff','#e07b6a','#ff6ec7','#2c3e50',
  '#d4e5f7','#4a4e57','#f7e7ce','#7d8c5a','#0047ab',
]

export function generatePremiumRandom() {
  return PREMIUM_PALETTE[Math.floor(Math.random() * PREMIUM_PALETTE.length)]
                       }
