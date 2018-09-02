import { combineReducers } from 'redux'

import token from './token'
import route from './route'
import domains from './domains'
import views from './views'

export default combineReducers({
	token,
	route,
	domains,
	views
})