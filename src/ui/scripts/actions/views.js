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

		const data = await api(`/domains/${ domainId }/views?type=${ props.views.type }&interval=${ props.filter.interval }`, {
			props,
			signal: signal(domainId)
		})

		dispatch(setViewsValue(domainId, data))
		dispatch(setViewsFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setViewsFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setViewsError(domainId, err))

	}

})