import { createElement as h } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import isDemoMode from '../../utils/isDemoMode'

import enhanceState from './enhancers/enhanceState'
import createStore from './utils/createStore'
import * as storage from './utils/storage'
import reducers from './reducers'
import * as actions from './actions'

import { initialState as initialTokenState } from './reducers/token'
import { initialState as initialRouteState } from './reducers/route'
import { initialState as initialFilterState } from './reducers/filter'
import { initialState as initialViewsState } from './reducers/views'
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

if (isDemoMode === true) {
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
			key: currentState.route.key,
			params: currentState.route.params
		},
		filter: {
			...initialFilterState(),
			sorting: currentState.filter.sorting,
			range: currentState.filter.range,
			interval: currentState.filter.interval
		},
		views: {
			...initialViewsState(),
			type: currentState.views.type
		},
		systems: {
			...initialSystemsState(),
			type: currentState.systems.type
		},
		browsers: {
			...initialBrowsersState(),
			type: currentState.browsers.type
		},
		devices: {
			...initialDevicesState(),
			type: currentState.devices.type
		},
		sizes: {
			...initialSizesState(),
			type: currentState.sizes.type
		}
	})

})

const App = h(Provider, { store },
	h(ConnectedMain)
)

render(App, container)