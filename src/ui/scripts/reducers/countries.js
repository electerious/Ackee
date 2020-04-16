import produce from 'immer'

import {
	SET_FILTER_RANGE,
	SET_COUNTRIES_SORTING,
	SET_COUNTRIES_VALUE,
	SET_COUNTRIES_FETCHING,
	SET_COUNTRIES_ERROR,
	RESET_COUNTRIES
} from '../actions'

import { COUNTRIES_SORTING_TOP } from '../../../constants/countries'

export const initialState = () => ({
	sorting: COUNTRIES_SORTING_TOP,
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
		case SET_COUNTRIES_SORTING:
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.sorting = action.payload || initialState().sorting
			break
		case SET_COUNTRIES_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_COUNTRIES_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_COUNTRIES_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_COUNTRIES:
			return initialState()
	}

}, initialState())