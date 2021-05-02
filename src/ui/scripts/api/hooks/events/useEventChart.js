import { useQuery, gql } from '@apollo/client'

import chartField from '../../fragments/chartField'
import enhanceEventChart from '../../../enhancers/enhanceEventChart'

const QUERY = gql`
	query fetchEventChartEntries($id: ID!, $interval: Interval!, $type: EventChartType!, $limit: Int) {
		event(id: $id) {
			id
			statistics {
				id
				...chartField
			}
		}
	}

	${ chartField }
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
		value: enhanceEventChart(data?.event.chart, filters.limit)
	}

}