// Constants will be shared between client and server.
// They will be used as values in the DOM and in the URL of the referrer calls.
const RANGES_LAST_24_HOURS = 'daily'
const RANGES_LAST_7_DAYS = 'weekly'
const RANGES_LAST_30_DAYS = 'monthly'
const RANGES_ALL_TIME = 'allTime'

const toArray = () => [
	RANGES_LAST_24_HOURS,
	RANGES_LAST_7_DAYS,
	RANGES_LAST_30_DAYS,
	RANGES_ALL_TIME
]

module.exports = {
	RANGES_LAST_24_HOURS,
	RANGES_LAST_7_DAYS,
	RANGES_LAST_30_DAYS,
	RANGES_ALL_TIME,
	toArray
}