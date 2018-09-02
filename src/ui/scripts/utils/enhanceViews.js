import createArray from '../utils/createArray'
import dateWithOffset from '../utils/dateWithOffset'

export default (views) => createArray(7).map((_, index) => {

	const date = dateWithOffset(index * -1)

	const view = views.find((view) => {

		const isDay = view.data.id.day === date.getDate()
		const isMonth = view.data.id.month === date.getMonth()
		const isYear = view.data.id.year === date.getYear()

		return isDay === isMonth === isYear === true

	})

	return view == null ? 0 : view.data.count

})