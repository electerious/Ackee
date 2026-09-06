import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'
import listen from 'test-listen'

import server from '../src/server.js'
import { job as saltJob } from '../src/utils/salt.js'

const base = listen(server)

test.after.always(() => {
  server.close()
  saltJob.cancel()
})

test('return 404', async (t) => {
  const url = new URL(`/${uuid()}`, await base)
  const { status } = await fetch(url.href)

  t.is(status, 404)
})

test('return security headers', async (t) => {
  const url = new URL('/', await base)
  const response = await fetch(url.href)

  t.is(response.headers.get('X-Content-Type-Options'), 'nosniff')
  t.is(response.headers.get('X-Frame-Options'), 'SAMEORIGIN')
  t.is(response.headers.get('Referrer-Policy'), 'no-referrer')
  t.is(response.headers.get('X-Powered-By'), null)
})

test('return production styles', async (t) => {
  const url = new URL('/index.css', await base)
  const response = await fetch(url.href)
  const content = await response.text()

  t.is(typeof content, 'string')
  t.false(content.includes('sourceMappingURL'))
})

test('return production scripts', async (t) => {
  const url = new URL('/index.js', await base)
  const response = await fetch(url.href)
  const content = await response.text()

  t.is(typeof content, 'string')
  t.false(content.includes('sourceMappingURL'))
})

test('return tracker', async (t) => {
  const url = new URL('/tracker.js', await base)
  const response = await fetch(url.href)
  const content = await response.text()

  t.is(typeof content, 'string')
  t.false(content.includes('sourceMappingURL'))
})

test('return favicon', async (t) => {
  const url = new URL('/favicon.ico', await base)
  const { status } = await fetch(url.href)

  t.is(status, 200)
})
