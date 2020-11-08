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

const getStats = async (t, fragment) => {

	const body = {
		query: `
			query fetchStatistics($id: ID!) {
				domain(id: $id) {
					statistics {
						${ fragment }
					}
				}
			}
		`,
		variables: {
			id: t.context.domain.id
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	return json.data.domain.statistics

}

const viewsFragment = (interval, type) => `
	views(interval: ${ interval }, type: ${ type }) {
		id
		count
	}
`

const pagesFragment = (sorting, range) => `
	pages(sorting: ${ sorting }, range: ${ range }) {
		id
		count
		created
	}
`

const referrersFragment = (sorting, range) => `
	referrers(sorting: ${ sorting }, range: ${ range }) {
		id
		count
		created
	}
`

const durationsFragment = (interval) => `
	durations(interval: ${ interval }) {
		id
		count
	}
`

const systemsFragment = (sorting, type, range) => `
	systems(sorting: ${ sorting }, type: ${ type }, range: ${ range }) {
		id
		count
		created
	}
`

const devicesFragment = (sorting, type, range) => `
	devices(sorting: ${ sorting }, type: ${ type }, range: ${ range }) {
		id
		count
		created
	}
`

const browsersFragment = (sorting, type, range) => `
	browsers(sorting: ${ sorting }, type: ${ type }, range: ${ range }) {
		id
		count
		created
	}
`

const sizesFragment = (sorting, type, range) => `
	sizes(sorting: ${ sorting }, type: ${ type }, range: ${ range }) {
		id
		count
		created
	}
`

const languagesFragment = (sorting, range) => `
	languages(sorting: ${ sorting }, range: ${ range }) {
		id
		count
		created
	}
`

test('fetch DAILY and UNIQUE views', async (t) => {

	const statistics = await getStats(t, viewsFragment('DAILY', 'UNIQUE'))

	t.is(statistics.views.length, 14)
	t.is(statistics.views[0].count, 1)

})

test('fetch MONTHLY and UNIQUE views', async (t) => {

	const statistics = await getStats(t, viewsFragment('MONTHLY', 'UNIQUE'))

	t.is(statistics.views.length, 14)
	t.is(typeof statistics.views[0].count, 'number')

})

test('fetch YEARLY and UNIQUE views', async (t) => {

	const statistics = await getStats(t, viewsFragment('YEARLY', 'UNIQUE'))

	t.is(statistics.views.length, 14)
	t.is(typeof statistics.views[0].count, 'number')

})

test('fetch DAILY and TOTAL views', async (t) => {

	const statistics = await getStats(t, viewsFragment('DAILY', 'TOTAL'))

	t.is(statistics.views.length, 14)
	t.is(statistics.views[0].count, 1)

})

test('fetch MONTHLY and TOTAL views', async (t) => {

	const statistics = await getStats(t, viewsFragment('MONTHLY', 'TOTAL'))

	t.is(statistics.views.length, 14)
	t.is(typeof statistics.views[0].count, 'number')

})

test('fetch YEARLY and TOTAL views', async (t) => {

	const statistics = await getStats(t, viewsFragment('YEARLY', 'TOTAL'))

	t.is(statistics.views.length, 14)
	t.is(typeof statistics.views[0].count, 'number')

})

test('fetch TOP and LAST_6_MONTHS pages', async (t) => {

	const statistics = await getStats(t, pagesFragment('TOP', 'LAST_6_MONTHS'))

	t.is(statistics.pages.length, 1)
	t.is(statistics.pages[0].id, 'https://example.com/')

})

test('fetch RECENT and LAST_24_LAST_6_MONTHSHOURS pages', async (t) => {

	const statistics = await getStats(t, pagesFragment('RECENT', 'LAST_6_MONTHS'))

	t.is(statistics.pages.length, 14)
	t.is(statistics.pages[0].id, 'https://example.com/')

})

test('fetch NEW and LAST_6_MONTHS pages', async (t) => {

	const statistics = await getStats(t, pagesFragment('NEW', 'LAST_6_MONTHS'))

	t.is(statistics.pages.length, 1)
	t.is(statistics.pages[0].id, 'https://example.com/')

})

test('fetch TOP and LAST_6_MONTHS referrers', async (t) => {

	const statistics = await getStats(t, referrersFragment('TOP', 'LAST_6_MONTHS'))

	t.is(statistics.referrers.length, 1)
	t.is(statistics.referrers[0].id, 'https://google.com/')

})

test('fetch RECENT and LAST_6_MONTHS referrers', async (t) => {

	const statistics = await getStats(t, referrersFragment('RECENT', 'LAST_6_MONTHS'))

	t.is(statistics.referrers.length, 14)
	t.is(statistics.referrers[0].id, 'https://google.com/')

})

test('fetch NEW and LAST_6_MONTHS referrers', async (t) => {

	const statistics = await getStats(t, referrersFragment('NEW', 'LAST_6_MONTHS'))

	t.is(statistics.referrers.length, 1)
	t.is(statistics.referrers[0].id, 'https://google.com/')

})

test('fetch DAILY durations', async (t) => {

	const statistics = await getStats(t, durationsFragment('DAILY'))

	t.is(statistics.durations.length, 14)
	t.is(statistics.durations[0].count, 60 * 1000)

})

test('fetch MONTHLY durations', async (t) => {

	const statistics = await getStats(t, durationsFragment('MONTHLY'))

	t.is(statistics.durations.length, 14)
	t.is(statistics.durations[0].count, 60 * 1000)

})

test('fetch YEARLY durations', async (t) => {

	const statistics = await getStats(t, durationsFragment('YEARLY'))

	t.is(statistics.durations.length, 14)
	t.is(statistics.durations[0].count, 60 * 1000)

})

test('fetch TOP, NO_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('TOP', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 1)
	t.is(statistics.systems[0].id, 'iOS')

})

test('fetch RECENT, NO_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('RECENT', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 14)
	t.is(statistics.systems[0].id, 'iOS')

})

