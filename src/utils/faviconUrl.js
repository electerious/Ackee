const localhostRegex = /(^|\.)localhost$/i
const loopbackRegex = /^127(?:\.\d{1,3}){3}$/

const isLocalHostname = (hostname) => {
  return localhostRegex.test(hostname) === true || loopbackRegex.test(hostname) === true || hostname === '[::1]'
}

export default (url) => {
  if (url == null || isLocalHostname(url.hostname) === true) return

  return new URL('/favicon.ico', url).href
}
