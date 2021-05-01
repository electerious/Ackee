import { useQuery, gql } from '@apollo/client'

import pagesField from '../../fragments/pagesField'
import enhancePages from '../../../enhancers/enhancePages'

const QUERY = gql`
	query fetchPages($id: ID!, $sorting: Sorting!, $range: Range) {
		domain(id: $id) {
			statistics {
				id
				...pagesField
			}
		}
	}

	${ pagesField }
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
		value: enhancePages(data?.domain.statistics.pages)
	}

}