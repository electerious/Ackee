import { useQuery, gql } from '@apollo/client'

import sizesField from '../../fragments/sizesField'
import enhanceSizes from '../../../enhancers/enhanceSizes'

const QUERY = gql`
	query fetchSizes($id: ID!, $sorting: Sorting!, $type: SizeType!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...sizesField
			}
		}
	}

	${ sizesField }
`

export default (id, filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			...filters,
			id
		}
	})

	return {
		fetching,
		value: enhanceSizes(data?.domain.statistics.sizes)
	}

}