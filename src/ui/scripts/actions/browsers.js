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

export const setBrowsersFetching = (payload) => ({
	type: SET_BROWSERS_FETCHING,
	payload
})

export const setBrowsersError = (payload) => ({
	type: SET_BROWSERS_ERROR,
	payload
})

export const fetchBrowsers = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setBrowsersFetching(true))
	dispatch(setBrowsersError())

	try {

		const data = await api({
			query: `
				query fetchBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
					domains {
						id
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
				sorting: props.filter.sorting,
				type: props.browsers.type,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setBrowsersValue(domain.id, domain.statistics.browsers))
		})
		dispatch(setBrowsersFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setBrowsersFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setBrowsersError(err))

	}

})