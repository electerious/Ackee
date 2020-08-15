import produce from 'immer'

import {
	SET_OVERVIEW_FACTS,
	SET_OVERVIEW_STATISTICS,
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
		case SET_OVERVIEW_FACTS:
			draft.value[action.domainId].facts = action.payload || initialSubState().facts
			break
		case SET_OVERVIEW_STATISTICS:
			draft.value[action.domainId].statistics = action.payload || initialSubState().statistics
			break
		case SET_OVERVIEW_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_OVERVIEW_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
	}

}, initialState())