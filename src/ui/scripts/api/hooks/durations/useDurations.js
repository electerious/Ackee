import { useQuery, gql } from '@apollo/client'

import durationsField from '../../fragments/durationsField'
import enhanceDurations from '../../../enhancers/enhanceDurations'

const QUERY = gql`
	query fetchDurations($id: ID!, $interval: Interval!, $limit: Int) {
		domain(id: $id) {
			id
			statistics {
				id
				...durationsField
			}
		}
	}

	${ durationsField }
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
		value: enhanceDurations(data?.domain.statistics.durations, filters.limit)
	}

}