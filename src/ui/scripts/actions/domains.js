import api from '../utils/api'

export const SET_DOMAINS_VALUE = Symbol()
export const SET_DOMAINS_FETCHING = Symbol()
export const SET_DOMAINS_ERROR = Symbol()

export const setDomainsValue = (payload) => ({
	type: SET_DOMAINS_VALUE,
	payload
})

export const setDomainsFetching = (payload) => ({
	type: SET_DOMAINS_FETCHING,
	payload
})

export const setDomainsError = (payload) => ({
	type: SET_DOMAINS_ERROR,
	payload
})

export const fetchDomains = (props) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		const data = await api('/domains', {
			method: 'get',
			props
		})

		dispatch(setDomainsFetching(false))
		dispatch(setDomainsValue(data))

	} catch (err) {

		dispatch(setDomainsFetching(false))
		dispatch(setDomainsError(err.message))

	}

}