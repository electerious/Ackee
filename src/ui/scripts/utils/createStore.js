import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export default (reducers, state) => {

	const middlewares = [
		thunk
	]

	const enhancer = composeWithDevTools(
		applyMiddleware(...middlewares)
	)

	return createStore(reducers, state, enhancer)

}