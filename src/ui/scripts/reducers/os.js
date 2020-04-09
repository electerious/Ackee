import produce from 'immer'

import {
	RESET_OS,
	SET_OS_ERROR,
	SET_OS_FETCHING,
	SET_OS_SORTING,
	SET_OS_VALUE,
	SET_OS_TYPE,
	SET_OS_TOP_DATE_RANGE
} from '../actions'

import { OS_SORTING_TOP, OS_NO_VERSION } from '../../../constants/os'
import { LAST_7_DAYS } from '../../../constants/dateRange'

export const initialState = () => ({
	dateRange: LAST_7_DAYS.value.toString(),
	type: OS_NO_VERSION,
	sorting: OS_SORTING_TOP,
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
		case SET_OS_TYPE:
			draft.value = initialState().value
			draft.type = action.payload || initialState().type
			break
		case SET_OS_TOP_DATE_RANGE:
			draft.value = initialState().value
			draft.dateRange = action.payload || initialState().dateRange
			break
		case SET_OS_SORTING:
			// Reset value because a different sorting results in a different value strcuture
			// and because the view shouldn't show the old data when switching.
			draft.value = initialState().value
			draft.sorting = action.payload || initialState().sorting
			break
		case SET_OS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_OS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_OS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_OS:
			return initialState()
	}

}, initialState())