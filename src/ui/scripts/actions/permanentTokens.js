import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_PERMANENT_TOKENS_START = Symbol()
export const SET_PERMANENT_TOKENS_END = Symbol()
export const SET_PERMANENT_TOKENS_FETCHING = Symbol()
export const SET_PERMANENT_TOKENS_ERROR = Symbol()

export const setPermanentTokensStart = () => ({
	type: SET_PERMANENT_TOKENS_START
})

export const setPermanentTokensEnd = (value) => ({
	type: SET_PERMANENT_TOKENS_END,
	value
})

export const setPermanentTokensFetching = (payload) => ({
	type: SET_PERMANENT_TOKENS_FETCHING,
	payload
})

export const setPermanentTokensError = (payload) => ({
	type: SET_PERMANENT_TOKENS_ERROR,
	payload
})

export const fetchPermanentTokens = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setPermanentTokensStart())

	try {

		const data = await api({
			query: `
				query fetchPermanentTokens {
					permanentTokens {
						id
						title
					}
				}
			`,
			props,
			signal: signal()
		})

		dispatch(setPermanentTokensEnd(data.permanentTokens))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})

export const addPermanentToken = (props, state) => async (dispatch) => {

	dispatch(setPermanentTokensStart())

	try {

		await api({
			query: `
				mutation createPermanentToken($input: CreatePermanentTokenInput!) {
					createPermanentToken(input: $input) {
						success
					}
			  	}
			`,
			variables: {
				input: {
					title: state.title
				}
			},
			props
		})

		await dispatch(fetchPermanentTokens(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

}

export const updatePermanentToken = signalHandler((signal) => (props, permanentTokenId, state) => async (dispatch) => {

	dispatch(setPermanentTokensStart())

	try {

		await api({
			query: `
				mutation updatePermanentToken($id: ID!, $input: UpdatePermanentTokenInput!) {
					updatePermanentToken(id: $id, input: $input) {
						success
					}
				}
			`,
			variables: {
				id: permanentTokenId,
				input: {
					title: state.title
				}
			},
			props,
			signal: signal(permanentTokenId)
		})

		await dispatch(fetchPermanentTokens(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})

export const deletePermanentToken = signalHandler((signal) => (props, permanentTokenId) => async (dispatch) => {

	dispatch(setPermanentTokensStart())

	try {

		await api({
			query: `
				mutation deletePermanentToken($id: ID!) {
					deletePermanentToken(id: $id) {
						success
					}
				}
			`,
			variables: {
				id: permanentTokenId
			},
			props,
			signal: signal(permanentTokenId)
		})

		await dispatch(fetchPermanentTokens(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})