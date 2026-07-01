import test from 'ava'

import faviconUrl from '../../src/utils/faviconUrl.js'

test('return favicon URL for public hostnames', (t) => {
  const result = faviconUrl(new URL('https://example.com/path'))

  t.is(result, 'https://example.com/favicon.ico')
})

test('return nothing for localhost hostname', (t) => {
  const result = faviconUrl(new URL('http://localhost:5173/path'))

  t.is(result, undefined)
})

test('return nothing for localhost subdomains', (t) => {
  const result = faviconUrl(new URL('http://app.localhost:5173/path'))

  t.is(result, undefined)
})

test('return nothing for IPv4 loopback hostname', (t) => {
  const result = faviconUrl(new URL('http://127.0.0.1:5173/path'))

  t.is(result, undefined)
})

test('return favicon URL for public IPv4 hostnames', (t) => {
  const result = faviconUrl(new URL('http://192.168.1.1:5173/path'))

  t.is(result, 'http://192.168.1.1:5173/favicon.ico')
})

test('return nothing for IPv6 loopback hostname', (t) => {
  const result = faviconUrl(new URL('http://[::1]:5173/path'))

  t.is(result, undefined)
})
