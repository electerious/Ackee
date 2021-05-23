import { useMemo } from 'react'
import { createNetworkStatusNotifier } from 'react-apollo-network-status'

export default () => {

	const { link, useApolloNetworkStatus } = createNetworkStatusNotifier()

	const useStatus = () => {
		const status = useApolloNetworkStatus()

		const loading = (status.numPendingQueries + status.numPendingMutations) > 0
		const errors = useMemo(() => {
			return [
				status.queryError?.networkError,
				status.mutationError?.networkError
			]
				.concat(status.queryError?.graphQLErrors)
				.concat(status.mutationError?.graphQLErrors)
				.filter(Boolean)
		}, [ status.queryError, status.mutationError ])

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