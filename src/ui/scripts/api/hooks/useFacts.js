import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchFacts {
		facts {
			id
			activeVisitors
			averageViews
			averageDuration
			viewsToday
			viewsMonth
			viewsYear
		}
		domains {
			...domainFields
			facts {
				id
				activeVisitors
				averageViews
				averageDuration
				viewsToday
				viewsMonth
				viewsYear
			}
		}
	}

	${ domainFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(QUERY)

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { facts: {}, domains: [] } : data
	}

}