import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import normalizeUrl from '../../src/utils/normalize-url.js'

test('remove directory index', (t) => {
  const url = 'https://example.com/index.html'
  const result = normalizeUrl(url)

  t.is(result, 'https://example.com')
})

test('remove ref query parameter', (t) => {
  const url = `https://example.com/?ref=${uuid()}`
  const result = normalizeUrl(url)

  t.is(result, 'https://example.com')
})

test('remove fbclid query parameter', (t) => {
  const url = `https://example.com/?fbclid=${uuid()}`
  const result = normalizeUrl(url)

  t.is(result, 'https://example.com')
})

test('remove source query parameter', (t) => {
  const url = `https://example.com/?source=${uuid()}`
  const result = normalizeUrl(url)

  t.is(result, 'https://example.com')
})
