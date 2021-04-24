import { createNetworkStatusNotifier } from 'react-apollo-network-status'

export default () => {

	const networkStatusNotifier = createNetworkStatusNotifier()

	return {
		networkStatusLink: networkStatusNotifier.link,
		useNetworkStatusLink: networkStatusNotifier.useApolloNetworkStatus
	}

}