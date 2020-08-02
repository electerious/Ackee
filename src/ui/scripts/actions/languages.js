import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_LANGUAGES_VALUE = Symbol()
export const SET_LANGUAGES_FETCHING = Symbol()
export const SET_LANGUAGES_ERROR = Symbol()

export const setLanguagesValue = (domainId, payload) => ({
	type: SET_LANGUAGES_VALUE,
	domainId,
	payload
})

export const setLanguagesFetching = (payload) => ({
	type: SET_LANGUAGES_FETCHING,
	payload
})

export const setLanguagesError = (payload) => ({
	type: SET_LANGUAGES_ERROR,
	payload
})

export const fetchLanguages = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setLanguagesFetching(true))
	dispatch(setLanguagesError())

	try {

		const data = await api({
			query: `
				query fetchLanguages($sorting: Sorting!, $range: Range) {
					domains {
						id
						statistics {
							languages(sorting: $sorting, range: $range) {
								id
								count
								created
							}
						}
					}
				}
			`,
			variables: {
				sorting: props.filter.sorting,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setLanguagesValue(domain.id, domain.statistics.languages))
		})
		dispatch(setLanguagesFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setLanguagesFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setLanguagesError(err))

	}

})