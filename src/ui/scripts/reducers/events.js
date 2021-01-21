import produce from 'immer'

import {
	SET_EVENTS_START,
	SET_EVENTS_END,
	SET_EVENTS_FETCHING,
	SET_EVENTS_ERROR
} from '../actions'

export const initialState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_EVENTS_START:
			draft.fetching = true
			draft.error = initialState().error
			break
		case SET_EVENTS_END:
			draft.value = action.value || initialState().value
			draft.fetching = false
			break
		case SET_EVENTS_FETCHING:
			draft.fetching = action.payload || initialState().fetching
			break
		case SET_EVENTS_ERROR:
			draft.error = action.payload || initialState().error
			break
	}

}, initialState())