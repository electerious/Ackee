import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_DEVICES_TYPE = Symbol()
export const SET_DEVICES_VALUE = Symbol()
export const SET_DEVICES_FETCHING = Symbol()
export const SET_DEVICES_ERROR = Symbol()

export const setDevicesType = (payload) => ({
	type: SET_DEVICES_TYPE,
	payload
})

export const setDevicesValue = (domainId, payload) => ({
	type: SET_DEVICES_VALUE,
	domainId,
	payload
})

export const setDevicesFetching = (payload) => ({
	type: SET_DEVICES_FETCHING,
	payload
})

export const setDevicesError = (payload) => ({
	type: SET_DEVICES_ERROR,
	payload
})

export const fetchDevices = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setDevicesFetching(true))
	dispatch(setDevicesError())

	try {

		const data = await api({
			query: `
				query fetchDevices($sorting: Sorting!, $type: DeviceType!, $range: Range) {
					domains {
						id
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
				sorting: props.filter.sorting,
				type: props.devices.type,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setDevicesValue(domain.id, domain.statistics.devices))
		})
		dispatch(setDevicesFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setDevicesFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setDevicesError(err))

	}

})