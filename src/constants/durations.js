const { hour } = require('../utils/times')

// Constants will be shared between client and server.
// They will be used as values in the DOM and in the URL of the views calls.
const DURATIONS_TRACKING_INTERVAL = 5000
const DURATIONS_GROUP_INTERVAL = 10000
const DURATIONS_LIMIT = hour / 2
// const DURATIONS_TYPE_AVERAGE = 'average'
const DURATIONS_TYPE_DETAILED = 'detailed'

module.exports = {
	DURATIONS_TRACKING_INTERVAL,
	DURATIONS_GROUP_INTERVAL,
	DURATIONS_LIMIT,
	// DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
}