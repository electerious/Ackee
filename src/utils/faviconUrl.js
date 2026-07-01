const localhostRegex = /(^|\.)localhost$/i
const loopbackRegex = /^127(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/

const isLocalHostname = (hostname) => {
  return localhostRegex.test(hostname) || loopbackRegex.test(hostname) || hostname === '[::1]'
}

export default (url) => {
  if (url == null || isLocalHostname(url.hostname) === true) return

  return new URL('/favicon.ico', url).href
}
