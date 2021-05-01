import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import pagesField from '../fragments/pagesField'

const QUERY = gql`
	query fetchPages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			...pagesField
		}
		domains {
			...domainFields
			statistics {
				id
				...pagesField
			}
		}
	}

	${ domainFields }
	${ pagesField }
`

export default (sorting, range) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			sorting,
			range
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { pages: [] }, domains: [] } : data
	}

}