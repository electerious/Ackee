'use strict'

module.exports = (ids) => {

	const stage = {
		$match: {}
	}

	if (ids != null) {
		stage.$match.id = {
			$in: ids
		}
	}

	return stage

}