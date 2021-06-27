const defaults = {
	activeVisitors: 0,
	averageViews: {
		count: 0,
		change: null,
	},
	averageDuration: {
		count: 0,
		change: null,
	},
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