import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_BROWSERS_TYPE = Symbol()
export const SET_BROWSERS_VALUE = Symbol()
export const SET_BROWSERS_FETCHING = Symbol()
export const SET_BROWSERS_ERROR = Symbol()

export const setBrowsersType = (payload) => ({
	type: SET_BROWSERS_TYPE,
	payload
})

export const setBrowsersValue = (domainId, payload) => ({
	type: SET_BROWSERS_VALUE,
	domainId,
	payload
})

export const setBrowsersFetching = (domainId, payload) => ({
	type: SET_BROWSERS_FETCHING,
	domainId,
	payload
})

export const setBrowsersError = (domainId, payload) => ({
	type: SET_BROWSERS_ERROR,
	domainId,
	payload
})

export const fetchBrowsers = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setBrowsersFetching(domainId, true))
	dispatch(setBrowsersError(domainId))

	try {

		const data = await api({
			query: `
				query fetchBrowsers($id: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
					domain(id: $id) {
						statistics {
							browsers(sorting: $sorting, type: $type, range: $range) {
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
				sorting: props.filter.sorting,
				type: props.browsers.type,
				range: props.filter.range
			},
			props,
			signal: signal(domainId)
		})

		dispatch(setBrowsersValue(domainId, data.domain.statistics.browsers))
		dispatch(setBrowsersFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setBrowsersFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setBrowsersError(domainId, err))

	}

})