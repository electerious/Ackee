import { createNetworkStatusNotifier } from 'react-apollo-network-status'

export default () => {

	const statusNotifier = createNetworkStatusNotifier()

	return {
		statusLink: statusNotifier.link,
		useStatusLink: statusNotifier.useApolloNetworkStatus
	}

}