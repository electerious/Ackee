import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_LANGUAGES_TOP_DATE_RANGE = Symbol()
export const SET_LANGUAGES_SORTING = Symbol()
export const SET_LANGUAGES_VALUE = Symbol()
export const SET_LANGUAGES_FETCHING = Symbol()
export const SET_LANGUAGES_ERROR = Symbol()
export const RESET_LANGUAGES = Symbol()

export const setLanguagesTopDateRange = (payload) => ({
	type: SET_LANGUAGES_TOP_DATE_RANGE,
	payload
})

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

export const fetchLanguages = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setLanguagesFetching(domainId, true))
	dispatch(setLanguagesError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/languages?sorting=${ props.languages.sorting }&dateRange=${ props.languages.dateRange }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setLanguagesValue(domainId, data))
		dispatch(setLanguagesFetching(domainId, false))

	} catch (err) {

		dispatch(setLanguagesError(domainId, err))
		dispatch(setLanguagesFetching(domainId, false))

	}

})