import { createElement as h } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import { ApolloProvider } from '@apollo/client/react'

import createNetworkStatusLink from './api/links/createNetworkStatusLink'
import createAuthLink from './api/links/createAuthLink'
import createHttpLink from './api/links/createHttpLink'
import createClient from './api/utils/createClient'
import enhanceState from './enhancers/enhanceState'
import createStore from './utils/createStore'
import * as storage from './utils/storage'
import reducers from './reducers/index'
import * as actions from './actions/index'

import { initialState as initialTokenState } from './reducers/token'
import { initialState as initialFilterState } from './reducers/filter'

import Main from './components/Main'

const { networkStatusLink } = createNetworkStatusLink()
const client = createClient([
	networkStatusLink,
	createAuthLink(),
	createHttpLink()
])

const persistedState = storage.load()
const store = createStore(reducers, persistedState)

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)
const container = document.querySelector('#main')

if (window.env.isDemoMode === true) {
	console.warn('Ackee runs in demo mode')
}

store.subscribe(() => {

	const currentState = store.getState()

	storage.save({
		token: {
			...initialTokenState(),
			value: currentState.token.value
		},
		filter: {
			...initialFilterState(),
			...currentState.filter
		}
	})

})

const App = h(ApolloProvider, { client },
	h(Provider, { store },
		h(ConnectedMain)
	)
)

render(App, container)