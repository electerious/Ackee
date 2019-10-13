import api from '../utils/api'
import abortAndCreateController from '../utils/abortAndCreateController'
import swallowAbortError from '../utils/swallowAbortError'

const abortControllers = {
	fetchLanguages: {}
}

export const SET_LANGUAGES_SORTING = Symbol()
export const SET_LANGUAGES_VALUE = Symbol()
export const SET_LANGUAGES_FETCHING = Symbol()
export const SET_LANGUAGES_ERROR = Symbol()
export const RESET_LANGUAGES = Symbol()

export const setLanguagesSorting = (payload) => ({
	type: SET_LANGUAGES_SORTING,
	payload
})

export const setLanguagesValue = (domainId, payload) => ({
	type: SET_LANGUAGES_VALUE,
	domainId,
	payload
})

export const setLanguagesFetching = (domainId, payload) => ({
	type: SET_LANGUAGES_FETCHING,
	domainId,
	payload
})

export const setLanguagesError = (domainId, payload) => ({
	type: SET_LANGUAGES_ERROR,
	domainId,
	payload
})

export const resetLanguages = () => ({
	type: RESET_LANGUAGES
})

export const fetchLanguages = (props, domainId) => async (dispatch) => {

	abortControllers.fetchLanguages[domainId] = abortAndCreateController(abortControllers.fetchLanguages[domainId])
	const signal = abortControllers.fetchLanguages[domainId].signal

	dispatch(setLanguagesFetching(domainId, true))
	dispatch(setLanguagesError(domainId))

	try {

		const data = await swallowAbortError(api)(`/domains/${ domainId }/languages?sorting=${ props.languages.sorting }`, {
			method: 'get',
			props,
			signal
		})

		dispatch(setLanguagesValue(domainId, data))
		dispatch(setLanguagesFetching(domainId, false))

	} catch (err) {

		dispatch(setLanguagesError(domainId, err))
		dispatch(setLanguagesFetching(domainId, false))

	}

}