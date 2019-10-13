import api from '../utils/api'
import abortAndCreateController from '../utils/abortAndCreateController'
import swallowAbortError from '../utils/swallowAbortError'

const abortControllers = {
	fetchDomains: undefined,
	updateDomain: {},
	deleteDomain: {}
}

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

	abortControllers.fetchDomains = abortAndCreateController(abortControllers.fetchDomains)
	const signal = abortControllers.fetchDomains.signal

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		const data = await swallowAbortError(api)('/domains', {
			method: 'get',
			props,
			signal
		})

		dispatch(setDomainsValue(data))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		dispatch(setDomainsError(err))
		dispatch(setDomainsFetching(false))

	}

}

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

		dispatch(setDomainsError(err))
		dispatch(setDomainsFetching(false))

	}

}

export const updateDomain = (props, domainId, state) => async (dispatch) => {

	abortControllers.updateDomain[domainId] = abortAndCreateController(abortControllers.updateDomain[domainId])
	const signal = abortControllers.updateDomain[domainId].signal

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await swallowAbortError(api)(`/domains/${ domainId }`, {
			method: 'put',
			body: JSON.stringify(state),
			props,
			signal
		})

		await dispatch(fetchDomains(props))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		dispatch(setDomainsError(err))
		dispatch(setDomainsFetching(false))

	}

}

export const deleteDomain = (props, domainId, state) => async (dispatch) => {

	abortControllers.deleteDomain[domainId] = abortAndCreateController(abortControllers.deleteDomain[domainId])
	const signal = abortControllers.deleteDomain[domainId].signal

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		await swallowAbortError(api)(`/domains/${ domainId }`, {
			method: 'delete',
			body: JSON.stringify(state),
			props,
			signal
		})

		await dispatch(fetchDomains(props))
		dispatch(setDomainsFetching(false))

	} catch (err) {

		dispatch(setDomainsError(err))
		dispatch(setDomainsFetching(false))

	}

}