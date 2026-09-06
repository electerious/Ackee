import test from 'ava'

import setSecurityHeaders from '../../src/utils/securityHeaders.js'

test('sets security headers on web responses', (t) => {
  const headers = new Headers()

  setSecurityHeaders(headers)

  t.is(headers.get('X-Content-Type-Options'), 'nosniff')
  t.is(headers.get('X-Frame-Options'), 'SAMEORIGIN')
  t.is(headers.get('Referrer-Policy'), 'no-referrer')
  t.is(headers.get('Strict-Transport-Security'), 'max-age=31536000; includeSubDomains')
})
