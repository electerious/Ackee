import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchDurations($interval: Interval!) {
		statistics {
			id
			durations(interval: $interval, limit: 14) {
				id
				count
			}
		}
		domains {
			...domainFields
			statistics {
				id
				durations(interval: $interval, limit: 7) {
					id
					count
				}
			}
		}
	}

	${ domainFields }
`

export default (interval) => {

	const { loading: fetching, error, data } = useQuery(QUERY, {
		variables: {
			interval
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { statistics: { durations: [] }, domains: [] } : data
	}

}