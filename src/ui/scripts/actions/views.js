import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_VIEWS_TYPE = Symbol()
export const SET_VIEWS_INTERVAL = Symbol()
export const SET_VIEWS_VALUE = Symbol()
export const SET_VIEWS_FETCHING = Symbol()
export const SET_VIEWS_ERROR = Symbol()
export const RESET_VIEWS = Symbol()

export const setViewsType = (payload) => ({
	type: SET_VIEWS_TYPE,
	payload
})

export const setViewsInterval = (payload) => ({
	type: SET_VIEWS_INTERVAL,
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

export const resetViews = () => ({
	type: RESET_VIEWS
})

export const fetchViews = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setViewsFetching(domainId, true))
	dispatch(setViewsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/views?type=${ props.views.type }&interval=${ props.views.interval }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setViewsValue(domainId, data))
		dispatch(setViewsFetching(domainId, false))

	} catch (err) {

		dispatch(setViewsError(domainId, err))
		dispatch(setViewsFetching(domainId, false))

	}

})