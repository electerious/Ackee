'use strict'

const constants = require('../constants/durations')

module.exports = () => {

	// Some visitors keep sites open in the background. Their duration is often
	// way above the limit. This distorts the average and should be omitted.
	return {
		$match: {
			duration: {
				$lt: constants.DURATIONS_LIMIT
			}
		}
	}

}