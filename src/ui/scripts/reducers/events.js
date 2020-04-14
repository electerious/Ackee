import produce from 'immer'

import {
	SET_EVENTS_VALUE,
	SET_EVENTS_FETCHING,
	SET_EVENTS_ERROR,
	SET_EVENTS_RANGE,
	RESET_EVENTS
} from '../actions'

import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'

export const initialState = () => ({
	range: RANGES_LAST_7_DAYS.value,
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
		case SET_EVENTS_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.range = action.payload || initialState().range
			break
		case SET_EVENTS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_EVENTS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_EVENTS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_EVENTS:
			return initialState()
	}

}, initialState())