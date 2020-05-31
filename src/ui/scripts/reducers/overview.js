import produce from 'immer'

import {
	SET_OVERVIEW_VALUE,
	SET_OVERVIEW_FETCHING,
	SET_OVERVIEW_ERROR
} from '../actions'

import genericSubState from '../utils/genericSubState'

export const initialState = () => ({
	value: {}
})

export const initialSubState = genericSubState

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_OVERVIEW_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_OVERVIEW_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_OVERVIEW_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
	}

}, initialState())