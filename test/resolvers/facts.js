'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.after.always(disconnectFromDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

test('fetch facts', async (t) => {
	const body = {
		query: `
			query fetchFacts($id: ID!) {
				domain(id: $id) {
					facts {
						id
						activeVisitors
						averageViews {
							count
							change
						}
						averageDuration {
							count
							change
						}
						viewsToday
						viewsMonth
						viewsYear
					}
				}
			}
		`,
		variables: {
			id: t.context.domain.id,
		},
	}

	const { json } = await api(base, body, t.context.token.id)
	const facts = json.data.domain.facts

	t.is(typeof facts.id, 'string')
	t.is(facts.activeVisitors, 1)
	t.is(facts.averageViews.count, 1)
	t.is(facts.averageViews.change, 17)
	t.is(facts.averageDuration.count, 55714)
	t.is(facts.averageDuration.change, 17)
	t.is(typeof facts.viewsToday, 'number')
	t.is(typeof facts.viewsMonth, 'number')
	t.is(typeof facts.viewsYear, 'number')
})