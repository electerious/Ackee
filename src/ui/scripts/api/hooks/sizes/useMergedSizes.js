import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceSizes(data?.statistics.sizes)
	}

}