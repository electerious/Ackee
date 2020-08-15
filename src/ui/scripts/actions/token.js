import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

import { resetState } from './index'

export const SET_TOKEN_VALUE = Symbol()
export const SET_TOKEN_FETCHING = Symbol()
export const SET_TOKEN_ERROR = Symbol()

export const setTokenValue = (payload) => ({
	type: SET_TOKEN_VALUE,
	payload
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

	dispatch(setTokenFetching(true))
	dispatch(setTokenError())

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

		// TODO: Maybe just store the id instead of the payload
		dispatch(setTokenValue(data.createToken.payload))
		dispatch(setTokenFetching(false))

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
				id: props.token.value.id
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