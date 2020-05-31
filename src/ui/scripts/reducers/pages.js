import produce from 'immer'

import {
	SET_PAGES_SORTING,
	SET_PAGES_VALUE,
	SET_PAGES_FETCHING,
	SET_PAGES_ERROR
} from '../actions'

import { PAGES_SORTING_TOP } from '../../../constants/pages'
import genericSubState from '../utils/genericSubState'

export const initialState = () => ({
	sorting: PAGES_SORTING_TOP,
	value: {}
})

export const initialSubState = genericSubState

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_PAGES_SORTING:
			if (draft.sorting === action.payload) break
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload
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
	}

}, initialState())