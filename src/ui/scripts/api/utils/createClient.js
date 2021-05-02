import { ApolloClient, InMemoryCache, from } from '@apollo/client'

export default (links) => {

	return new ApolloClient({
		link: from(links),
		defaultOptions: {
			query: {
				fetchPolicy: 'cache-and-network',
				nextFetchPolicy: 'cache-first'
			}
		},
		cache: new InMemoryCache({})
	})

}