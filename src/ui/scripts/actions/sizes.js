import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_SIZES_TYPE = Symbol()
export const SET_SIZES_VALUE = Symbol()
export const SET_SIZES_FETCHING = Symbol()
export const SET_SIZES_ERROR = Symbol()

export const setSizesType = (payload) => ({
	type: SET_SIZES_TYPE,
	payload
})

export const setSizesValue = (domainId, payload) => ({
	type: SET_SIZES_VALUE,
	domainId,
	payload
})

export const setSizesFetching = (payload) => ({
	type: SET_SIZES_FETCHING,
	payload
})

export const setSizesError = (payload) => ({
	type: SET_SIZES_ERROR,
	payload
})

export const fetchSizes = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setSizesFetching(true))
	dispatch(setSizesError())

	try {

		const data = await api({
			query: `
				query fetchSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
					domains {
						id
						statistics {
							sizes(sorting: $sorting, type: $type, range: $range) {
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
				type: props.sizes.type,
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setSizesValue(domain.id, domain.statistics.sizes))
		})
		dispatch(setSizesFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setSizesFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setSizesError(err))

	}

})