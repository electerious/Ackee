import produce from 'immer'

import {
	SET_WIDGETS_VALUE,
	SET_WIDGETS_VARIABLES,
	SET_WIDGETS_FETCHING,
	SET_WIDGETS_ERROR
} from '../actions'

export const initialState = () => ({
	value: {}
})

export const initialSubState = () => ({
	value: [],
	variables: {},
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	const hasId = () => action.id != null
	const hasValue = () => draft.value[action.id] != null

	if (hasId() === true && hasValue() === false) draft.value[action.id] = initialSubState()

	switch (action.type) {
		case SET_WIDGETS_VALUE:
			draft.value[action.id].value = action.payload || initialSubState().value
			break
		case SET_WIDGETS_VARIABLES:
			draft.value[action.id].variables = action.payload || initialSubState().value
			break
		case SET_WIDGETS_FETCHING:
			draft.value[action.id].fetching = action.payload || initialSubState().fetching
			break
		case SET_WIDGETS_ERROR:
			draft.value[action.id].error = action.payload || initialSubState().error
			break
	}

}, initialState())