import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_OS_TOP_DATE_RANGE = Symbol()
export const SET_OS_TYPE = Symbol()
export const SET_OS_SORTING = Symbol()
export const SET_OS_VALUE = Symbol()
export const SET_OS_FETCHING = Symbol()
export const SET_OS_ERROR = Symbol()
export const RESET_OS = Symbol()

export const setOsTopDateRange = (payload) => ({
	type: SET_OS_TOP_DATE_RANGE,
	payload
})

export const setOsSorting = (payload) => ({
	type: SET_OS_SORTING,
	payload
})

export const setOsType = (payload) => ({
	type: SET_OS_TYPE,
	payload
})

export const setOsValue = (domainId, payload) => ({
	type: SET_OS_VALUE,
	domainId,
	payload
})

export const setOsFetching = (domainId, payload) => ({
	type: SET_OS_FETCHING,
	domainId,
	payload
})

export const setOsError = (domainId, payload) => ({
	type: SET_OS_ERROR,
	domainId,
	payload
})

export const resetOs = () => ({
	type: RESET_OS
})

export const fetchOs = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setOsFetching(domainId, true))
	dispatch(setOsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/os?sorting=${ props.os.sorting }&type=${ props.os.type }&dateRange=${ props.os.dateRange }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setOsValue(domainId, data))
		dispatch(setOsFetching(domainId, false))

	} catch (err) {

		dispatch(setOsError(domainId, err))
		dispatch(setOsFetching(domainId, false))

	}

})