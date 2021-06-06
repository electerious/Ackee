'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('../_utils')
const { getStats } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.after.always(disconnectFromDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const macro = async (t, variables, assertions) => {
	const limit = variables.limit == null ? '' : `, limit: ${ variables.limit }`

	const statistics = await getStats({
		base,
		token: t.context.token.id,
		domainId: t.context.domain.id,
		fragment: `
			devices(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				value
				count
				created
			}
		`,
	})

	assertions(t, statistics.devices)
}

macro.title = (providedTitle, options) => `fetch ${ Object.values(options).join(' and ') } devices`

test(macro, {
	sorting: 'TOP',
	type: 'NO_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 14)
	t.is(devices[0].value, 'Apple')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_MODEL',
	range: 'LAST_6_MONTHS',
	limit: 1,
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple')
})

test(macro, {
	sorting: 'NEW',
	type: 'NO_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple')
})

test(macro, {
	sorting: 'TOP',
	type: 'WITH_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple iPhone')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 14)
	t.is(devices[0].value, 'Apple iPhone')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_MODEL',
	range: 'LAST_6_MONTHS',
	limit: 1,
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple iPhone')
})

test(macro, {
	sorting: 'NEW',
	type: 'WITH_MODEL',
	range: 'LAST_6_MONTHS',
}, (t, devices) => {
	t.is(devices.length, 1)
	t.is(devices[0].value, 'Apple iPhone')
})