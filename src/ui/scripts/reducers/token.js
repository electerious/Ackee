import produce from 'immer'

import * as storage from '../utils/storage'

import {
	SET_TOKEN_VALUE,
	SET_TOKEN_FETCHING,
	SET_TOKEN_ERROR,
	RESET_TOKEN
} from '../actions'

const initialState = () => ({
	value: {},
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_TOKEN_VALUE:
			draft.value = action.payload || initialState().value
			if (action.payload != null) storage.set('ackee_token', action.payload)
			if (action.payload == null) storage.remove('ackee_token')
			break
		case SET_TOKEN_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_TOKEN_ERROR:
			draft.error = action.payload || initialState().error
			break
		case RESET_TOKEN:
			return initialState()
	}

}, initialState())