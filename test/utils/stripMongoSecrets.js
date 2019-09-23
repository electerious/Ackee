'use strict'

const test = require('ava')

const stripMongoSecrets = require('../../src/utils/stripMongoSecrets')

test('remove user and password when they are defined', (t) => {
  
  const fullUri = 'mongodb://username:password@host:port/database'
  const expectedResult = 'mongodb://host:port/database'
  t.is(stripMongoSecrets(fullUri), expectedResult)

})

test('keep uri when no username or password is set', (t) => {

  const uri = 'mongodb://host:post/database'
  t.is(stripMongoSecrets(uri), uri)
  
})