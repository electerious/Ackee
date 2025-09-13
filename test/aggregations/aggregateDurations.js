'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID
const { range } = require('ramda')
const { stub, restore, useFakeTimers } = require('sinon')

const aggregateDurations = require('../../src/aggregations/aggregateDurations')
const intervals = require('../../src/constants/intervals')
const constants = require('../../src/database/constants')
const createDate = require('../../src/utils/createDate')
const { hour, minute, second } = require('../../src/utils/times')

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
test.afterEach.always(async (t) => {
	await t.context.clock.nextTick('30:00')
	restore()
})

const stage = {
	projectMinInterval: 2,
	matchLimit: 3,
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]
const aggregate = () => {
	const interval = sample(Object.values(intervals))
	const limit = sample(range(1, 30))
	return aggregateDurations(uuid(), interval, limit, createDate())
}

test.serial('return aggregation', (t) => {
	t.true(Array.isArray(aggregate()))
})

test.serial('matches duration for default DURATIONS_LIMIT', (t) => {
	t.deepEqual(aggregate()[stage.matchLimit], {
		$match: {
			duration: { $lt: 30 * minute },
		},
	})
})

test.serial('matches duration for customized DURATIONS_LIMIT', async (t) => {
	const value = 2 * hour
	const { clock, get } = t.context
	get.withArgs('DURATIONS_LIMIT').resolves(value)

	// do initial aggregations to cache stubed value in a while
	aggregate()
	await clock.nextAsync()

	t.deepEqual(aggregate()[stage.matchLimit], {
		$match: {
			duration: { $lt: value },
		},
	})
})

test.serial('projects created date and duration for default DURATIONS_INTERVAL', (t) => {
	const interval = 15 * second
	t.deepEqual(aggregate()[stage.projectMinInterval], {
		$project: {
			created: '$created',
			duration: {
				$cond: {
					if: { $lt: [ '$duration', interval ] },
					then: interval / 2,
					else: '$duration',
				},
			},
		},
	})
})

test.serial('projects created date and duration for customized DURATIONS_INTERVAL', async (t) => {
	const interval = 2 * minute
	const { clock, get } = t.context
	get.withArgs('DURATIONS_INTERVAL').resolves(interval)

	// do initial aggregations to cache stubed value in a while
	aggregate()
	await clock.nextAsync()

	t.deepEqual(aggregate()[stage.projectMinInterval], {
		$project: {
			created: '$created',
			duration: {
				$cond: {
					if: { $lt: [ '$duration', interval ] },
					then: interval / 2,
					else: '$duration',
				},
			},
		},
	})
})