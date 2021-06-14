import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
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
	const selector = (data) => data?.domain.statistics.sizes
	const enhancer = enhanceSizes

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}