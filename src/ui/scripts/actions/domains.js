import api from '../utils/api'

export const SET_DOMAINS_VALUE = Symbol()
export const SET_DOMAINS_FETCHING = Symbol()
export const SET_DOMAINS_ERROR = Symbol()
export const RESET_DOMAINS = Symbol()

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

export const resetDomains = () => ({
	type: RESET_DOMAINS
})

export const fetchDomains = (props) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		const data = await api('/domains', {
			method: 'get',
			props
		})

		dispatch(setDomainsValue(data))

	} catch (err) {

		dispatch(setDomainsError(err))

	} finally {

		dispatch(setDomainsFetching(false))

	}

}

export const updateDomain = (props, domainId, state) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await api(`/domains/${ domainId }`, {
			method: 'put',
			body: JSON.stringify(state),
			props
		})

		dispatch(fetchDomains(props))

	} catch (err) {

		dispatch(setDomainsError(err))

	} finally {

		dispatch(setDomainsFetching(false))

	}

}