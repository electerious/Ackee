import { useQuery, gql } from '@apollo/client'

import referrersField from '../../fragments/referrersField'
import enhanceReferrers from '../../../enhancers/enhanceReferrers'

const QUERY = gql`
	query fetchReferrers($id: ID!, $sorting: Sorting!, $type: ReferrerType!, $range: Range) {
		domain(id: $id) {
			statistics {
				id
				...referrersField
			}
		}
	}

	${ referrersField }
`

export default (id, filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			...filters,
			id
		}
	})

	return {
		fetching,
		value: enhanceReferrers(data?.domain.statistics.referrers)
	}

}