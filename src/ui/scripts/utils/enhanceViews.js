import createArray from '../utils/createArray'
import dateWithOffset from '../../../utils/dateWithOffset'

export default (views, length) => createArray(length).map((_, index) => {

	const date = dateWithOffset(index * -1)

	// Find a view that matches the date
	const view = views.find((view) => {

		const isDay = view.data.id.day === date.getDate()
		const isMonth = view.data.id.month === date.getMonth() + 1
		const isYear = view.data.id.year === date.getFullYear()

		return isDay === true && isMonth === true && isYear === true

	})

	return view == null ? 0 : view.data.count

})