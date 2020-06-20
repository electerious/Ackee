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

		const data = await api('/tokens', {
			method: 'post',
			body: JSON.stringify(state),
			props,
			signal: signal()
		})

		dispatch(setTokenValue(data))
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

		await api(`/tokens/${ props.token.value.id }`, {
			method: 'delete',
			props,
			signal: signal()
		})

	} catch (err) {

		if (err.name === 'AbortError') return
		if (err.name === 'HandledError') return
		dispatch(setTokenError(err))

	}

})