import { useMemo } from 'react'
import { useQuery, gql } from '@apollo/client'

const query = gql`
	query events {
		events {
			id
			title
			type
		}
	}
`

export default () => {

	const { loading: fetching, error, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network'
	})

	const value = useMemo(() => data == null ? [] : data.events, [ data ])

	return useMemo(() => ({
		fetching,
		stale: fetching === true && data != null,
		error,
		value
	}), [ fetching, error, value ])

}