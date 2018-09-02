import immer from 'immer'

import {
	SET_DOMAINS_VALUE,
	SET_DOMAINS_FETCHING,
	SET_DOMAINS_ERROR
} from '../actions'

const initalState = {
	value: [],
	fetching: false,
	error: undefined
}

export default (state = initalState, action) => immer(state, (draft) => {

	switch (action.type) {
		case SET_DOMAINS_VALUE:
			draft.value = action.payload || initalState.value
			break
		case SET_DOMAINS_FETCHING:
			draft.fetching = action.payload || initalState.fetching
			break
		case SET_DOMAINS_ERROR:
			draft.error = action.payload || initalState.error
			break
	}

})