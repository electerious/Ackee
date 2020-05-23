// Constants will be shared between client and server.
// They will be used as values in the DOM and in the URL of the referrer calls.
const INTERVALS_DAILY = 'daily'
const INTERVALS_MONTHLY = 'monthly'
const INTERVALS_YEARLY = 'yearly'

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