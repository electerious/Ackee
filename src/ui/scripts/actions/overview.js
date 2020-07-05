import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const ALL_DOMAINS = Symbol()

export const SET_OVERVIEW_FACTS = Symbol()
export const SET_OVERVIEW_STATISTICS = Symbol()
export const SET_OVERVIEW_FETCHING = Symbol()
export const SET_OVERVIEW_ERROR = Symbol()

export const setOverviewFacts = (domainId, payload) => ({
	type: SET_OVERVIEW_FACTS,
	domainId,
	payload
})

export const setOverviewStatistics = (domainId, payload) => ({
	type: SET_OVERVIEW_STATISTICS,
	domainId,
	payload
})

export const setOverviewFetching = (domainId, payload) => ({
	type: SET_OVERVIEW_FETCHING,
	domainId,
	payload
})

export const setOverviewError = (domainId, payload) => ({
	type: SET_OVERVIEW_ERROR,
	domainId,
	payload
})

export const fetchOverview = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setOverviewFetching(domainId, true))
	dispatch(setOverviewError(domainId))

	try {

		if (domainId === ALL_DOMAINS) {

			dispatch(setOverviewFacts(domainId, undefined))
			dispatch(setOverviewStatistics(domainId, undefined))
			dispatch(setOverviewFetching(domainId, false))

		} else {

			const data = await api({
				query: `
					query fetchOverview($id: ID!, $interval: Interval!, $sorting: Sorting!, $range: Range, ) {
						domain(id: $id) {
							facts {
								activeVisitors
								averageViews
								averageDuration
								viewsToday
								viewsMonth
								viewsYear
							}
							statistics {
								views(interval: $interval, type: UNIQUE) {
									id
									count
								}
								pages(sorting: $sorting, range: $range) {
									id
									count
									created
								}
								referrers(sorting: $sorting, range: $range) {
									id
									count
									created
								}
								durations(interval: $interval) {
									id
									count
								}
								systems(sorting: $sorting, type: WITH_VERSION, range: $range) {
									id
									count
									created
								}
								devices(sorting: $sorting, type: WITH_MODEL, range: $range) {
									id
									count
									created
								}
								browsers(sorting: $sorting, type: WITH_VERSION, range: $range) {
									id
									count
									created
								}
								sizes(sorting: $sorting, type: BROWSER_RESOLUTION, range: $range) {
									id
									count
									created
								}
								languages(sorting: $sorting, range: $range) {
									id
									count
									created
								}
							}
						}
					}
				`,
				variables: {
					id: domainId,
					interval: props.filter.interval,
					sorting: props.filter.sorting,
					range: props.filter.range
				},
				props,
				signal: signal(domainId)
			})

			dispatch(setOverviewFacts(domainId, data.domain.facts))
			dispatch(setOverviewStatistics(domainId, data.domain.statistics))
			dispatch(setOverviewFetching(domainId, false))

		}

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setOverviewFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setOverviewError(domainId, err))

	}

})