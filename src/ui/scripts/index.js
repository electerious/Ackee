import { createElement as h } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import createStore from './utils/createStore'
import enhanceState from './utils/enhanceState'
import * as storage from './utils/storage'
import reducers from './reducers'
import * as actions from './actions'

import Main from './components/Main'

const store = createStore(reducers)

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)
const container = document.querySelector('#main')

store.dispatch(actions.setTokenValue(storage.get('ackee_token')))

const App = h(Provider, { store },
	h(ConnectedMain)
)

render(App, container)