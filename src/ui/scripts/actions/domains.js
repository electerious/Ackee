import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

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

export const fetchDomains = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		const data = await api('/domains', {
			method: 'get',
			props,
			signal: signal()
		})

		dispatch(setDomainsValue(data))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})

export const addDomain = (props, state) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await api(`/domains`, {
			method: 'post',
			body: JSON.stringify(state),
			props
		})

		await dispatch(fetchDomains(props))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

}

export const updateDomain = signalHandler((signal) => (props, domainId, state) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await api(`/domains/${ domainId }`, {
			method: 'put',
			body: JSON.stringify(state),
			props,
			signal: signal(domainId)
		})

		await dispatch(fetchDomains(props))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})

export const deleteDomain = signalHandler((signal) => (props, domainId, state) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await api(`/domains/${ domainId }`, {
			method: 'delete',
			body: JSON.stringify(state),
			props,
			signal: signal(domainId)
		})

		await dispatch(fetchDomains(props))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})