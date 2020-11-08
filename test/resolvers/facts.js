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

test('fetch facts', async (t) => {

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
			id: t.context.domain.id
		}
	}

	const { json } = await api(base, body, t.context.token.id)
	const facts = json.data.domain.facts

	t.is(facts.activeVisitors, 1)
	t.is(facts.averageViews, 1)
	t.is(facts.averageDuration, 60000)
	t.is(typeof facts.viewsToday, 'number')
	t.is(typeof facts.viewsMonth, 'number')
	t.is(typeof facts.viewsYear, 'number')

})