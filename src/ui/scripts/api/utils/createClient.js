import { ApolloClient, InMemoryCache, from } from '@apollo/client'

export default (links) => {
	return new ApolloClient({
		link: from(links),
		cache: new InMemoryCache({}),
	})
}