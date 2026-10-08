import normalizeUrl from 'normalize-url'

export default (url) =>
  normalizeUrl(url, {
    customProtocols: ['mongodb'],
    normalizeProtocol: false,
    stripWWW: false,
    removeTrailingSlash: false,
    sortQueryParameters: false,
  })
