import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_SYSTEMS_TYPE = Symbol()
export const SET_SYSTEMS_VALUE = Symbol()
export const SET_SYSTEMS_FETCHING = Symbol()
export const SET_SYSTEMS_ERROR = Symbol()

export const setSystemsType = (payload) => ({
	type: SET_SYSTEMS_TYPE,
	payload
})

export const setSystemsValue = (domainId, payload) => ({
	type: SET_SYSTEMS_VALUE,
	domainId,
	payload
})

export const setSystemsFetching = (payload) => ({
	type: SET_SYSTEMS_FETCHING,
	payload
})

export const setSystemsError = (payload) => ({
	type: SET_SYSTEMS_ERROR,
	payload
})

export const fetchSystems = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setSystemsFetching(true))
	dispatch(setSystemsError())

	try {

		const data = await api({
			query: `
				query fetchSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
					domains {
						id
						statistics {
							systems(sorting: $sorting, type: $type, range: $range) {
								id
								count
								created
							}
						}
					}
				}
			`,
			variables: {
				sorting: props.filter.sorting,
				type: props.systems.type,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setSystemsValue(domain.id, domain.statistics.systems))
		})
		dispatch(setSystemsFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setSystemsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setSystemsError(err))

	}

})