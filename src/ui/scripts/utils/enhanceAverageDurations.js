import createArray from '../utils/createArray'
import dateWithOffset from '../../../utils/dateWithOffset'
import matchesDate from './matchesDate'

export default (durations, length) => createArray(length).map((_, index) => {

	const date = dateWithOffset(index * -1)

	// Find a duration that matches the date
	const duration = durations.find((duration) => {
		return matchesDate(duration.data.id.day, duration.data.id.month, duration.data.id.year, date)
	})

	return duration == null ? 0 : duration.data.average

})