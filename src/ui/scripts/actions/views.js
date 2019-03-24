import api from '../utils/api'

export const SET_VIEWS_VALUE = Symbol()
export const SET_VIEWS_FETCHING = Symbol()
export const SET_VIEWS_ERROR = Symbol()
export const RESET_VIEWS = Symbol()

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

export const fetchViews = (domainId, props) => async (dispatch) => {

	dispatch(setViewsFetching(domainId, true))
	dispatch(setViewsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/views`, {
			method: 'get',
			props
		})

		dispatch(setViewsValue(domainId, data))

	} catch (err) {

		dispatch(setViewsError(domainId, err))

	} finally {

		dispatch(setViewsFetching(domainId, false))

	}

}