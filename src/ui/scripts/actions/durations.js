import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DURATIONS_TYPE = Symbol()
export const SET_DURATIONS_VALUE = Symbol()
export const SET_DURATIONS_FETCHING = Symbol()
export const SET_DURATIONS_ERROR = Symbol()

export const setDurationsType = (payload) => ({
	type: SET_DURATIONS_TYPE,
	payload
})

export const setDurationsValue = (domainId, payload) => ({
	type: SET_DURATIONS_VALUE,
	domainId,
	payload
})

export const setDurationsFetching = (domainId, payload) => ({
	type: SET_DURATIONS_FETCHING,
	domainId,
	payload
})

export const setDurationsError = (domainId, payload) => ({
	type: SET_DURATIONS_ERROR,
	domainId,
	payload
})

export const fetchDurations = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setDurationsFetching(domainId, true))
	dispatch(setDurationsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/durations?type=${ props.durations.type }&range=${ props.filter.range }&interval=${ props.filter.interval }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setDurationsValue(domainId, data))
		dispatch(setDurationsFetching(domainId, false))

	} catch (err) {

		dispatch(setDurationsError(domainId, err))
		dispatch(setDurationsFetching(domainId, false))

	}

})