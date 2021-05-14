import { useReducer, useCallback } from 'react'

import { version } from '../../../../package.json'

// Should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading outdated state.
const PERSISTED_STATE_KEY = `ackee_token_${ version }`

const SET_TOKEN = Symbol()
const RESET_TOKEN = Symbol()

export const get = () => localStorage.getItem(PERSISTED_STATE_KEY)
const set = (state) => localStorage.setItem(PERSISTED_STATE_KEY, state)
const reset = () => localStorage.removeItem(PERSISTED_STATE_KEY)

const reducer = (state, action) => {

	switch (action.type) {
		case SET_TOKEN:
			set(action.token)
			return action.token
		case RESET_TOKEN:
			reset()
			return
		default:
			return state
	}

}

export default () => {

	const [ token, dispatch ] = useReducer(reducer, get())

	const setToken = useCallback((token) => dispatch({
		type: SET_TOKEN,
		token
	}), [ dispatch ])

	const resetToken = useCallback(() => dispatch({
		type: RESET_TOKEN
	}), [ dispatch ])

	return {
		token,
		setToken,
		resetToken
	}

}