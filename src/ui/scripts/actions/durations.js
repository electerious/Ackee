import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DURATIONS_VALUE = Symbol()
export const SET_DURATIONS_FETCHING = Symbol()
export const SET_DURATIONS_ERROR = Symbol()

export const setDurationsValue = (domainId, payload) => ({
	type: SET_DURATIONS_VALUE,
	domainId,
	payload
})

export const setDurationsFetching = (payload) => ({
	type: SET_DURATIONS_FETCHING,
	payload
})

export const setDurationsError = (payload) => ({
	type: SET_DURATIONS_ERROR,
	payload
})

export const fetchDurations = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setDurationsFetching(true))
	dispatch(setDurationsError())

	try {

		const data = await api({
			query: `
				query fetchDurations($interval: Interval!) {
					domains {
						id
						statistics {
							durations(interval: $interval) {
								id
								count
							}
						}
					}
				}
			`,
			variables: {
				interval: props.filter.interval
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setDurationsValue(domain.id, domain.statistics.durations))
		})
		dispatch(setDurationsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDurationsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDurationsError(err))

	}

})