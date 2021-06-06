import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import referrersField from '../../fragments/referrersField'
import enhanceReferrers from '../../../enhancers/enhanceReferrers'

const QUERY = gql`
	query fetchMergedReferrers($sorting: Sorting!, $type: ReferrerType!, $range: Range) {
		statistics {
			id
			...referrersField
		}
	}

	${ referrersField }
`

export default (filters) => {
	const selector = (data) => data?.statistics.referrers
	const enhancer = enhanceReferrers

	return useQuery(QUERY, selector, enhancer, {
		variables: filters,
	})
}