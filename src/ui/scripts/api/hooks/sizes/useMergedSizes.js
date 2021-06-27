import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import sizesField from '../../fragments/sizesField'
import enhanceSizes from '../../../enhancers/enhanceSizes'

const QUERY = gql`
	query fetchMergedSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
		statistics {
			id
			...sizesField
		}
	}

	${ sizesField }
`

export default (filters) => {
	const selector = (data) => data?.statistics.sizes
	const enhancer = enhanceSizes

	return useQuery(QUERY, selector, enhancer, {
		variables: filters,
	})
}