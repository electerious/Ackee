import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (reducers, state) => {

	const middlewares = []

	const enhancer = composeWithDevTools(
		applyMiddleware(...middlewares)
	)

	return createStore(reducers, state, enhancer)

}