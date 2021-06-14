import { createNetworkStatusNotifier, ActionTypes } from 'react-apollo-network-status'

const pendingRequestsReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.REQUEST:
			return state + 1
		case ActionTypes.ERROR:
		case ActionTypes.SUCCESS:
		case ActionTypes.CANCEL:
			return Math.max(state - 1, 0)
		default:
			return state
	}
}

const errorsReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.REQUEST:
			return []
		case ActionTypes.ERROR:
			const { networkError } = action.payload
			return [ networkError ]
		case ActionTypes.SUCCESS:
			const { result } = action.payload
			const hasErrors = result != null && result.errors != null
			return hasErrors === true ? [ ...result.errors ] : state
		default:
			return state
	}
}

export default () => {
	const { link, useApolloNetworkStatusReducer } = createNetworkStatusNotifier()

	const useLoading = () => {
		const pendingRequests = useApolloNetworkStatusReducer(pendingRequestsReducer, 0)
		return pendingRequests > 0
	}

	const useErrors = () => {
		return useApolloNetworkStatusReducer(errorsReducer, [])
	}

	return {
		statusLink: link,
		useLoading,
		useErrors,
	}
}