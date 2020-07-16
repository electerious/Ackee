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

export const setViewsFetching = (domainId, payload) => ({
	type: SET_VIEWS_FETCHING,
	domainId,
	payload
})

export const setViewsError = (domainId, payload) => ({
	type: SET_VIEWS_ERROR,
	domainId,
	payload
})

export const fetchViews = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setViewsFetching(domainId, true))
	dispatch(setViewsError(domainId))

	try {

		const data = await api({
			query: `
				query fetchViews($id: ID!, $interval: Interval!, $type: ViewType!) {
					domain(id: $id) {
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
				id: domainId,
				interval: props.filter.interval,
				type: props.views.type
			},
			props,
			signal: signal(domainId)
		})

		dispatch(setViewsValue(domainId, data.domain.statistics.views))
		dispatch(setViewsFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setViewsFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setViewsError(domainId, err))

	}

})