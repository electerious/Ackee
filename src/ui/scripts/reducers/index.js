import { combineReducers } from 'redux'

import modals from './modals'
import token from './token'
import route from './route'
import domains from './domains'
import views from './views'
import pages from './pages'
import referrers from './referrers'
import durations from './durations'
import languages from './languages'

export default combineReducers({
	modals,
	token,
	route,
	domains,
	views,
	pages,
	referrers,
	durations,
	languages
})