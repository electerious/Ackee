import { useQuery } from '@apollo/client'

import status from '../../utils/status'

export default (query, selector, enhancer, opts) => {

	const { loading, data } = useQuery(query, opts)

	const value = selector(data)

	return {
		value: enhancer(value),
		status: status(value, loading)
	}

}