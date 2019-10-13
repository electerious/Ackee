import api from '../utils/api'
import abortAndCreateController from '../utils/abortAndCreateController'
import swallowAbortError from '../utils/swallowAbortError'

const abortControllers = {
	fetchPages: {}
}

export const SET_PAGES_SORTING = Symbol()
export const SET_PAGES_VALUE = Symbol()
export const SET_PAGES_FETCHING = Symbol()
export const SET_PAGES_ERROR = Symbol()
export const RESET_PAGES = Symbol()

export const setPagesSorting = (payload) => ({
	type: SET_PAGES_SORTING,
	payload
})

export const setPagesValue = (domainId, payload) => ({
	type: SET_PAGES_VALUE,
	domainId,
	payload
})

export const setPagesFetching = (domainId, payload) => ({
	type: SET_PAGES_FETCHING,
	domainId,
	payload
})

export const setPagesError = (domainId, payload) => ({
	type: SET_PAGES_ERROR,
	domainId,
	payload
})

export const resetPages = () => ({
	type: RESET_PAGES
})

export const fetchPages = (props, domainId) => async (dispatch) => {

	abortControllers.fetchPages[domainId] = abortAndCreateController(abortControllers.fetchPages[domainId])
	const signal = abortControllers.fetchPages[domainId].signal

	dispatch(setPagesFetching(domainId, true))
	dispatch(setPagesError(domainId))

	try {

		const data = await swallowAbortError(api)(`/domains/${ domainId }/pages?sorting=${ props.pages.sorting }`, {
			method: 'get',
			props,
			signal
		})

		dispatch(setPagesValue(domainId, data))
		dispatch(setPagesFetching(domainId, false))

	} catch (err) {

		dispatch(setPagesError(domainId, err))
		dispatch(setPagesFetching(domainId, false))

	}

}