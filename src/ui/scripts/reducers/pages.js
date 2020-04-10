import produce from 'immer'

import {
	RESET_PAGES,
	SET_PAGES_SORTING,
	SET_PAGES_VALUE,
	SET_PAGES_FETCHING,
	SET_PAGES_ERROR,
	SET_PAGES_TOP_DATE_RANGE
} from '../actions'

import { PAGES_SORTING_TOP } from '../../../constants/pages'
import { LAST_7_DAYS } from '../../../constants/dateRange'

export const initialState = () => ({
	dateRange: LAST_7_DAYS.value,
	sorting: PAGES_SORTING_TOP,
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
		case SET_PAGES_SORTING:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload || initialState().sorting
			break
		case SET_PAGES_TOP_DATE_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.dateRange = action.payload || initialState().dateRange
			break
		case SET_PAGES_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_PAGES_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_PAGES_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_PAGES:
			return initialState()
	}

}, initialState())