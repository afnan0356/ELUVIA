export function normalizeSearch(text) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ')
}

export function matchScore(color, query) {
  const q = normalizeSearch(query)
  if (!q) return 0
  let score = 0

  const name = normalizeSearch(color.name)
  if (name === q) score += 100
  else if (name.startsWith(q)) score += 80
  else if (name.includes(q)) score += 60

  const hex = color.hex.toLowerCase().replace('#', '')
  const qHex = q.replace('#', '')
  if (hex === qHex) score += 100
  else if (hex.startsWith(qHex) && qHex.length >= 2) score += 70

  for (const tag of color.tags) {
    const t = normalizeSearch(tag)
    if (t === q) score += 50
    else if (t.includes(q)) score += 30
  }

  const words = q.split(' ')
  for (const word of words) {
    if (word.length < 2) continue
    if (name.includes(word)) score += 20
    for (const tag of color.tags) {
      if (tag.includes(word)) score += 15
    }
    if (color.description.toLowerCase().includes(word)) score += 10
  }

  return score
}

export function searchColors(query, colors) {
  if (!query || !query.trim()) return colors

  const results = colors
    .map(color => ({ color, score: matchScore(color, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ color }) => color)

  return results
}

export function filterByMood(mood, colors) {
  if (!mood || mood === 'all') return colors
  return colors.filter(c =>
    c.tags.some(t => t.toLowerCase() === mood.toLowerCase())
  )
}

export function hexToClipboard(hex) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(hex)
  }
  const el = document.createElement('textarea')
  el.value = hex
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return Promise.resolve()
}

export function getColorById(id, colors) {
  return colors.find(c => c.id === id) || null
}

export function getSimilarColors(color, colors, limit = 6) {
  return colors
    .filter(c => c.id !== color.id)
    .map(c => {
      const sharedTags = c.tags.filter(t => color.tags.includes(t)).length
      const hueDiff = Math.abs(c.hsl.h - color.hsl.h)
      const hueScore = Math.max(0, 40 - hueDiff)
      return { color: c, score: sharedTags * 20 + hueScore }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ color }) => color)
    }
