import { combineReducers } from 'redux'

import modals from './modals'
import token from './token'
import route from './route'
import domains from './domains'
import views from './views'
import referrers from './referrers'

export default combineReducers({
	modals,
	token,
	route,
	domains,
	views,
	referrers
})