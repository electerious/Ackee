import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const ALL_DOMAINS = Symbol()

export const SET_OVERVIEW_VALUE = Symbol()
export const SET_OVERVIEW_FETCHING = Symbol()
export const SET_OVERVIEW_ERROR = Symbol()

export const setOverviewValue = (domainId, payload) => ({
	type: SET_OVERVIEW_VALUE,
	domainId,
	payload
})

export const setOverviewFetching = (domainId, payload) => ({
	type: SET_OVERVIEW_FETCHING,
	domainId,
	payload
})

export const setOverviewError = (domainId, payload) => ({
	type: SET_OVERVIEW_ERROR,
	domainId,
	payload
})

export const fetchOverview = signalHandler((signal) => (props, domainId) => async (dispatch) => {

	dispatch(setOverviewFetching(domainId, true))
	dispatch(setOverviewError(domainId))

	try {

		const query = 'views=%7B%22type%22:%22unique%22%7D&pages=%7B%22sorting%22:%22top%22%7D&referrers=%7B%22sorting%22:%22top%22%7D&durations=%7B%22type%22:%22average%22%7D&systems=%7B%22type%22:%22withVersion%22,%22sorting%22:%22top%22%7D&devices=%7B%22type%22:%22withModel%22,%22sorting%22:%22top%22%7D&browsers=%7B%22type%22:%22withVersion%22,%20%22sorting%22:%22top%22%7D&sizes=%7B%22type%22:%22browser_height%22%7D&languages=%7B%22sorting%22:%22top%22%7D'
		const path = domainId === ALL_DOMAINS ? `/overview?${ query }` : `/domains/${ domainId }/overview?${ query }`

		const data = await api(path, {
			method: 'get',
			props,
			signal: signal(domainId)
		})

		dispatch(setOverviewValue(domainId, data))
		dispatch(setOverviewFetching(domainId, false))

	} catch (err) {

		dispatch(setOverviewError(domainId, err))
		dispatch(setOverviewFetching(domainId, false))

	}

})