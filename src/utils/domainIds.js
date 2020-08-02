const debouncePromise = require('debounce-promise')

const domains = require('../database/domains')

// A zero timeout is enough to ensure that this task
// runs only once on every API call. It's a task that would
// otherwise execute multiple times.
const loadDomains = debouncePromise(domains.all, 0)

module.exports = async (domain) => {

	if (domain.id == null) {
		const allDomains = await loadDomains()
		return allDomains.map((domain) => domain.id)
	}

	return [ domain.id ]

}