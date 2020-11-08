import { combineReducers } from 'redux'

import {
	RESET_STATE
} from '../actions'

import modals from './modals'
import token from './token'
import permanentTokens from './permanentTokens'
import route from './route'
import filter from './filter'
import domains from './domains'
import overview from './overview'
import views from './views'
import pages from './pages'
import referrers from './referrers'
import durations from './durations'
import systems from './systems'
import devices from './devices'
import browsers from './browsers'
import sizes from './sizes'
import languages from './languages'

const reducers = combineReducers({
	modals,
	token,
	permanentTokens,
	route,
	filter,
	domains,
	overview,
	views,
	pages,
	referrers,
	durations,
	systems,
	devices,
	browsers,
	sizes,
	languages
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