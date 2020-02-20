import { subDays } from 'date-fns'

import createArray from '../utils/createArray'
import matchesDate from '../utils/matchesDate'

export default (durations, length) => createArray(length).map((_, index) => {

	const date = subDays(new Date(), index)

	// Find a duration that matches the date
	const duration = durations.find((duration) => {
		return matchesDate(duration.data.id.day, duration.data.id.month, duration.data.id.year, date)
	})

	return duration == null ? 0 : duration.data.average

})