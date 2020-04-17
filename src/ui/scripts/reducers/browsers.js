import produce from 'immer'

import {
	SET_FILTER_RANGE,
	SET_BROWSERS_ERROR,
	SET_BROWSERS_FETCHING,
	SET_BROWSERS_SORTING,
	SET_BROWSERS_VALUE,
	SET_BROWSERS_TYPE,
	RESET_BROWSERS
} from '../actions'

import { BROWSERS_SORTING_TOP, BROWSERS_TYPE_NO_VERSION } from '../../../constants/browsers'

export const initialState = () => ({
	type: BROWSERS_TYPE_NO_VERSION,
	sorting: BROWSERS_SORTING_TOP,
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
		case SET_FILTER_RANGE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			break
		case SET_BROWSERS_TYPE:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload
			break
		case SET_BROWSERS_SORTING:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload
			break
		case SET_BROWSERS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_BROWSERS_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_BROWSERS_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_BROWSERS:
			return initialState()
	}

}, initialState())