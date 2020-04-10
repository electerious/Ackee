import produce from 'immer'

import {
	SET_REFERRERS_SORTING,
	SET_REFERRERS_VALUE,
	SET_REFERRERS_FETCHING,
	SET_REFERRERS_ERROR,
	SET_REFERRERS_RANGE,
	RESET_REFERRERS
} from '../actions'

import { REFERRERS_SORTING_TOP } from '../../../constants/referrers'
import { LAST_7_DAYS } from '../../../constants/ranges'

export const initialState = () => ({
	range: LAST_7_DAYS.value,
	sorting: REFERRERS_SORTING_TOP,
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
		case SET_REFERRERS_SORTING:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload || initialState().sorting
			break
		case SET_REFERRERS_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.range = action.payload || initialState().range
			break
		case SET_REFERRERS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_REFERRERS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_REFERRERS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_REFERRERS:
			return initialState()
	}

}, initialState())