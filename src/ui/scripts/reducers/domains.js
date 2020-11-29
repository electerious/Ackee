import produce from 'immer'

import {
	SET_DOMAINS_START,
	SET_DOMAINS_END,
	SET_DOMAINS_FETCHING,
	SET_DOMAINS_ERROR
} from '../actions'

export const initialState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_DOMAINS_START:
			draft.fetching = true
			draft.error = initialState().error
			break
		case SET_DOMAINS_END:
			draft.value = action.value || initialState().value
			draft.fetching = false
			break
		case SET_DOMAINS_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_DOMAINS_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())