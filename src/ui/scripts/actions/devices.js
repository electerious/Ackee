import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DEVICES_RANGE = Symbol()
export const SET_DEVICES_TYPE = Symbol()
export const SET_DEVICES_SORTING = Symbol()
export const SET_DEVICES_VALUE = Symbol()
export const SET_DEVICES_FETCHING = Symbol()
export const SET_DEVICES_ERROR = Symbol()
export const RESET_DEVICES = Symbol()

export const setDevicesRange = (payload) => ({
	type: SET_DEVICES_RANGE,
	payload
})

export const setDevicesSorting = (payload) => ({
	type: SET_DEVICES_SORTING,
	payload
})

export const setDevicesType = (payload) => ({
	type: SET_DEVICES_TYPE,
	payload
})

export const setDevicesValue = (domainId, payload) => ({
	type: SET_DEVICES_VALUE,
	domainId,
	payload
})

export const setDevicesFetching = (domainId, payload) => ({
	type: SET_DEVICES_FETCHING,
	domainId,
	payload
})

export const setDevicesError = (domainId, payload) => ({
	type: SET_DEVICES_ERROR,
	domainId,
	payload
})

export const resetDevices = () => ({
	type: RESET_DEVICES
})

export const fetchDevices = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setDevicesFetching(domainId, true))
	dispatch(setDevicesError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/devices?sorting=${ props.devices.sorting }&type=${ props.devices.type }&range=${ props.devices.range }`, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setDevicesValue(domainId, data))
		dispatch(setDevicesFetching(domainId, false))

	} catch (err) {

		dispatch(setDevicesError(domainId, err))
		dispatch(setDevicesFetching(domainId, false))

	}

})