const defaults = {
	views_active: 0,
	views_average: 0,
	durations_average: 0,
	views_today: 0,
	views_month: 0,
	views_year: 0
}

export default (items) => {

	const overwrites = items.reduce((acc, item) => {
		const id = item.data.id

		const hasCount = item.data.count != null
		const hasAverage = item.data.average != null

		if (hasCount === true) acc[id] = item.data.count
		if (hasAverage === true) acc[id] = item.data.average

		return acc
	}, {})

	return {
		...defaults,
		...overwrites
	}

}