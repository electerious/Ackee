import produce from 'immer'

import {
	RESET_SIZES,
	SET_SIZES_TYPE,
	SET_SIZES_VALUE,
	SET_SIZES_FETCHING,
	SET_SIZES_ERROR,
	SET_SIZES_TOP_DATE_RANGE
} from '../actions'

import { SIZES_TYPE_SCREEN_RESOLUTION } from '../../../constants/sizes'
import { LAST_7_DAYS } from '../../../constants/dateRange'

export const initialState = () => ({
	dateRange: LAST_7_DAYS.value,
	type: SIZES_TYPE_SCREEN_RESOLUTION,
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
		case SET_SIZES_TYPE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload || initialState().type
			break
		case SET_SIZES_TOP_DATE_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.dateRange = action.payload || initialState().dateRange
			break
		case SET_SIZES_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_SIZES_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_SIZES_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_SIZES:
			return initialState()
	}

}, initialState())