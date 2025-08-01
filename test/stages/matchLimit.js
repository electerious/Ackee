'use strict'

const test = require('ava')
const { stub } = require('sinon')

const contrants = require('../../src/utils/constants')
const { hour, minute } = require('../../src/utils/times')

const customiseProxyHandler = {
	get: stub().returns(30 * minute),
}
const customise = stub(contrants, 'customise').returns(new Proxy({}, customiseProxyHandler))

const matchLimit = require('../../src/stages/matchLimit')

test.beforeEach(() => {
	customiseProxyHandler.get.resetHistory()
})

const getDurationLimitMacro = test.macro({
	exec: (t, n) => {
		for (let index = 0; index < n; index++) {
			t.like(matchLimit(), {
				$match: {
					duration: { $lt: hour / 2 },
				},
			})
		}
		t.is(customiseProxyHandler.get.callCount, n)
		t.is(customise.callCount, 1)
	},
	title: (_, n) => `DURATIONS_LIMIT should be get ${ n } times`,
})

for (const n of [ 1, 2, 5 ]) test.serial(getDurationLimitMacro, n)