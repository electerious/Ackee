import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_SIZES_RANGE = Symbol()
export const SET_SIZES_TYPE = Symbol()
export const SET_SIZES_VALUE = Symbol()
export const SET_SIZES_FETCHING = Symbol()
export const SET_SIZES_ERROR = Symbol()
export const RESET_SIZES = Symbol()

export const setSizesRange = (payload) => ({
	type: SET_SIZES_RANGE,
	payload
})

export const setSizesType = (payload) => ({
	type: SET_SIZES_TYPE,
	payload
})

export const setSizesValue = (domainId, payload) => ({
	type: SET_SIZES_VALUE,
	domainId,
	payload
})

export const setSizesFetching = (domainId, payload) => ({
	type: SET_SIZES_FETCHING,
	domainId,
	payload
})

export const setSizesError = (domainId, payload) => ({
	type: SET_SIZES_ERROR,
	domainId,
	payload
})

export const resetSizes = () => ({
	type: RESET_SIZES
})

export const fetchSizes = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setSizesFetching(domainId, true))
	dispatch(setSizesError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/sizes?type=${ props.sizes.type }&range=${ props.sizes.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setSizesValue(domainId, data))
		dispatch(setSizesFetching(domainId, false))

	} catch (err) {

		dispatch(setSizesError(domainId, err))
		dispatch(setSizesFetching(domainId, false))

	}

})