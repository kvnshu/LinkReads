export function truncateUrl(url, limit) {
  if (url.length <= limit) {
    return url
  }
  return url.slice(0, limit) + '. . . '
}