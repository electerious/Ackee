import test from 'ava'

import { isSet } from '../../src/utils/ignore-cookie.js'

test('return true when the ignore cookie is set', (t) => {
  t.true(isSet('ackee_ignore=1'))
  t.true(isSet('a=1; ackee_ignore=1; b=2'))
  t.true(isSet(' a=1 ;  ackee_ignore=1 '))
})

test('return false when the ignore cookie is not set', (t) => {
  t.false(isSet())
  t.false(isSet(''))
  t.false(isSet('a=1'))
  t.false(isSet('ackee_ignore=0'))
})

test('return false when another cookie contains the substring', (t) => {
  t.false(isSet('ackee_ignore=10'))
  t.false(isSet('not_ackee_ignore=1'))
  t.false(isSet('x=ackee_ignore=1'))
  t.false(isSet('foo=bar; baz=ackee_ignore=1'))
})
