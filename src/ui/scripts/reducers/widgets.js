import produce from 'immer'

import {
	SET_WIDGETS_START,
	SET_WIDGETS_END,
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
		case SET_WIDGETS_START:
			draft.value[action.id].variables = action.variables || initialSubState().variables
			draft.value[action.id].fetching = true
			break
		case SET_WIDGETS_END:
			draft.value[action.id].value = action.value || initialSubState().value
			draft.value[action.id].fetching = false
			break
		case SET_WIDGETS_FETCHING:
			draft.value[action.id].fetching = action.payload || initialSubState().fetching
			break
		case SET_WIDGETS_ERROR:
			draft.value[action.id].error = action.payload || initialSubState().error
			break
	}

}, initialState())