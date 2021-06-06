import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import listField from '../../fragments/listField'
import enhanceEventList from '../../../enhancers/enhanceEventList'

const QUERY = gql`
	query fetchEventListEntries($id: ID!, $sorting: Sorting!, $type: EventListType!, $range: Range) {
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
	const selector = (data) => data?.event.statistics.list
	const enhancer = enhanceEventList

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}