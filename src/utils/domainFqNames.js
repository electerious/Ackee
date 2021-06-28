'use strict'

const isValidDomain = require('is-valid-domain')
const debouncePromise = require('debounce-promise')

const domains = require('../database/domains')

// A zero timeout is enough to ensure that this task
// runs only once on every API call. It's a task that would
// otherwise execute multiple times.
module.exports = debouncePromise(async () => {
	const titles = (await domains.all()).map((d) => d.title)
	return titles.filter((n) => isValidDomain(n, { subdomain: true, wildcard: false, allowUnicode: true }))
}, 0)