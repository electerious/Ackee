import api from '../utils/api'
import abortAndCreateController from '../utils/abortAndCreateController'
import swallowAbortError from '../utils/swallowAbortError'

const abortControllers = {
	addToken: undefined,
	deleteToken: undefined
}

export const SET_TOKEN_VALUE = Symbol()
export const SET_TOKEN_FETCHING = Symbol()
export const SET_TOKEN_ERROR = Symbol()
export const RESET_TOKEN = Symbol()

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

export const resetToken = () => ({
	type: RESET_TOKEN
})

export const addToken = (props, state) => async (dispatch) => {

	abortControllers.addToken = abortAndCreateController(abortControllers.addToken)
	const signal = abortControllers.addToken.signal

	dispatch(setTokenFetching(true))
	dispatch(setTokenError())

	try {

		const data = await swallowAbortError(api)('/tokens', {
			method: 'post',
			body: JSON.stringify(state),
			props,
			signal
		})

		dispatch(setTokenValue(data))
		dispatch(setTokenFetching(false))

	} catch (err) {

		dispatch(setTokenError(err))
		dispatch(setTokenFetching(false))

	}

}

export const deleteToken = (props) => async (dispatch) => {

	abortControllers.deleteToken = abortAndCreateController(abortControllers.deleteToken)
	const signal = abortControllers.deleteToken.signal

	dispatch(resetToken())

	props.resetDomains()
	props.resetViews()
	props.resetPages()
	props.resetReferrers()
	props.resetDurations()
	props.resetLanguages()
	props.resetRoute()

	try {

		await swallowAbortError(api)(`/tokens/${ props.token.value.id }`, {
			method: 'delete',
			props,
			signal
		})

	} catch (err) {

		dispatch(setTokenError(err))

	}

}