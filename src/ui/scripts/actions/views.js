import api from '../utils/api'
import abortAndCreateController from '../utils/abortAndCreateController'
import swallowAbortError from '../utils/swallowAbortError'

const abortControllers = {
	fetchViews: {}
}

export const SET_VIEWS_TYPE = Symbol()
export const SET_VIEWS_VALUE = Symbol()
export const SET_VIEWS_FETCHING = Symbol()
export const SET_VIEWS_ERROR = Symbol()
export const RESET_VIEWS = Symbol()

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

export const resetViews = () => ({
	type: RESET_VIEWS
})

export const fetchViews = (props, domainId) => async (dispatch) => {

	abortControllers.fetchViews[domainId] = abortAndCreateController(abortControllers.fetchViews[domainId])
	const signal = abortControllers.fetchViews[domainId].signal

	dispatch(setViewsFetching(domainId, true))
	dispatch(setViewsError(domainId))

	try {

		const data = await swallowAbortError(api)(`/domains/${ domainId }/views?type=${ props.views.type }`, {
			method: 'get',
			props,
			signal
		})

		dispatch(setViewsValue(domainId, data))
		dispatch(setViewsFetching(domainId, false))

	} catch (err) {

		dispatch(setViewsError(domainId, err))
		dispatch(setViewsFetching(domainId, false))

	}

}