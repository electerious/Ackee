import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import durationsField from '../fragments/durationsField'

const QUERY = gql`
	query fetchDurations($interval: Interval!, $limit: Int) {
		statistics {
			id
			...durationsField
		}
		domains {
			...domainFields
			statistics {
				id
				...durationsField
			}
		}
	}

	${ domainFields }
	${ durationsField }
`

export default (interval) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			interval,
			limit: 14
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		value: data == null ? { statistics: { durations: [] }, domains: [] } : data
	}

}