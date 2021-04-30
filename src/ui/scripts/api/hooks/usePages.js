import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_PAGES = gql`
	query fetchPages($sorting: Sorting!, $range: Range) {
		domains {
			...domainFields
			statistics {
				pages(sorting: $sorting, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, type, range) => {

	const { loading: fetching, error, data } = useQuery(FETCH_PAGES, {
		variables: {
			sorting,
			range
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { domains: [] } : data
	}

}