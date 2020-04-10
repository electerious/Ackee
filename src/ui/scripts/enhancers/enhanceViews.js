import { subDays, subMonths, subYears } from 'date-fns'

import {
	VIEWS_INTERVAL_DAILY,
	VIEWS_INTERVAL_MONTHLY,
	VIEWS_INTERVAL_YEARLY
} from '../../../constants/views'

import createArray from '../utils/createArray'
import matchesDate from '../utils/matchesDate'

const subFn = (interval) => {

	switch (interval) {
		case VIEWS_INTERVAL_DAILY: return subDays
		case VIEWS_INTERVAL_MONTHLY: return subMonths
		case VIEWS_INTERVAL_YEARLY: return subYears
	}

}

export default (views, length, interval) => createArray(length).map((_, index) => {

	const matchDay = [ VIEWS_INTERVAL_DAILY ].includes(interval)
	const matchMonth = [ VIEWS_INTERVAL_DAILY, VIEWS_INTERVAL_MONTHLY ].includes(interval)
	const matchYear = [ VIEWS_INTERVAL_DAILY, VIEWS_INTERVAL_MONTHLY, VIEWS_INTERVAL_YEARLY ].includes(interval)

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