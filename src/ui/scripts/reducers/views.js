import immer from 'immer'

import {
	SET_VIEWS_VALUE,
	SET_VIEWS_FETCHING,
	SET_VIEWS_ERROR
} from '../actions'

const initalState = {
	value: {}
}

export default (state = initalState, action) => immer(state, (draft) => {

	// Initialize property for domain
	if (draft.value[action.domainId] == null) draft.value[action.domainId] = {
		value: [],
		fetching: false,
		error: undefined
	}

	switch (action.type) {
		case SET_VIEWS_VALUE:
			draft.value[action.domainId].value = action.payload
			break
		case SET_VIEWS_FETCHING:
			draft.value[action.domainId].fetching = action.payload
			break
		case SET_VIEWS_ERROR:
			draft.value[action.domainId].error = action.payload
			break
	}

})