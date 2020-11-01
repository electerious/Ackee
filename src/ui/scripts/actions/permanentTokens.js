import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_PERMANENT_TOKENS_VALUE = Symbol()
export const SET_PERMANENT_TOKENS_FETCHING = Symbol()
export const SET_PERMANENT_TOKENS_ERROR = Symbol()

export const setPermanentTokensValue = (payload) => ({
	type: SET_PERMANENT_TOKENS_VALUE,
	payload
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

	dispatch(setPermanentTokensFetching(true))
	dispatch(setPermanentTokensError())

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

		dispatch(setPermanentTokensValue(data.permanentTokens))
		dispatch(setPermanentTokensFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})

export const addPermanentToken = (props, state) => async (dispatch) => {

	dispatch(setPermanentTokensFetching(true))
	dispatch(setPermanentTokensError())

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
		dispatch(setPermanentTokensFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

}

export const updatePermanentToken = signalHandler((signal) => (props, permanentTokenId, state) => async (dispatch) => {

	dispatch(setPermanentTokensFetching(true))
	dispatch(setPermanentTokensError())

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
		dispatch(setPermanentTokensFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})

export const deletePermanentToken = signalHandler((signal) => (props, permanentTokenId) => async (dispatch) => {

	dispatch(setPermanentTokensFetching(true))
	dispatch(setPermanentTokensError())

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
		dispatch(setPermanentTokensFetching(false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setPermanentTokensFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setPermanentTokensError(err))

	}

})