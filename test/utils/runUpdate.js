'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const runUpdate = require('../../src/utils/runUpdate')

test('set `updated` by default', (t) => {

	const schema = {
		findOneAndUpdate: (filter, update, opts) => {

			t.deepEqual(filter, { id })
			t.deepEqual(Object.keys(update.$set), [ 'updated' ])
			t.deepEqual(opts, { new: true })

		}
	}

	const id = uuid()

	runUpdate(schema, id)

})

test('update allowed data', (t) => {

	const schema = {
		findOneAndUpdate: (filter, update) => {

			t.deepEqual(Object.keys(update.$set), [ ...props, 'updated' ])

		}
	}

	const id = uuid()
	const data = { allowed: uuid(), disallowed: uuid() }
	const props = [ 'allowed' ]

	runUpdate(schema, id, data, props)

})

test('ignore unavailable props', (t) => {

	const schema = {
		findOneAndUpdate: (filter, update) => {

			t.deepEqual(Object.keys(update.$set), [ 'updated' ])

		}
	}

	const id = uuid()
	const data = {}
	const props = [ 'unavailable' ]

	runUpdate(schema, id, data, props)

})