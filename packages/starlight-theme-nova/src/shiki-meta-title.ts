export function parseTitleString(meta: string): string | null {
  if (!meta) return null
  const match = meta.match(/title="([^"]+)"/)
  if (!match) return null
  return match[1]
}
