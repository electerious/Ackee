import normalizeUrl from 'normalize-url'

export default (url) =>
  normalizeUrl(url, {
    removeDirectoryIndex: true,
    removeQueryParameters: [/^utm_\w+/i, 'ref', 'fbclid', 'source'],
  })
