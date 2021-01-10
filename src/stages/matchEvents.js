'use strict'

module.exports = (ids) => {

	const stage = {
		$match: {}
	}

	if (ids != null) {
		stage.$match.eventId = {
			$in: ids
		}
	}

	return stage

}