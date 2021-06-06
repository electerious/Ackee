'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const layout = require('../../src/utils/layout')

test('return HTML with body', (t) => {
	const body = uuid()
	const result = layout(body, '', [], [])

	t.true(result.includes(body))
})

test('return HTML with favicon', (t) => {
	const favicon = uuid()
	const result = layout('', favicon, [], [])

	t.true(result.includes(favicon))
})

test('return HTML with styles', (t) => {
	const styles = [ uuid(), uuid() ]
	const result = layout('', '', styles, [])

	t.true(result.includes(styles[0]))
	t.true(result.includes(styles[1]))
})

test('return HTML with scripts', (t) => {
	const scripts = [ uuid(), uuid() ]
	const result = layout('', '', [], scripts)

	t.true(result.includes(scripts[0]))
	t.true(result.includes(scripts[1]))
})