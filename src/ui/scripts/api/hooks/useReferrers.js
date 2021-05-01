import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import referrersField from '../fragments/referrersField'

const QUERY = gql`
	query fetchReferrers($sorting: Sorting!, $type: ReferrerType!, $range: Range) {
		statistics {
			id
			...referrersField
		}
		domains {
			...domainFields
			statistics {
				id
				...referrersField
			}
		}
	}

	${ domainFields }
	${ referrersField }
`

export default (sorting, type, range) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { pages: [] }, domains: [] } : data
	}

}