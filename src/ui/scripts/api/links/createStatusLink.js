import { createNetworkStatusNotifier } from 'react-apollo-network-status'

export default () => {

	const { link, useApolloNetworkStatus } = createNetworkStatusNotifier()

	const useStatus = () => {
		const status = useApolloNetworkStatus()

		const loading = (status.numPendingQueries + status.numPendingMutations) > 0
		const errors = [ ...status.queryError?.graphQLErrors ?? [], ...status.mutationError?.graphQLErrors ?? [] ]

		return {
			loading,
			errors
		}
	}

	return {
		statusLink: link,
		useStatus
	}

}