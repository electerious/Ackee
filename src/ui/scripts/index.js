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
import { initialState as initialViewsState } from './reducers/views'
import { initialState as initialPagesState } from './reducers/pages'
import { initialState as initialReferrersState } from './reducers/referrers'
import { initialState as initialDurationsState } from './reducers/durations'
import { initialState as initialLanguagesState } from './reducers/languages'

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
		views: {
			...initialViewsState(),
			type: currentState.views.type
		},
		pages: {
			...initialPagesState(),
			type: currentState.pages.type
		},
		referrers: {
			...initialReferrersState(),
			sorting: currentState.referrers.sorting
		},
		durations: {
			...initialDurationsState(),
			type: currentState.durations.type
		},
		languages: {
			...initialLanguagesState(),
			sorting: currentState.languages.sorting
		}
	})

})

const App = h(Provider, { store },
	h(ConnectedMain)
)

render(App, container)