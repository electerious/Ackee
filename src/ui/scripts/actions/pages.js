import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_PAGES_SORTING = Symbol()
export const SET_PAGES_VALUE = Symbol()
export const SET_PAGES_FETCHING = Symbol()
export const SET_PAGES_ERROR = Symbol()

export const setPagesSorting = (payload) => ({
	type: SET_PAGES_SORTING,
	payload
})

export const setPagesValue = (domainId, payload) => ({
	type: SET_PAGES_VALUE,
	domainId,
	payload
})

export const setPagesFetching = (domainId, payload) => ({
	type: SET_PAGES_FETCHING,
	domainId,
	payload
})

export const setPagesError = (domainId, payload) => ({
	type: SET_PAGES_ERROR,
	domainId,
	payload
})

export const fetchPages = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setPagesFetching(domainId, true))
	dispatch(setPagesError(domainId))

	try {

		const data = await api({
			query: `
				query fetchPages($id: ID!, $sorting: Sorting!, $range: Range) {
					domain(id: $id) {
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
				id: domainId,
				sorting: props.pages.sorting,
				range: props.filter.range
			},
			props,
			signal: signal(domainId)
		})

		dispatch(setPagesValue(domainId, data.domain.statistics.pages))
		dispatch(setPagesFetching(domainId, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPagesFetching(domainId, false))
		if (err.name === 'HandledError') return
		dispatch(setPagesError(domainId, err))

	}

})