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

	const facts = `
		facts {
			activeVisitors
			averageViews
			averageDuration
			viewsToday
			viewsMonth
			viewsYear
		}
	`

	const body = {
		query: `
			query fetchFacts($id: ID!) {
				domain(id: $id) {
					${ facts }
				}
			}
		`,
		variables: {
			id: t.context.factsDomain.id
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
	const domainFacts = json.data.domain.facts
	t.is(domainFacts.activeVisitors, 1)
	t.is(domainFacts.averageViews, 1)
	t.is(domainFacts.averageDuration, 60000)
	t.is(domainFacts.viewsToday, 1)
	t.is(domainFacts.viewsMonth, 14)
	t.is(domainFacts.viewsYear, 14)

})