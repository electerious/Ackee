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

	const body = {
		query: `
			query fetchFacts($id: ID!) {
				domain(id: $id) {
					facts {
						activeVisitors
						averageViews
						averageDuration
						viewsToday
						viewsMonth
						viewsYear
					}
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
			'Content-Type': 'application/json'
		}
	})

	const json = await res.json()
	const facts = json.data.domain.facts

	t.is(facts.activeVisitors, 1)
	t.is(facts.averageViews, 1)
	t.is(facts.averageDuration, 60000)
	t.is(typeof facts.viewsToday, 'number')
	t.is(typeof facts.viewsMonth, 'number')
	t.is(typeof facts.viewsYear, 'number')

})