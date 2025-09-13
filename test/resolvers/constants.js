'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../src/server')
const { minute, second, hour } = require('../../src/utils/times')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

const createConstantQuery = (name) => ({
	query: `
		query ${ name }Query {
			constants {
				${ name } {
					created
					id
					value
					unit
				}
			}
		}
	`,
})
const createConstantMutation = (input) => ({
	query: `
		mutation setConstantMutation($input: ConstantsInput!) {
			setConstant(input: $input) {
				success
				payload {
					created
					id
					value
					unit
				}
			}
		}
	`,
	variables: {
		input,
	},
})

const checkDate = (t, object, field, length) => {
	t.true(field in object)
	t.is(Object.getOwnPropertyNames(object).length, length)
	t.true(isFinite(new Date(object[field])))
}

test.before(connectToDatabase)
test.after.always(disconnectFromDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const constantModificationScenario = (id, name, valueUnitMap) => {
	const query = createConstantQuery(name)
	const mapIterator = valueUnitMap.entries()
	const _default = mapIterator.next().value
	const _target = mapIterator.next().value

	test.serial(`fetch default ${ id }`, async (t) => {
		const { json } = await api(base, query, t.context.token.id)
		const [ value, unit ] = _default
		t.deepEqual(json.data.constants[name], {
			created: null,
			id,
			value,
			unit,
		})
	})

	const [ value, unit ] = _target

	test.serial(`set ${ id }`, async (t) => {
		const body = createConstantMutation({
			id,
			value,
			unit,
		})

		const { json } = await api(base, body, t.context.token.id)
		const { success, payload } = json.data.setConstant

		t.true(success)
		checkDate(t, payload, 'created', 4)
		t.like(payload, {
			id,
			value,
			unit,
		})
	})

	test.serial(`fetch modified ${ id }`, async (t) => {
		const { json } = await api(base, query, t.context.token.id)
		const constantValue = json.data.constants[name]

		checkDate(t, constantValue, 'created', 4)
		t.like(constantValue, {
			id,
			value,
			unit,
		})
	})
}

constantModificationScenario('DURATIONS_INTERVAL', 'durationsInterval', new Map([
	[ 15 * second, 'seconds' ],
	[ 50 * second, 'seconds' ],
]))
constantModificationScenario('DURATIONS_LIMIT', 'durationsLimit', new Map([
	[ 30 * minute, 'minutes' ],
	[ 2 * hour, 'hours' ],
]))