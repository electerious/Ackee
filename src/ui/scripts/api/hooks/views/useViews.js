import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			...filters,
			id
		}
	})

	return {
		fetching,
		value: enhanceViews(data?.domain.statistics.views, filters.limit)
	}

}