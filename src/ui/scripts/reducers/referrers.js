import produce from 'immer'

import {
	SET_REFERRERS_SORTING,
	SET_REFERRERS_VALUE,
	SET_REFERRERS_FETCHING,
	SET_REFERRERS_ERROR
} from '../actions'

import { REFERRERS_SORTING_TOP } from '../../../constants/referrers'
import genericSubState from '../utils/genericSubState'

export const initialState = () => ({
	sorting: REFERRERS_SORTING_TOP,
	value: {}
})

export const initialSubState = genericSubState

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_REFERRERS_SORTING:
			if (draft.sorting === action.payload) break
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload
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
	}

}, initialState())