test('fetch NEW, NO_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('NEW', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 1)
	t.is(statistics.systems[0].id, 'iOS')

})

test('fetch TOP, WITH_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('TOP', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 2)
	t.is(statistics.systems[0].id, 'iOS 14.0')
	t.is(statistics.systems[1].id, 'iOS 13.0')

})

test('fetch RECENT, WITH_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('RECENT', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 14)
	t.is(statistics.systems[0].id, 'iOS 14.0')
	t.is(statistics.systems[8].id, 'iOS 13.0')

})

test('fetch NEW, WITH_VERSION and LAST_6_MONTHS systems', async (t) => {

	const statistics = await getStats(t, systemsFragment('NEW', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.systems.length, 2)
	t.is(statistics.systems[0].id, 'iOS 14.0')
	t.is(statistics.systems[1].id, 'iOS 13.0')

})

test('fetch TOP, NO_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('TOP', 'NO_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 1)
	t.is(statistics.devices[0].id, 'Apple')

})

test('fetch RECENT, NO_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('RECENT', 'NO_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 14)
	t.is(statistics.devices[0].id, 'Apple')

})

test('fetch NEW, NO_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('NEW', 'NO_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 1)
	t.is(statistics.devices[0].id, 'Apple')

})

test('fetch TOP, WITH_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('TOP', 'WITH_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 1)
	t.is(statistics.devices[0].id, 'Apple iPhone')

})

test('fetch RECENT, WITH_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('RECENT', 'WITH_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 14)
	t.is(statistics.devices[0].id, 'Apple iPhone')

})

test('fetch NEW, WITH_MODEL and LAST_6_MONTHS devices', async (t) => {

	const statistics = await getStats(t, devicesFragment('NEW', 'WITH_MODEL', 'LAST_6_MONTHS'))

	t.is(statistics.devices.length, 1)
	t.is(statistics.devices[0].id, 'Apple iPhone')

})

test('fetch TOP, NO_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('TOP', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 1)
	t.is(statistics.browsers[0].id, 'Safari')

})

test('fetch RECENT, NO_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('RECENT', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 14)
	t.is(statistics.browsers[0].id, 'Safari')

})

test('fetch NEW, NO_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('NEW', 'NO_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 1)
	t.is(statistics.browsers[0].id, 'Safari')

})

test('fetch TOP, WITH_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('TOP', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 2)
	t.is(statistics.browsers[0].id, 'Safari 14.0')
	t.is(statistics.browsers[1].id, 'Safari 13.0')

})

test('fetch RECENT, WITH_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('RECENT', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 14)
	t.is(statistics.browsers[0].id, 'Safari 14.0')
	t.is(statistics.browsers[8].id, 'Safari 13.0')

})

test('fetch NEW, WITH_VERSION and LAST_6_MONTHS browsers', async (t) => {

	const statistics = await getStats(t, browsersFragment('NEW', 'WITH_VERSION', 'LAST_6_MONTHS'))

	t.is(statistics.browsers.length, 2)
	t.is(statistics.browsers[0].id, 'Safari 14.0')
	t.is(statistics.browsers[1].id, 'Safari 13.0')

})

test('fetch TOP, BROWSER_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('TOP', 'BROWSER_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 1)
	t.is(statistics.sizes[0].id, '414px x 719px')

})

test('fetch RECENT, BROWSER_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('RECENT', 'BROWSER_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 14)
	t.is(statistics.sizes[0].id, '414px x 719px')

})

test('fetch NEW, BROWSER_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('NEW', 'BROWSER_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 1)
	t.is(statistics.sizes[0].id, '414px x 719px')

})

test('fetch TOP, SCREEN_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('TOP', 'SCREEN_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 1)
	t.is(statistics.sizes[0].id, '414px x 896px')

})

test('fetch RECENT, SCREEN_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('RECENT', 'SCREEN_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 14)
	t.is(statistics.sizes[0].id, '414px x 896px')

})

test('fetch NEW, SCREEN_RESOLUTION and LAST_6_MONTHS sizes', async (t) => {

	const statistics = await getStats(t, sizesFragment('NEW', 'SCREEN_RESOLUTION', 'LAST_6_MONTHS'))

	t.is(statistics.sizes.length, 1)
	t.is(statistics.sizes[0].id, '414px x 896px')

})

test('fetch TOP and LAST_6_MONTHS languages', async (t) => {

	const statistics = await getStats(t, languagesFragment('TOP', 'LAST_6_MONTHS'))

	t.is(statistics.languages.length, 1)
	t.is(statistics.languages[0].id, 'English')

})

test('fetch RECENT and LAST_6_MONTHS languages', async (t) => {

	const statistics = await getStats(t, languagesFragment('RECENT', 'LAST_6_MONTHS'))

	t.is(statistics.languages.length, 14)
	t.is(statistics.languages[0].id, 'English')

})

test('fetch NEW and LAST_6_MONTHS languages', async (t) => {

	const statistics = await getStats(t, languagesFragment('NEW', 'LAST_6_MONTHS'))

	t.is(statistics.languages.length, 1)
	t.is(statistics.languages[0].id, 'English')

})