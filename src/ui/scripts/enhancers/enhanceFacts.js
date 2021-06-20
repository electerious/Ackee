const defaults = {
	activeVisitors: 0,
	averageViews: 0,
	averageViewsChange: null,
	averageDuration: 0,
	averageDurationChange: null,
	viewsToday: 0,
	viewsMonth: 0,
	viewsYear: 0,
}

export default (facts = {}) => {
	return {
		...defaults,
		...facts,
	}
}