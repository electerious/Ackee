import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import viewsField from '../../fragments/viewsField'
import enhanceViews from '../../../enhancers/enhanceViews'

const QUERY = gql`
	query fetchViews($id: ID!, $interval: Interval!, $type: ViewType!, $limit: Int) {
		domain(id: $id) {
			id
			statistics {
				id
				...viewsField
			}
		}
	}

	${ viewsField }
`

export default (id, filters) => {
	const selector = (data) => data?.domain.statistics.views
	const enhancer = (value) => enhanceViews(value, filters.limit)

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}