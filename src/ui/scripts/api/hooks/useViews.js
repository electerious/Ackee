import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchViews($interval: Interval!, $type: ViewType!) {
		statistics {
			id
			views(interval: $interval, type: $type, limit: 14) {
				id
				count
			}
		}
		domains {
			...domainFields
			statistics {
				id
				views(interval: $interval, type: $type, limit: 7) {
					id
					count
				}
			}
		}
	}

	${ domainFields }
`

export default (interval, type) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			interval,
			type
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { views: [] }, domains: [] } : data
	}

}