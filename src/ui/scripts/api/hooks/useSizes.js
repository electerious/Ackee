import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
		statistics {
			id
			sizes(sorting: $sorting, type: $type, range: $range) {
				id
				count
				created
			}
		}
		domains {
			...domainFields
			statistics {
				id
				sizes(sorting: $sorting, type: $type, range: $range) {
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
		value: data == null ? { statistics: { sizes: [] }, domains: [] } : data
	}

}