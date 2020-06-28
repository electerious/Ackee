import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DEVICES_TYPE = Symbol()
export const SET_DEVICES_SORTING = Symbol()
export const SET_DEVICES_VALUE = Symbol()
export const SET_DEVICES_FETCHING = Symbol()
export const SET_DEVICES_ERROR = Symbol()

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

export const fetchDevices = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setDevicesFetching(domainId, true))
	dispatch(setDevicesError(domainId))

	try {

		const data = await api({
			query: `
				query fetchDevices($id: ID!, $sorting: Sorting!, $type: SystemType!, $range: Range) {
					domain(id: $id) {
						statistics {
							devices(sorting: $sorting, type: $type, range: $range) {
								id
								count
								created
							}
						}
					}
				}
			`,
			variables: {
				id: domainId,
				sorting: props.devices.sorting,
				type: props.devices.type,
				range: props.filter.range
			},
			props,
			signal: signal(domainId)
		})

		dispatch(setDevicesValue(domainId, data.domain.statistics.devices))
		dispatch(setDevicesFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDevicesFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setDevicesError(domainId, err))

	}

})