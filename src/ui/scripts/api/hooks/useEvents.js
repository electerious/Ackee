import { useQuery, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const query = gql`
	query events {
		events {
			...eventFields
		}
	}

	${ eventFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? [] : data.events
	}

}