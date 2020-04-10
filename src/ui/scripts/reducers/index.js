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
import sizes from './sizes'
import os from './os'
import devices from './devices'
import browsers from './browsers'

export default combineReducers({
	modals,
	token,
	route,
	domains,
	views,
	pages,
	referrers,
	durations,
	languages,
	sizes,
	os,
	devices,
	browsers
})