import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DOMAINS_START = Symbol()
export const SET_DOMAINS_END = Symbol()
export const SET_DOMAINS_FETCHING = Symbol()
export const SET_DOMAINS_ERROR = Symbol()

export const setDomainsStart = () => ({
	type: SET_DOMAINS_START
})

export const setDomainsEnd = (value) => ({
	type: SET_DOMAINS_END,
	value
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

	dispatch(setDomainsStart())

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

		dispatch(setDomainsEnd(data.domains))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})

export const addDomain = (props, state) => async (dispatch) => {

	dispatch(setDomainsStart())

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

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

}

export const updateDomain = signalHandler((signal) => (props, domainId, state) => async (dispatch) => {

	dispatch(setDomainsStart())

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

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})

export const deleteDomain = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setDomainsStart())

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

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDomainsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDomainsError(err))

	}

})