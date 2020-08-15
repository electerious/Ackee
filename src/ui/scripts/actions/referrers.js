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

export const setReferrersFetching = (payload) => ({
	type: SET_REFERRERS_FETCHING,
	payload
})

export const setReferrersError = (payload) => ({
	type: SET_REFERRERS_ERROR,
	payload
})

export const fetchReferrers = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setReferrersFetching(true))
	dispatch(setReferrersError())

	try {

		const data = await api({
			query: `
				query fetchReferrers($sorting: Sorting!, $range: Range) {
					domains {
						id
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
				sorting: props.filter.sorting,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setReferrersValue(domain.id, domain.statistics.referrers))
		})
		dispatch(setReferrersFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setReferrersFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setReferrersError(err))

	}

})