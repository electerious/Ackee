import { subDays, subMonths, subYears } from 'date-fns'

import {
	INTERVALS_DAILY,
	INTERVALS_MONTHLY,
	INTERVALS_YEARLY
} from '../../../constants/intervals'

import createArray from '../utils/createArray'
import matchesDate from '../utils/matchesDate'

const subFn = (interval) => {

	switch (interval) {
		case INTERVALS_DAILY: return subDays
		case INTERVALS_MONTHLY: return subMonths
		case INTERVALS_YEARLY: return subYears
	}

}

export default (views, length, interval) => createArray(length).map((_, index) => {

	const matchDay = [ INTERVALS_DAILY ].includes(interval)
	const matchMonth = [ INTERVALS_DAILY, INTERVALS_MONTHLY ].includes(interval)
	const matchYear = [ INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY ].includes(interval)

	const date = subFn(interval)(new Date(), index)

	// Find a view that matches the date
	const view = views.find((view) => {
		return matchesDate(
			matchDay === true ? view.data.id.day : undefined,
			matchMonth === true ? view.data.id.month : undefined,
			matchYear === true ? view.data.id.year : undefined,
			date
		)
	})

	return view == null ? 0 : view.data.count

})