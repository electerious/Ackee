import { createElement as h } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import createStore from './utils/createStore'
import enhanceState from './utils/enhanceState'
import reducers from './reducers'
import * as actions from './actions'

import Main from './components/Main'

const store = createStore(reducers, {
	token: {
		value: localStorage.getItem('ackee_token')
	}
})

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)
const container = document.querySelector('#main')

const App = h(Provider, { store },
	h(ConnectedMain)
)

render(App, container)