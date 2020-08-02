'use strict'

const schedule = require('node-schedule')
const fetch = require('node-fetch')
const { Headers } = require('node-fetch')

const signale = require('./signale')
const sleep = require('./sleep')
const randomItem = require('./randomItem')
const randomInt = require('./randomInt')
const { hour } = require('./times')

const userAgents = Array(200).fill().map((_, index) => index)

const weekdayDuds = [
	[ null, null, null, null, null, null, null, null ], // Sunday
	[ null, null ], // Monday
	[ null ], // Tuesday
	[ null, null ], // Wednesday
	[ null ], // Thursday
	[ null, null, null, null ], // Friday
	[ null, null, null, null, null, null ] // Saturday
]

const siteLocations = [
	'https://example.com',
	'https://example.com/projects.html',
	'https://example.com/about.html',
	'https://example.com/faq.html',
	'https://example.com/projects/ackee.html',
	'https://example.com/projects/lychee.html',
	'https://example.com/projects/malvid.html',
	'https://example.com/projects/laudablesites.html'
]

const referrers = [
	null,
	'https://electerious.com',
	'https://laudableapps.com',
	'https://laudablesites.com',
	'https://dribbble.com/electerious',
	'https://medium.com/@electerious',
	'https://codepen.io/electerious',
	'https://github.com/electerious',
	'https://facebook.com/AppsLaudable',
	'https://twitter.com/electerious',
	'https://producthunt.com',
	'https://google.com',
	'https://bing.com'
]

const langauges = [
	null,
	'en',
	'de',
	'fr',
	'ar',
	'es',
	'ja'
]

const resolutions = [
	{
		width: 1366,
		height: 768
	},
	{
		width: 1920,
		height: 1080
	},
	{
		width: 1280,
		height: 800
	},
	{
		width: 320,
		height: 568
	},
	{
		width: 1440,
		height: 900
	},
	{
		width: 1280,
		height: 1024
	}
]

const screenColorDepths = [
	null,
	16,
	24,
	32,
	48
]

const devices = [
	{
		name: 'iPad',
		manufacturer: 'Apple'
	},
	{
		name: 'iPod',
		manufacturer: 'Apple'
	},
	{
		name: 'iPhone',
		manufacturer: 'Apple'
	},
	{
		name: 'Nexus',
		manufacturer: 'Google'
	},
	{
		name: 'Xbox One',
		manufacturer: 'Microsoft'
	}
]

const operatingSystems = [
	{
		name: 'OS X',
		versions: [
			'10.14.6',
			'10.13.1',
			'10.12.4'
		]
	},
	{
		name: 'Windows',
		versions: [
			'8.1',
			'8',
			'7'
		]
	},
	{
		name: 'Android',
		versions: [
			'9.0',
			'8.1',
			'7.1.2'
		]
	}
]

const browsers = [
	{
		name: 'IE',
		versions: [
			'11.0',
			'10.0'
		]
	},
	{
		name: 'Safari',
		versions: [
			'5.1',
			'5.0'
		]
	},
	{
		name: 'Opera',
		versions: [
			'11.52',
			'11.50'
		]
	}
]

const createRecord = () => {

	const resolution = randomItem(resolutions)
	const device = randomItem(devices)
	const operatingSystem = randomItem(operatingSystems)
	const browser = randomItem(browsers)

	const anonymousRecord = {
		siteLocation: randomItem(siteLocations)
	}

	const detailedRecord = {
		siteLocation: randomItem(siteLocations),
		siteReferrer: randomItem(referrers),
		siteLanguage: randomItem(langauges),
		screenWidth: resolution.width,
		screenHeight: resolution.height,
		screenColorDepth: randomItem(screenColorDepths),
		deviceName: device.name,
		deviceManufacturer: device.manufacturer,
		osName: operatingSystem.name,
		osVersion: randomItem(operatingSystem.versions),
		browserName: browser.name,
		browserVersion: randomItem(browser.versions),
		browserWidth: resolution.width,
		browserHeight: resolution.height
	}

	return randomItem([
		anonymousRecord,
		detailedRecord
	])

}

const addToken = async (endpoint) => {

	const response = await fetch(endpoint, {
		method: 'post',
		body: JSON.stringify({
			query: `
				mutation createToken($input: CreateTokenInput!) {
					createToken(input: $input) {
						payload {
							id
						}
					}
				}
			`,
			variables: {
				input: {
					username: process.env.ACKEE_USERNAME,
					password: process.env.ACKEE_PASSWORD
				}
			}
		})
	})

	const data = await response.json()

	return data.data.createToken.payload

}

const fetchDomains = async (endpoint, headers) => {

	const response = await fetch(endpoint, {
		method: 'post',
		headers,
		body: JSON.stringify({
			query: `
				query fetchDomains {
					domains {
						id
					}
				}
			`
		})
	})

	const data = await response.json()

	return data.data.domains

}

const addRecord = async (endpoint, headers, domain, record) => {

	const response = await fetch(endpoint, {
		method: 'post',
		headers,
		body: JSON.stringify({
			query: `
				mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
					createRecord(domainId: $domainId, input: $input) {
						payload {
							id
						}
					}
				}
			`,
			variables: {
				domainId: domain.id,
				input: record
			}
		})
	})

	const data = await response.json()

	return data.data.createRecord.payload

}

const updateRecord = async (endpoint, headers, record) => {

	const response = await fetch(endpoint, {
		method: 'post',
		headers,
		body: JSON.stringify({
			query: `
				mutation updateRecord($id: ID!) {
					updateRecord(id: $id) {
						success
					}
				}
			`,
			variables: {
				id: record.id
			}
		})
	})

	const data = await response.json()

	return data.data.updateRecord.success

}

const job = (url) => async () => {

	try {

		const endpoint = `${ url }/api`

		const currentDate = new Date()
		const currentWeekday = currentDate.getDay()
		const updateDelay = randomInt(0, hour * 1.5)

		const token = await addToken(endpoint)

		const headers = new Headers({
			'Authorization': `Bearer ${ token.id }`,
			'User-Agent': randomItem(userAgents)
		})

		const domains = await fetchDomains(endpoint, headers)
		const domain = randomItem([ ...domains, ...weekdayDuds[currentWeekday] ])

		if (domain == null) return

		const record = createRecord()
		const response = await addRecord(endpoint, headers, domain, record)

		await sleep(updateDelay)
		await updateRecord(endpoint, headers, response)

	} catch (err) {

		signale.fatal(err)

	}

}

module.exports = (url) => {

	const rule = new schedule.RecurrenceRule()
	rule.second = 0

	return schedule.scheduleJob(rule, job(url))

}