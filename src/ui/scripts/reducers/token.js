import produce from 'immer'

import {
	SET_TOKEN_VALUE,
	SET_TOKEN_FETCHING,
	SET_TOKEN_ERROR
} from '../actions'

export const initialState = () => ({
	value: {},
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_TOKEN_VALUE:
			draft.value = action.payload || initialState().value
			break
		case SET_TOKEN_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_TOKEN_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())