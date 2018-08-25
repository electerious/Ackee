import immer from 'immer'

import {
	SET_TOKEN_VALUE,
	SET_TOKEN_FETCHING,
	SET_TOKEN_ERROR
} from '../actions'

const initalState = {
	value: undefined,
	fetching: false,
	error: undefined
}

export default (state = initalState, action) => immer(state, (draft) => {

	switch (action.type) {
		case SET_TOKEN_VALUE:
			draft.value = action.payload
			if (action.payload != null) localStorage.setItem('ackee_token', action.payload)
			if (action.payload == null) localStorage.removeItem('ackee_token')
			break
		case SET_TOKEN_FETCHING:
			draft.fetching = action.payload
			break
		case SET_TOKEN_ERROR:
			draft.error = action.payload
			break
	}

})