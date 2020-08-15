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

		const data = await api({
			query: `
				query fetchDomains {
					domains {
						id
						title
					}
				}
			`,
			props,
			signal: signal()
		})

		dispatch(setDomainsValue(data.domains))
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

		await api({
			query: `
				mutation createDomain($input: CreateDomainInput!) {
					createDomain(input: $input) {
						success
					}
			  	}
			`,
			variables: {
				input: {
					title: state.title
				}
			},
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

		await api({
			query: `
				mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
					updateDomain(id: $id, input: $input) {
						success
					}
				}
			`,
			variables: {
				id: domainId,
				input: {
					title: state.title
				}
			},
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

export const deleteDomain = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await api({
			query: `
				mutation deleteDomain($id: ID!) {
					deleteDomain(id: $id) {
						success
					}
				}
			`,
			variables: {
				id: domainId
			},
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