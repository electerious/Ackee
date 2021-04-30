import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_SIZES = gql`
	query fetchSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
		domains {
			...domainFields
			statistics {
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

	const { loading: fetching, error, data } = useQuery(FETCH_SIZES, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { domains: [] } : data
	}

}