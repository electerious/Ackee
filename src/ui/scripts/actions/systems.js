import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_SYSTEMS_RANGE = Symbol()
export const SET_SYSTEMS_TYPE = Symbol()
export const SET_SYSTEMS_SORTING = Symbol()
export const SET_SYSTEMS_VALUE = Symbol()
export const SET_SYSTEMS_FETCHING = Symbol()
export const SET_SYSTEMS_ERROR = Symbol()
export const RESET_SYSTEMS = Symbol()

export const setSystemsRange = (payload) => ({
	type: SET_SYSTEMS_RANGE,
	payload
})

export const setSystemsSorting = (payload) => ({
	type: SET_SYSTEMS_SORTING,
	payload
})

export const setSystemsType = (payload) => ({
	type: SET_SYSTEMS_TYPE,
	payload
})

export const setSystemsValue = (domainId, payload) => ({
	type: SET_SYSTEMS_VALUE,
	domainId,
	payload
})

export const setSystemsFetching = (domainId, payload) => ({
	type: SET_SYSTEMS_FETCHING,
	domainId,
	payload
})

export const setSystemsError = (domainId, payload) => ({
	type: SET_SYSTEMS_ERROR,
	domainId,
	payload
})

export const resetSystems = () => ({
	type: RESET_SYSTEMS
})

export const fetchSystems = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setSystemsFetching(domainId, true))
	dispatch(setSystemsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/systems?sorting=${ props.systems.sorting }&type=${ props.systems.type }&range=${ props.systems.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setSystemsValue(domainId, data))
		dispatch(setSystemsFetching(domainId, false))

	} catch (err) {

		dispatch(setSystemsError(domainId, err))
		dispatch(setSystemsFetching(domainId, false))

	}

})