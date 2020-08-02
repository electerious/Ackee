import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_PAGES_VALUE = Symbol()
export const SET_PAGES_FETCHING = Symbol()
export const SET_PAGES_ERROR = Symbol()

export const setPagesValue = (domainId, payload) => ({
	type: SET_PAGES_VALUE,
	domainId,
	payload
})

export const setPagesFetching = (payload) => ({
	type: SET_PAGES_FETCHING,
	payload
})

export const setPagesError = (payload) => ({
	type: SET_PAGES_ERROR,
	payload
})

export const fetchPages = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setPagesFetching(true))
	dispatch(setPagesError())

	try {

		const data = await api({
			query: `
				query fetchPages($sorting: Sorting!, $range: Range) {
					domains {
						id
						statistics {
							pages(sorting: $sorting, range: $range) {
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
				range: props.filter.range
			},
			props,
			signal: signal()
		})

		data.domains.forEach((domain) => {
			dispatch(setPagesValue(domain.id, domain.statistics.pages))
		})
		dispatch(setPagesFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPagesFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPagesError(err))

	}

})