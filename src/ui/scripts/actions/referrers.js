import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_REFERRERS_SORTING = Symbol()
export const SET_REFERRERS_VALUE = Symbol()
export const SET_REFERRERS_FETCHING = Symbol()
export const SET_REFERRERS_ERROR = Symbol()

export const setReferrersSorting = (payload) => ({
	type: SET_REFERRERS_SORTING,
	payload
})

export const setReferrersValue = (domainId, payload) => ({
	type: SET_REFERRERS_VALUE,
	domainId,
	payload
})

export const setReferrersFetching = (domainId, payload) => ({
	type: SET_REFERRERS_FETCHING,
	domainId,
	payload
})

export const setReferrersError = (domainId, payload) => ({
	type: SET_REFERRERS_ERROR,
	domainId,
	payload
})

export const fetchReferrers = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setReferrersFetching(domainId, true))
	dispatch(setReferrersError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/referrers?sorting=${ props.referrers.sorting }&range=${ props.filter.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setReferrersValue(domainId, data))
		dispatch(setReferrersFetching(domainId, false))

	} catch (err) {

		dispatch(setReferrersError(domainId, err))
		dispatch(setReferrersFetching(domainId, false))

	}

})