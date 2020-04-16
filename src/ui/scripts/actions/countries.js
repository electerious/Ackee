import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_COUNTRIES_SORTING = Symbol()
export const SET_COUNTRIES_VALUE = Symbol()
export const SET_COUNTRIES_FETCHING = Symbol()
export const SET_COUNTRIES_ERROR = Symbol()
export const RESET_COUNTRIES = Symbol()

export const setCountriesSorting = (payload) => ({
	type: SET_COUNTRIES_SORTING,
	payload
})

export const setCountriesValue = (domainId, payload) => ({
	type: SET_COUNTRIES_VALUE,
	domainId,
	payload
})

export const setCountriesFetching = (domainId, payload) => ({
	type: SET_COUNTRIES_FETCHING,
	domainId,
	payload
})

export const setCountriesError = (domainId, payload) => ({
	type: SET_COUNTRIES_ERROR,
	domainId,
	payload
})

export const resetCountries = () => ({
	type: RESET_COUNTRIES
})

export const fetchCountries = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setCountriesFetching(domainId, true))
	dispatch(setCountriesError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/countries?sorting=${ props.countries.sorting }&range=${ props.filter.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setCountriesValue(domainId, data))
		dispatch(setCountriesFetching(domainId, false))

	} catch (err) {

		dispatch(setCountriesError(domainId, err))
		dispatch(setCountriesFetching(domainId, false))

	}

})