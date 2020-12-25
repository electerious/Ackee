import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const RESET_STATE = Symbol()
export const SET_TOKEN_START = Symbol()
export const SET_TOKEN_END = Symbol()
export const SET_TOKEN_FETCHING = Symbol()
export const SET_TOKEN_ERROR = Symbol()

export const resetState = () => ({
	type: RESET_STATE
})

export const setTokenStart = () => ({
	type: SET_TOKEN_START
})

export const setTokenEnd = (value) => ({
	type: SET_TOKEN_END,
	value
})

export const setTokenFetching = (payload) => ({
	type: SET_TOKEN_FETCHING,
	payload
})

export const setTokenError = (payload) => ({
	type: SET_TOKEN_ERROR,
	payload
})

export const addToken = signalHandler((signal) => (props, state) => async (dispatch) => {

	dispatch(setTokenStart(true))

	try {

		const data = await api({
			query: `
				mutation createToken($input: CreateTokenInput!) {
					createToken(input: $input) {
						payload {
							id
						}
					}
				}
			`,
			variables: {
				input: {
					username: state.username,
					password: state.password
				}
			},
			props,
			signal: signal()
		})

		dispatch(setTokenEnd(data.createToken.payload.id))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setTokenFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setTokenError(err))

	}

})

export const deleteToken = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(resetState())

	try {

		await api({
			query: `
				mutation deleteToken($id: ID!) {
					deleteToken(id: $id) {
						success
					}
				}
			`,
			variables: {
				id: props.token.value
			},
			props,
			signal: signal()
		})

	} catch (err) {

		if (err.name === 'AbortError') return
		if (err.name === 'HandledError') return
		dispatch(setTokenError(err))

	}

})