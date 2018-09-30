import produce from 'immer'

import {
	SET_VIEWS_VALUE,
	SET_VIEWS_FETCHING,
	SET_VIEWS_ERROR,
	RESET_VIEWS
} from '../actions'

const initalState = () => ({
	value: {}
})

const initalSubState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initalSubState()

	switch (action.type) {
		case SET_VIEWS_VALUE:
			draft.value[action.domainId].value = action.payload || initalSubState.value
			break
		case SET_VIEWS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initalSubState.fetching
			break
		case SET_VIEWS_ERROR:
			draft.value[action.domainId].error = action.payload || initalSubState.error
			break
		case RESET_VIEWS:
			return initalState()
	}

}, initalState())