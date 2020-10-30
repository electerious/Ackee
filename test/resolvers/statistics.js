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

const getStats = async (t, sorting) => {
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
			sorting: sorting,
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
	return json.data.domain.statistics
}

test.serial('fetch TOP statistics', async (t) => {
	const domainStatistics = await getStats(t, 'TOP')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 1)
	t.is(domainStatistics.pages[0].id, 'https://facts.example.com/')
	t.is(domainStatistics.referrers.length, 1)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 1)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 1)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '414px x 719px')
	t.is(domainStatistics.languages.length, 1)
	t.is(domainStatistics.languages[0].id, 'English')

})

test.serial('fetch RECENT statistics', async (t) => {
	const domainStatistics = await getStats(t, 'RECENT')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 14)
	t.is(domainStatistics.pages[0].id, 'https://facts.example.com/')
	t.is(domainStatistics.referrers.length, 14)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 14)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.devices.length, 14)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 14)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.sizes.length, 14)
	t.is(domainStatistics.sizes[0].id, '414px x 719px')
	t.is(domainStatistics.languages.length, 14)
	t.is(domainStatistics.languages[0].id, 'English')

})

test.serial('fetch NEW statistics', async (t) => {
	const domainStatistics = await getStats(t, 'NEW')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 1)
	t.is(domainStatistics.pages[0].id, 'https://facts.example.com/')
	t.is(domainStatistics.referrers.length, 1)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 1)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 1)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '414px x 719px')
	t.is(domainStatistics.languages.length, 1)
	t.is(domainStatistics.languages[0].id, 'English')

})