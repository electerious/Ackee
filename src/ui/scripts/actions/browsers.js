import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_BROWSERS_TYPE = Symbol()
export const SET_BROWSERS_SORTING = Symbol()
export const SET_BROWSERS_VALUE = Symbol()
export const SET_BROWSERS_FETCHING = Symbol()
export const SET_BROWSERS_ERROR = Symbol()

export const setBrowsersSorting = (payload) => ({
	type: SET_BROWSERS_SORTING,
	payload
})

export const setBrowsersType = (payload) => ({
	type: SET_BROWSERS_TYPE,
	payload
})

export const setBrowsersValue = (domainId, payload) => ({
	type: SET_BROWSERS_VALUE,
	domainId,
	payload
})

export const setBrowsersFetching = (domainId, payload) => ({
	type: SET_BROWSERS_FETCHING,
	domainId,
	payload
})

export const setBrowsersError = (domainId, payload) => ({
	type: SET_BROWSERS_ERROR,
	domainId,
	payload
})

export const fetchBrowsers = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setBrowsersFetching(domainId, true))
	dispatch(setBrowsersError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/browsers?sorting=${ props.browsers.sorting }&type=${ props.browsers.type }&range=${ props.filter.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setBrowsersValue(domainId, data))
		dispatch(setBrowsersFetching(domainId, false))

	} catch (err) {

		dispatch(setBrowsersError(domainId, err))
		dispatch(setBrowsersFetching(domainId, false))

	}

})