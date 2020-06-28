import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_LANGUAGES_SORTING = Symbol()
export const SET_LANGUAGES_VALUE = Symbol()
export const SET_LANGUAGES_FETCHING = Symbol()
export const SET_LANGUAGES_ERROR = Symbol()

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

export const fetchLanguages = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setLanguagesFetching(domainId, true))
	dispatch(setLanguagesError(domainId))

	try {

		const data = await api({
			query: `
				query fetchLanguages($id: ID!, $sorting: Sorting!, range: Range) {
					domain(id: $id) {
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
				id: domainId,
				sorting: props.languages.sorting,
				range: props.filter.range
			},
			props,
			signal: signal(domainId)
		})

		console.log(data)

		dispatch(setLanguagesValue(domainId, data.domain.statistics.languages))
		dispatch(setLanguagesFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setLanguagesFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setLanguagesError(domainId, err))

	}

})