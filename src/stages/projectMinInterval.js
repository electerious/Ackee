'use strict'

const { DURATIONS_INTERVAL } = require('../constants/durations')

module.exports = () => {

	// Visits below the tracking interval will have a duration of zero. That's
	// incorrect as visitors spent time on the site, but just not enough. This
	// step sets the minimum duration to the half of the tracking interval.
	// This value is a compromise that doesn't influence the average too much.
	return {
		$project: {
			created: '$created',
			duration: {
				$cond: {
					if: {
						$lt: [ '$duration', DURATIONS_INTERVAL ]
					},
					then: DURATIONS_INTERVAL / 2,
					else: '$duration'
				}
			}
		}
	}

}