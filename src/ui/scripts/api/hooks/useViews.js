import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_VIEWS = gql`
	query fetchViews($interval: Interval!, $type: ViewType!) {
		statistics {
			views(interval: $interval, type: $type, limit: 14) {
				id
				count
			}
		}
		domains {
			...domainFields
			statistics {
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

	const { loading: fetching, error, data } = useQuery(FETCH_VIEWS, {
		variables: {
			interval,
			type
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { statistics: { views: [] }, domains: [] } : data
	}

}