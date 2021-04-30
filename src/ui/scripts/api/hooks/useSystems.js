import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
		statistics {
			id
			systems(sorting: $sorting, type: $type, range: $range) {
				id
				count
				created
			}
		}
		domains {
			...domainFields
			statistics {
				id
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

	const { loading: fetching, error, data } = useQuery(QUERY, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		error,
		value: data == null ? { statistics: { systems: [] }, domains: [] } : data
	}

}