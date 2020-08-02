import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_VIEWS_TYPE = Symbol()
export const SET_VIEWS_VALUE = Symbol()
export const SET_VIEWS_FETCHING = Symbol()
export const SET_VIEWS_ERROR = Symbol()

export const setViewsType = (payload) => ({
	type: SET_VIEWS_TYPE,
	payload
})

export const setViewsValue = (domainId, payload) => ({
	type: SET_VIEWS_VALUE,
	domainId,
	payload
})

export const setViewsFetching = (payload) => ({
	type: SET_VIEWS_FETCHING,
	payload
})

export const setViewsError = (payload) => ({
	type: SET_VIEWS_ERROR,
	payload
})

export const fetchViews = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setViewsFetching(true))
	dispatch(setViewsError())

	try {

		const data = await api({
			query: `
				query fetchViews($interval: Interval!, $type: ViewType!) {
					domains {
						id
						statistics {
							views(interval: $interval, type: $type) {
								id
								count
							}
						}
					}
				}
			`,
			variables: {
				interval: props.filter.interval,
				type: props.views.type
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setViewsValue(domain.id, domain.statistics.views))
		})
		dispatch(setViewsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setViewsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setViewsError(err))

	}

})