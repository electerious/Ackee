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

// The content type of every static route, so that moving the routes cannot change them.
const routes = [
  ['/', 'text/html; charset=utf-8'],
  ['/index.html', 'text/html; charset=utf-8'],
  ['/favicon.ico', 'image/vnd.microsoft.icon'],
  ['/index.css', 'text/css; charset=utf-8'],
  ['/index.js', 'text/javascript; charset=utf-8'],
  ['/tracker.js', 'text/javascript; charset=utf-8'],
  // The name is specified in the package.json ava configuration
  ['/custom%20name.js', 'text/javascript; charset=utf-8'],
]

for (const [path, type] of routes) {
  test(`return ${path} as ${type}`, async (t) => {
    const url = new URL(path, await base)
    const response = await fetch(url.href)

    t.is(response.status, 200)
    t.is(response.headers.get('Content-Type'), type)
  })
}

test('return the same file for the tracker and the custom tracker', async (t) => {
  const tracker = await fetch(new URL('/tracker.js', await base).href).then((response) => response.text())
  const custom = await fetch(new URL('/custom%20name.js', await base).href).then((response) => response.text())

  t.is(custom, tracker)
})
