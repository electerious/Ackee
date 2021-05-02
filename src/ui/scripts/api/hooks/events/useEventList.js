import { useQuery, gql } from '@apollo/client'

import listField from '../../fragments/listField'
import enhanceEventList from '../../../enhancers/enhanceEventList'

const QUERY = gql`
	query fetchEventChartEntries($id: ID!, $sorting: Sorting!, $type: EventListType!, $range: Range) {
		event(id: $id) {
			id
			statistics {
				id
				...listField
			}
		}
	}

	${ listField }
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
		value: enhanceEventList(data?.event.list)
	}

}