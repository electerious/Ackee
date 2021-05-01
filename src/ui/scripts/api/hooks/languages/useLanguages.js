import { useQuery, gql } from '@apollo/client'

import languagesField from '../../fragments/languagesField'
import enhanceLanguages from '../../../enhancers/enhanceLanguages'

const QUERY = gql`
	query fetchLanguages($id: ID!, $sorting: Sorting!, $range: Range) {
		domain(id: $id) {
			statistics {
				id
				...languagesField
			}
		}
	}

	${ languagesField }
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
		value: enhanceLanguages(data?.domain.statistics.languages)
	}

}