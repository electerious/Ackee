import { useReducer, useCallback } from 'react'

import { version } from '../../../../package.json'

import createStorage from '../utils/createStorage'

const SET_TOKEN = Symbol()
const RESET_TOKEN = Symbol()

// The key should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading an outdated state.
export const { get, set, reset } = createStorage(`ackee_token_${ version }`)

const reducer = (state, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return set(action.token)
		case RESET_TOKEN:
			return reset()
		default:
			return state
	}
}

export default () => {
	const [ token, dispatch ] = useReducer(reducer, get())

	const setToken = useCallback((token) => dispatch({
		type: SET_TOKEN,
		token,
	}), [ dispatch ])

	const resetToken = useCallback(() => dispatch({
		type: RESET_TOKEN,
	}), [ dispatch ])

	return {
		token,
		setToken,
		resetToken,
	}
}