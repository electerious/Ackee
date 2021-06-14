import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import languagesField from '../../fragments/languagesField'
import enhanceLanguages from '../../../enhancers/enhanceLanguages'

const QUERY = gql`
	query fetchLanguages($id: ID!, $sorting: Sorting!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...languagesField
			}
		}
	}

	${ languagesField }
`

export default (id, filters) => {
	const selector = (data) => data?.domain.statistics.languages
	const enhancer = enhanceLanguages

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}