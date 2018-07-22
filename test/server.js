'use strict'

const test = require('ava')
const uuid = require('uuid/v4')
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../src/server')

const base = listen(server)

test('return HTML', async (t) => {

	const url = new URL(await base)
	const res = await fetch(url.href)
	const result = await res.text()

	t.true(result.includes('<!doctype html>'))

})

test('return JS', async (t) => {

	const url = new URL('/index.js', await base)
	const res = await fetch(url.href)
	const result = await res.text()

	t.true(result.includes('use strict'))

})

test('return CSS', async (t) => {

	const url = new URL('/index.css', await base)
	const res = await fetch(url.href)
	const result = await res.text()

	t.true(result.includes('html{'))

})

test('return 204', async (t) => {

	const url = new URL(`/${ uuid() }`, await base)
	const { status } = await fetch(url.href)

	t.is(status, 204)

})
