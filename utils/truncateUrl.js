export function truncateUrl(url, limit) {
  if (url.length <= limit - 3) {
    return url
  }
  return url.slice(0, limit) + '...'
}