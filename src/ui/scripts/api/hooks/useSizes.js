import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import sizesField from '../fragments/sizesField'

const QUERY = gql`
	query fetchSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
		statistics {
			id
			...sizesField
		}
		domains {
			...domainFields
			statistics {
				id
				...sizesField
			}
		}
	}

	${ domainFields }
	${ sizesField }
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
		value: data == null ? { statistics: { sizes: [] }, domains: [] } : data
	}

}