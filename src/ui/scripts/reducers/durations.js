import produce from 'immer'

import {
	SET_DURATIONS_TYPE,
	SET_DURATIONS_VALUE,
	SET_DURATIONS_FETCHING,
	SET_DURATIONS_ERROR,
	RESET_DURATIONS
} from '../actions'

import { DURATIONS_TYPE_AVERAGE } from '../../../constants/durations'

export const initialState = () => ({
	type: DURATIONS_TYPE_AVERAGE,
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
		case SET_DURATIONS_TYPE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload || initialState().type
			break
		case SET_DURATIONS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_DURATIONS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_DURATIONS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_DURATIONS:
			return initialState()
	}

}, initialState())