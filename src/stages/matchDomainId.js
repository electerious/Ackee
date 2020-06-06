'use strict'

module.exports = (id) => {

	const stage = {
		$match: {}
	}

	if (id != null) {
		stage.$match.domainId = id
	}

	return stage

}