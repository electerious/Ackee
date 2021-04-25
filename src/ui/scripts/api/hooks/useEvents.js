import { useQuery, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const FETCH_EVENTS = gql`
	query fetchEvents {
		events {
			...eventFields
		}
	}

	${ eventFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(FETCH_EVENTS, {
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