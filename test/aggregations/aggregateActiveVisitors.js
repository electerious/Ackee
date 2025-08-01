'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID
const { stub, restore, useFakeTimers } = require('sinon')

const aggregateActiveVisitors = require('../../src/aggregations/aggregateActiveVisitors')
const constants = require('../../src/database/constants')
const createDate = require('../../src/utils/createDate')
const { hour, minute, second } = require('../../src/utils/times')

const stage = {
	matchDomains: 0,
}

const aggregate = () => aggregateActiveVisitors(uuid(), createDate())

let index = 0
test.beforeEach((t) => {
	t.context = {
		...t.context,
		clock: useFakeTimers({
			now: 1732928167799 + index++ * 10 * minute,
		}),
		get: stub(constants, 'get').resolves(),
	}
})
test.afterEach.always(() => {
	restore()
})

test.serial('return aggregation', (t) => {
	t.true(Array.isArray(aggregate()))
})

test.serial('matches created date for default DURATIONS_LIMIT', (t) => {
	t.like(aggregate()[stage.matchDomains], {
		$match: {
			created: { $gte: new Date(Date.now() - 30 * minute) },
		},
	})
})

test.serial('matches created date for customized DURATIONS_LIMIT', async (t) => {
	const value = 2 * hour
	const { clock, get } = t.context
	get.withArgs('DURATIONS_LIMIT').resolves(value)

	// do initial aggregations to cache stubed value in a while
	aggregate()
	await clock.nextAsync()

	t.like(aggregate()[stage.matchDomains], {
		$match: {
			created: { $gte: new Date(Date.now() - value) },
		},
	})
})

test.serial('matches updated date for default DURATIONS_INTERVAL', (t) => {
	t.like(aggregate()[stage.matchDomains], {
		$match: {
			updated: { $gte: new Date(Date.now() - 30 * second) },
		},
	})
})

test.serial('matches updated date for customized DURATIONS_INTERVAL', async (t) => {
	const value = 2 * minute
	const { clock, get } = t.context
	get.withArgs('DURATIONS_INTERVAL').resolves(value)

	// do initial aggregations to cache stubed value in a while
	aggregate()
	await clock.nextAsync()

	t.like(aggregate()[stage.matchDomains], {
		$match: {
			updated: { $gte: new Date(Date.now() - 2 * value) },
		},
	})
})