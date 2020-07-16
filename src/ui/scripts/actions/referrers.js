import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_REFERRERS_VALUE = Symbol()
export const SET_REFERRERS_FETCHING = Symbol()
export const SET_REFERRERS_ERROR = Symbol()

export const setReferrersValue = (domainId, payload) => ({
	type: SET_REFERRERS_VALUE,
	domainId,
	payload
})

export const setReferrersFetching = (domainId, payload) => ({
	type: SET_REFERRERS_FETCHING,
	domainId,
	payload
})

export const setReferrersError = (domainId, payload) => ({
	type: SET_REFERRERS_ERROR,
	domainId,
	payload
})

export const fetchReferrers = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setReferrersFetching(domainId, true))
	dispatch(setReferrersError(domainId))

	try {

		const data = await api({
			query: `
				query fetchReferrers($id: ID!, $sorting: Sorting!, $range: Range) {
					domain(id: $id) {
						statistics {
							referrers(sorting: $sorting, range: $range) {
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
				sorting: props.filter.sorting,
				range: props.filter.range
			},
			props,
			signal: signal(domainId)
		})

		dispatch(setReferrersValue(domainId, data.domain.statistics.referrers))
		dispatch(setReferrersFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setReferrersFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setReferrersError(domainId, err))

	}

})