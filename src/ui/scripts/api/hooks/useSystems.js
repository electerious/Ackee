import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_SYSTEMS = gql`
	query fetchSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
		domains {
			...domainFields
			statistics {
				systems(sorting: $sorting, type: $type, range: $range) {
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

	const { loading: fetching, error, data } = useQuery(FETCH_SYSTEMS, {
		variables: {
			sorting,
			type,
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