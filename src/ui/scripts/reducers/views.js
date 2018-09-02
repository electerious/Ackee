import immer from 'immer'

import {
	SET_VIEWS_VALUE,
	SET_VIEWS_FETCHING,
	SET_VIEWS_ERROR
} from '../actions'

const initalState = {
	value: {}
}

const initalSubState = {
	value: [],
	fetching: false,
	error: undefined
}

export default (state = initalState, action) => immer(state, (draft) => {

	switch (action.type) {
		case SET_VIEWS_VALUE:
			if (draft.value[action.domainId] == null) draft.value[action.domainId] = initalSubState
			draft.value[action.domainId].value = action.payload || initalSubState.value
			break
		case SET_VIEWS_FETCHING:
			if (draft.value[action.domainId] == null) draft.value[action.domainId] = initalSubState
			draft.value[action.domainId].fetching = action.payload || initalSubState.fetching
			break
		case SET_VIEWS_ERROR:
			if (draft.value[action.domainId] == null) draft.value[action.domainId] = initalSubState
			draft.value[action.domainId].error = action.payload || initalSubState.error
			break
	}

})