import produce from 'immer'

import {
	SET_BROWSERS_ERROR,
	SET_BROWSERS_FETCHING,
	SET_BROWSERS_VALUE,
	SET_BROWSERS_TYPE
} from '../actions'

import { BROWSERS_TYPE_NO_VERSION } from '../../../constants/browsers'
import genericState from '../utils/genericState'
import genericSubState from '../utils/genericSubState'

export const initialState = () => ({
	type: BROWSERS_TYPE_NO_VERSION,
	...genericState()
})

export const initialSubState = genericSubState

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_BROWSERS_TYPE:
			if (draft.type === action.payload) break
			// Reset value because the view shouldn't show the old data when switching
			draft.value = initialState().value
			draft.type = action.payload
			break
		case SET_BROWSERS_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_BROWSERS_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_BROWSERS_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())