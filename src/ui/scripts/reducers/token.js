import produce from 'immer'

import {
	SET_TOKEN_START,
	SET_TOKEN_END,
	SET_TOKEN_FETCHING,
	SET_TOKEN_ERROR
} from '../actions'

export const initialState = () => ({
	value: undefined,
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_TOKEN_START:
			draft.fetching = true
			draft.error = initialState().error
			break
		case SET_TOKEN_END:
			draft.value = action.value || initialState().value
			draft.fetching = false
			break
		case SET_TOKEN_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_TOKEN_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())