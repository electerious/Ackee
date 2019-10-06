const { hour } = require('../utils/times')

// Constants will be shared between client and server.
// They will be used as values in the DOM and in the URL of the views calls.
const DURATIONS_INTERVAL = 15000
const DURATIONS_LIMIT = hour
// const DURATIONS_TYPE_AVERAGE = 'average'
const DURATIONS_TYPE_DETAILED = 'detailed'

module.exports = {
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT,
	// DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
}