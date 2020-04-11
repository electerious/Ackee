import produce from 'immer'

import {
	SET_SYSTEMS_ERROR,
	SET_SYSTEMS_FETCHING,
	SET_SYSTEMS_SORTING,
	SET_SYSTEMS_VALUE,
	SET_SYSTEMS_TYPE,
	SET_SYSTEMS_RANGE,
	RESET_SYSTEMS
} from '../actions'

import { SYSTEMS_SORTING_TOP, SYSTEMS_TYPE_NO_VERSION } from '../../../constants/systems'
import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'

export const initialState = () => ({
	range: RANGES_LAST_7_DAYS.value,
	type: SYSTEMS_TYPE_NO_VERSION,
	sorting: SYSTEMS_SORTING_TOP,
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
		case SET_SYSTEMS_TYPE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload || initialState().type
			break
		case SET_SYSTEMS_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.range = action.payload || initialState().range
			break
		case SET_SYSTEMS_SORTING:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload || initialState().sorting
			break
		case SET_SYSTEMS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_SYSTEMS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_SYSTEMS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_SYSTEMS:
			return initialState()
	}

}, initialState())