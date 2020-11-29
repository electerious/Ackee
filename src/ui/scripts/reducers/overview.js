import produce from 'immer'

import {
	SET_OVERVIEW_START,
	SET_OVERVIEW_END,
	SET_OVERVIEW_FETCHING,
	SET_OVERVIEW_ERROR
} from '../actions'

export const initialState = () => ({
	value: {}
})

export const initialSubState = () => ({
	facts: {},
	statistics: {},
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_OVERVIEW_START:
			draft.value[action.domainId].fetching = true
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case SET_OVERVIEW_END:
			draft.value[action.domainId].facts = action.facts || initialSubState().facts
			draft.value[action.domainId].statistics = action.statistics || initialSubState().statistics
			draft.value[action.domainId].fetching = false
			break
		case SET_OVERVIEW_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_OVERVIEW_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
	}

}, initialState())