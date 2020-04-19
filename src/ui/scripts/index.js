import { createElement as h } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import isDemo from '../../utils/isDemo'

import enhanceState from './enhancers/enhanceState'
import createStore from './utils/createStore'
import * as storage from './utils/storage'
import reducers from './reducers'
import * as actions from './actions'

import { initialState as initialTokenState } from './reducers/token'
import { initialState as initialRouteState } from './reducers/route'
import { initialState as initialFilterState } from './reducers/filter'
import { initialState as initialViewsState } from './reducers/views'
import { initialState as initialPagesState } from './reducers/pages'
import { initialState as initialReferrersState } from './reducers/referrers'
import { initialState as initialDurationsState } from './reducers/durations'
import { initialState as initialLanguagesState } from './reducers/languages'
import { initialState as initialSystemsState } from './reducers/systems'
import { initialState as initialBrowsersState } from './reducers/browsers'
import { initialState as initialDevicesState } from './reducers/devices'
import { initialState as initialSizesState } from './reducers/sizes'

import Main from './components/Main'

const persistedState = storage.load()
const store = createStore(reducers, persistedState)

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)
const container = document.querySelector('#main')

if (isDemo === true) {
	console.warn('Ackee runs in demo mode')
}

store.subscribe(() => {

	const currentState = store.getState()

	storage.save({
		token: {
			...initialTokenState(),
			value: currentState.token.value
		},
		route: {
			...initialRouteState(),
			value: currentState.route.value
		},
		filter: {
			...initialFilterState(),
			range: currentState.filter.range
		},
		views: {
			...initialViewsState(),
			type: currentState.views.type,
			interval: currentState.views.interval
		},
		pages: {
			...initialPagesState(),
			sorting: currentState.pages.sorting
		},
		referrers: {
			...initialReferrersState(),
			range: currentState.referrers.range,
			sorting: currentState.referrers.sorting
		},
		durations: {
			...initialDurationsState(),
			type: currentState.durations.type
		},
		languages: {
			...initialLanguagesState(),
			range: currentState.languages.range,
			sorting: currentState.languages.sorting
		},
		systems: {
			...initialSystemsState(),
			range: currentState.systems.range,
			type: currentState.systems.type,
			sorting: currentState.systems.sorting
		},
		browsers: {
			...initialBrowsersState(),
			range: currentState.browsers.range,
			type: currentState.browsers.type,
			sorting: currentState.browsers.sorting
		},
		devices: {
			...initialDevicesState(),
			range: currentState.devices.range,
			type: currentState.devices.type,
			sorting: currentState.devices.sorting
		},
		sizes: {
			...initialSizesState(),
			range: currentState.sizes.range,
			type: currentState.sizes.type
		}
	})

})

const App = h(Provider, { store },
	h(ConnectedMain)
)

render(App, container)