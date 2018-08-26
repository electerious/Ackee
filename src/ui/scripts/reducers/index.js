import { combineReducers } from 'redux'

import token from './token'
import route from './route'
import domains from './domains'

export default combineReducers({
	token,
	route,
	domains
})