import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const ALL_DOMAINS = Symbol()

export const SET_OVERVIEW_VALUE = Symbol()
export const SET_OVERVIEW_FETCHING = Symbol()
export const SET_OVERVIEW_ERROR = Symbol()

export const setOverviewValue = (domainId, payload) => ({
	type: SET_OVERVIEW_VALUE,
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

			dispatch(setOverviewValue(domainId, undefined))
			dispatch(setOverviewFetching(domainId, false))

		} else {

			const data = await api({
				query: `
					query fetchOverview($id: ID!, $interval: Interval!, $sorting: Sorting!, $range: Range, ) {
						domain(id: $id) {
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

			dispatch(setOverviewValue(domainId, data.domain.statistics))
			dispatch(setOverviewFetching(domainId, false))

		}

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setOverviewFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setOverviewError(domainId, err))

	}

})