import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import referrersField from '../../fragments/referrersField'
import enhanceReferrers from '../../../enhancers/enhanceReferrers'

const QUERY = gql`
	query fetchReferrers($id: ID!, $sorting: Sorting!, $type: ReferrerType!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...referrersField
			}
		}
	}

	${ referrersField }
`

export default (id, filters) => {
	const selector = (data) => data?.domain.statistics.referrers
	const enhancer = enhanceReferrers

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}