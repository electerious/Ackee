import createArray from '../utils/createArray'
import dateWithOffset from '../../../utils/dateWithOffset'
import matchesDate from '../../../utils/matchesDate'

export default (views, length) => createArray(length).map((_, index) => {

	const date = dateWithOffset(index * -1)

	// Find a view that matches the date
	const view = views.find((view) => {
		return matchesDate(view.data.id.day, view.data.id.month, view.data.id.year, date)
	})

	return view == null ? 0 : view.data.count

})