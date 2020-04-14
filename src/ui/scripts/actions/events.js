import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_EVENTS_VALUE = Symbol()
export const SET_EVENTS_FETCHING = Symbol()
export const SET_EVENTS_ERROR = Symbol()
export const RESET_EVENTS = Symbol()

export const setEventsValue = (domainId, payload) => ({
	type: SET_EVENTS_VALUE,
	domainId,
	payload
})

export const setEventsFetching = (domainId, payload) => ({
	type: SET_EVENTS_FETCHING,
	domainId,
	payload
})

export const setEventsError = (domainId, payload) => ({
	type: SET_EVENTS_ERROR,
	domainId,
	payload
})

export const resetEvents = () => ({
	type: RESET_EVENTS
})

export const fetchEvents = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setEventsFetching(domainId, true))
	dispatch(setEventsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/events?range=${ props.filter.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setEventsValue(domainId, data))
		dispatch(setEventsFetching(domainId, false))

	} catch (err) {

		dispatch(setEventsError(domainId, err))
		dispatch(setEventsFetching(domainId, false))

	}

})