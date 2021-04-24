import { combineReducers } from 'redux'

import {
	RESET_STATE
} from '../actions'

import modals from './modals'
import token from './token'
import filter from './filter'
import widgets from './widgets'

const reducers = combineReducers({
	modals,
	token,
	filter,
	widgets
})

export default (state, action) => {

	switch (action.type) {
		case RESET_STATE:
			// Reducers are supposed to return the initial state when called with undefined.
			// Set state to undefined and let the other reducers return the initial state.
			state = undefined
			break
	}

	return reducers(state, action)

}