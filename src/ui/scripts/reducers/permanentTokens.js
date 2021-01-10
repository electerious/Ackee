import produce from 'immer'

import {
	SET_PERMANENT_TOKENS_START,
	SET_PERMANENT_TOKENS_END,
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
		case SET_PERMANENT_TOKENS_START:
			draft.fetching = true
			draft.error = initialState().error
			break
		case SET_PERMANENT_TOKENS_END:
			draft.value = action.value || initialState().value
			draft.fetching = false
			break
		case SET_PERMANENT_TOKENS_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_PERMANENT_TOKENS_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())