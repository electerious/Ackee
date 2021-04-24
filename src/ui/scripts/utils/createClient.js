import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export default () => {

	const httpLink = createHttpLink({
		uri: '/api'
	})

	const authLink = setContext((_, { headers }) => {

		const state = localStorage.getItem('ackee_state_3.0.6')
		if (state == null) return { headers }

		const token = JSON.parse(state).token.value

		return {
			headers: {
				...headers,
				Authorization: `Bearer ${ token }`
			}
		}

	})

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	})

}