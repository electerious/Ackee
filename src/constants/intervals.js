// Constants will be shared between client and server.
// They will be used as values in the DOM and in the URL of the referrer calls.
const INTERVALS_DAILY = 'DAILY'
const INTERVALS_MONTHLY = 'MONTHLY'
const INTERVALS_YEARLY = 'YEARLY'

const toArray = () => [
	INTERVALS_DAILY,
	INTERVALS_MONTHLY,
	INTERVALS_YEARLY
]

module.exports = {
	INTERVALS_DAILY,
	INTERVALS_MONTHLY,
	INTERVALS_YEARLY,
	toArray
}