import produce from 'immer'

import {
	SET_VIEWS_TYPE,
	SET_VIEWS_VALUE,
	SET_VIEWS_FETCHING,
	SET_VIEWS_ERROR,
	RESET_VIEWS
} from '../actions'

import {
	VIEWS_TYPE_UNIQUE
} from '../../../constants/views'

export const initialState = () => ({
	type: VIEWS_TYPE_UNIQUE,
	value: {}
})

export const initialSubState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_VIEWS_TYPE:
			draft.type = action.payload || initialState().type
			break
		case SET_VIEWS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_VIEWS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_VIEWS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_VIEWS:
			return initialState()
	}

}, initialState())