import produce from 'immer'

import {
	SET_DEVICES_ERROR,
	SET_DEVICES_FETCHING,
	SET_DEVICES_SORTING,
	SET_DEVICES_VALUE,
	SET_DEVICES_TYPE
} from '../actions'

import { DEVICES_SORTING_TOP, DEVICES_TYPE_WITH_MODEL } from '../../../constants/devices'

export const initialState = () => ({
	type: DEVICES_TYPE_WITH_MODEL,
	sorting: DEVICES_SORTING_TOP,
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
		case SET_DEVICES_TYPE:
			if (draft.type === action.payload) break
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload
			break
		case SET_DEVICES_SORTING:
			if (draft.sorting === action.payload) break
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload
			break
		case SET_DEVICES_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_DEVICES_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_DEVICES_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
	}

}, initialState())