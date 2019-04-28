import produce from 'immer'

import {
	SET_REFERRERS_SORTING,
	SET_REFERRERS_VALUE,
	SET_REFERRERS_FETCHING,
	SET_REFERRERS_ERROR,
	RESET_REFERRERS
} from '../actions'

import {
	REFERRERS_SORTING_TOP
} from '../../../constants/referrers'

export const initialState = () => ({
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
			draft.sorting = action.payload || initialState().sorting
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