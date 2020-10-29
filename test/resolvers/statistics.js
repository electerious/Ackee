'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('fetch facts', async (t) => {

	const url = new URL('/api', await base)

	const statistics = `
		statistics {
			views(interval: $interval, type: UNIQUE) {
				id
				count
			}
			pages(sorting: $sorting, range: $range) {
				id
				count
				created
			}
			referrers(sorting: $sorting, range: $range) {
				id
				count
				created
			}
			durations(interval: $interval) {
				id
				count
			}
			systems(sorting: $sorting, type: WITH_VERSION, range: $range) {
				id
				count
				created
			}
			devices(sorting: $sorting, type: WITH_MODEL, range: $range) {
				id
				count
				created
			}
			browsers(sorting: $sorting, type: WITH_VERSION, range: $range) {
				id
				count
				created
			}
			sizes(sorting: $sorting, type: BROWSER_RESOLUTION, range: $range) {
				id
				count
				created
			}
			languages(sorting: $sorting, range: $range) {
				id
				count
				created
			}
		}
	`

	const body = {
		query: `
			query fetchStatistics($id: ID!, $interval: Interval!, $sorting: Sorting!, $range: Range) {
				domain(id: $id) {
					${ statistics }
				}
			}
		`,
		variables: {
			id: t.context.factsDomain.id,
			interval: 'DAILY',
			sorting: 'TOP',
			range: 'LAST_24_HOURS'
		}
	}

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'authorization': `Bearer ${ t.context.token.id }`,
			'Content-Type': 'application/json',
			'time-zone': 'UTC'
		}
	})

	const json = await res.json()
	const domainStatistics = json.data.domain.statistics
	t.true(domainStatistics.views.length >= 0)
	t.true(domainStatistics.pages.length >= 0)
	t.true(domainStatistics.referrers.length >= 0)
	t.true(domainStatistics.durations.length >= 0)
	t.true(domainStatistics.systems.length >= 0)
	t.true(domainStatistics.devices.length >= 0)
	t.true(domainStatistics.browsers.length >= 0)
	t.true(domainStatistics.sizes.length >= 0)
	t.true(domainStatistics.languages.length >= 0)

})