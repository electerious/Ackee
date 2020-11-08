'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

const getStats = async (t, sorting, systemType, browserType, deviceType, sizeType) => {

	const body = {
		query: `
			query fetchStatistics($id: ID!, $interval: Interval!, $sorting: Sorting!, $range: Range, $systemType: SystemType!, $browserType: BrowserType!, $deviceType: DeviceType!, $sizeType: SizeType!) {
				domain(id: $id) {
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
						systems(sorting: $sorting, type: $systemType, range: $range) {
							id
							count
							created
						}
						devices(sorting: $sorting, type: $deviceType, range: $range) {
							id
							count
							created
						}
						browsers(sorting: $sorting, type: $browserType, range: $range) {
							id
							count
							created
						}
						sizes(sorting: $sorting, type: $sizeType, range: $range) {
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
				}
			}
		`,
		variables: {
			id: t.context.domain.id,
			interval: 'DAILY',
			sorting: sorting,
			range: 'LAST_24_HOURS',
			systemType: systemType,
			browserType: browserType,
			deviceType: deviceType,
			sizeType: sizeType
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	return json.data.domain.statistics
}

test.serial('fetch TOP statistics', async (t) => {

	const domainStatistics = await getStats(t, 'TOP', 'NO_VERSION', 'NO_VERSION', 'NO_MODEL', 'BROWSER_RESOLUTION')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 1)
	t.is(domainStatistics.pages[0].id, 'https://example.com/')
	t.is(domainStatistics.referrers.length, 1)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 1)
	t.is(domainStatistics.systems[0].id, 'iOS')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple')
	t.is(domainStatistics.browsers.length, 1)
	t.is(domainStatistics.browsers[0].id, 'Safari')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '414px x 719px')
	t.is(domainStatistics.languages.length, 1)
	t.is(domainStatistics.languages[0].id, 'English')

})

test.serial('fetch RECENT statistics', async (t) => {

	const domainStatistics = await getStats(t, 'RECENT', 'WITH_VERSION', 'WITH_VERSION', 'WITH_MODEL', 'BROWSER_WIDTH')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 14)
	t.is(domainStatistics.pages[0].id, 'https://example.com/')
	t.is(domainStatistics.referrers.length, 14)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 14)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.systems[8].id, 'iOS 13.0')
	t.is(domainStatistics.devices.length, 14)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 14)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.browsers[8].id, 'Safari 13.0')
	t.is(domainStatistics.sizes.length, 14)
	t.is(domainStatistics.sizes[0].id, '414px')
	t.is(domainStatistics.languages.length, 14)
	t.is(domainStatistics.languages[0].id, 'English')

})

test.serial('fetch NEW statistics', async (t) => {

	const domainStatistics = await getStats(t, 'NEW', 'WITH_VERSION', 'WITH_VERSION', 'WITH_MODEL', 'BROWSER_HEIGHT')

	t.is(domainStatistics.views.length, 14)
	t.is(domainStatistics.views[0].count, 1)
	t.is(domainStatistics.pages.length, 1)
	t.is(domainStatistics.pages[0].id, 'https://example.com/')
	t.is(domainStatistics.referrers.length, 1)
	t.is(domainStatistics.referrers[0].id, 'https://google.com/')
	t.is(domainStatistics.durations.length, 14)
	t.is(domainStatistics.durations[0].count, 60 * 1000)
	t.is(domainStatistics.systems.length, 2)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.systems[1].id, 'iOS 13.0')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 2)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.browsers[1].id, 'Safari 13.0')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '719px')
	t.is(domainStatistics.languages.length, 1)
	t.is(domainStatistics.languages[0].id, 'English')

})

test.serial('fetch TOP screen statistics', async (t) => {

	const domainStatistics = await getStats(t, 'TOP', 'WITH_VERSION', 'WITH_VERSION', 'NO_MODEL', 'SCREEN_RESOLUTION')

	t.is(domainStatistics.systems.length, 1)
	t.is(domainStatistics.systems[0].id, 'iOS 14.0')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple')
	t.is(domainStatistics.browsers.length, 1)
	t.is(domainStatistics.browsers[0].id, 'Safari 14.0')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '414px x 896px')

})

test.serial('fetch RECENT screen statistics', async (t) => {

	const domainStatistics = await getStats(t, 'RECENT', 'NO_VERSION', 'NO_VERSION', 'WITH_MODEL', 'SCREEN_WIDTH')

	t.is(domainStatistics.systems.length, 14)
	t.is(domainStatistics.systems[0].id, 'iOS')
	t.is(domainStatistics.systems[8].id, 'iOS')
	t.is(domainStatistics.devices.length, 14)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 14)
	t.is(domainStatistics.browsers[0].id, 'Safari')
	t.is(domainStatistics.browsers[8].id, 'Safari')
	t.is(domainStatistics.sizes.length, 14)
	t.is(domainStatistics.sizes[0].id, '414px')

})

test.serial('fetch NEW screen statistics', async (t) => {

	const domainStatistics = await getStats(t, 'NEW', 'NO_VERSION', 'NO_VERSION', 'WITH_MODEL', 'SCREEN_HEIGHT')

	t.is(domainStatistics.systems.length, 1)
	t.is(domainStatistics.systems[0].id, 'iOS')
	t.is(domainStatistics.devices.length, 1)
	t.is(domainStatistics.devices[0].id, 'Apple iPhone')
	t.is(domainStatistics.browsers.length, 1)
	t.is(domainStatistics.browsers[0].id, 'Safari')
	t.is(domainStatistics.sizes.length, 1)
	t.is(domainStatistics.sizes[0].id, '896px')

})