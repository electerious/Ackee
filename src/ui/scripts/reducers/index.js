import { combineReducers } from 'redux'

import modals from './modals'
import token from './token'
import route from './route'
import filter from './filter'
import domains from './domains'
import views from './views'
import pages from './pages'
import referrers from './referrers'
import durations from './durations'
import languages from './languages'
import sizes from './sizes'
import systems from './systems'
import devices from './devices'
import browsers from './browsers'

export default combineReducers({
	modals,
	token,
	route,
	filter,
	domains,
	views,
	pages,
	referrers,
	durations,
	languages,
	sizes,
	systems,
	devices,
	browsers
})