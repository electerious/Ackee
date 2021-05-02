import { useQuery } from '@apollo/client'

import status from '../../utils/status'

export default (query, selector, enhancer, opts) => {

	const { loading, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-and-network',
		...opts
	})

	const value = selector(data)

	return {
		value: enhancer(value),
		status: status(value, loading)
	}

}