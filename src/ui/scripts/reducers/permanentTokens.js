import produce from 'immer'

import {
	SET_PERMANENT_TOKENS_VALUE,
	SET_PERMANENT_TOKENS_FETCHING,
	SET_PERMANENT_TOKENS_ERROR
} from '../actions'

export const initialState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_PERMANENT_TOKENS_VALUE:
			draft.value = action.payload || initialState().value
			break
		case SET_PERMANENT_TOKENS_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_PERMANENT_TOKENS_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())