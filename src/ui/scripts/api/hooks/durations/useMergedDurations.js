import { useQuery, gql } from '@apollo/client'

import durationsField from '../../fragments/durationsField'
import enhanceDurations from '../../../enhancers/enhanceDurations'

const QUERY = gql`
	query fetchMergedDurations($interval: Interval!, $type: ViewType!, $limit: Int) {
		statistics {
			id
			...durationsField
		}
	}

	${ durationsField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceDurations(data?.statistics.durations, filters.limit)
	}

}