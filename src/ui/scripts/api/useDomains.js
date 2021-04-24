import { useMemo } from 'react'
import { useQuery, gql } from '@apollo/client'

const query = gql`
	query domains {
		domains {
			id
			title
		}
	}
`

export default () => {

	const { loading: fetching, error, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network'
	})

	const value = useMemo(() => data == null ? [] : data.domains, [ data ])

	return useMemo(() => ({
		fetching,
		stale: fetching === true && data != null,
		error,
		value
	}), [ fetching, error, value ])

}