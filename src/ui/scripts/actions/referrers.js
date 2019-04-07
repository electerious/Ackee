import api from '../utils/api'

export const SET_REFERRERS_SORTING = Symbol()
export const SET_REFERRERS_VALUE = Symbol()
export const SET_REFERRERS_FETCHING = Symbol()
export const SET_REFERRERS_ERROR = Symbol()
export const RESET_REFERRERS = Symbol()

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

export const resetReferrers = () => ({
	type: RESET_REFERRERS
})

export const fetchReferrers = (domainId, props) => async (dispatch) => {

	dispatch(setReferrersFetching(domainId, true))
	dispatch(setReferrersError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/referrers?sorting=${ props.referrers.sorting }`, {
			method: 'get',
			props
		})

		dispatch(setReferrersValue(domainId, data))

	} catch (err) {

		dispatch(setReferrersError(domainId, err))

	} finally {

		dispatch(setReferrersFetching(domainId, false))

	}

}