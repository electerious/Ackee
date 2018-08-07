import { combineReducers } from 'redux'

import token from './token'
import route from './route'

export default combineReducers({
	token,
	route
})