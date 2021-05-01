import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceReferrers(data?.statistics.referrers)
	}

}