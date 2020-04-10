const LAST_7_DAYS = { value: 'weekly', label: 'Last 7 days' }
const LAST_30_DAYS = { value: 'monthly', label: 'Last 30 days' }
const ALL_TIME = { value: 'allTime', label: 'All time' }

const toValues = () => [
	LAST_7_DAYS.value,
	LAST_30_DAYS.value,
	ALL_TIME.value
]

const toArray = () => [
	LAST_7_DAYS,
	LAST_30_DAYS,
	ALL_TIME
]

module.exports = {
	LAST_7_DAYS,
	LAST_30_DAYS,
	ALL_TIME,
	toValues,
	toArray
}