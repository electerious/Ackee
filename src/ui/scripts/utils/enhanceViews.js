import createArray from '../utils/createArray'
import dateWithOffset from '../../../utils/dateWithOffset'

export default (chartViews, length) => createArray(length).map((_, index) => {

	const date = dateWithOffset(index * -1)

	// Find a view that matches the date
	const view = chartViews.find((chartView) => {

		const isDay = chartView.data.id.day === date.getDate()
		const isMonth = chartView.data.id.month === date.getMonth() + 1
		const isYear = chartView.data.id.year === date.getFullYear()

		return isDay === true && isMonth === true && isYear === true

	})

	return view == null ? 0 : view.data.count

})