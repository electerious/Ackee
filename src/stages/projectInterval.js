'use strict'

const constants = require('../constants/durations')

module.exports = () => {

	// Ackee tracks durations in an interval, but some durations are between
	// possible interval times. This could be caused by a network delay or the
	// browser who's throttling JS execution. This step rounds all durations
	// down to the nearest possible interval to get rid of inaccuracy.
	return {
		$project: {
			created: '$created',
			duration: {
				$multiply: [
					{
						$floor: [
							{
								$divide: [ '$duration', constants.DURATIONS_INTERVAL ]
							}
						]
					},
					constants.DURATIONS_INTERVAL
				]
			}
		}
	}

}