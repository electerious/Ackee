const defaults = {
	activeVisitors: 0,
	averageViews: 0,
	averageDuration: 0,
	viewsToday: 0,
	viewsMonth: 0,
	viewsYear: 0
}

export default (facts = {}) => {

	return {
		...defaults,
		...facts
	}

}