import { useQuery, gql } from '@apollo/client'

import viewsField from '../../fragments/viewsField'
import enhanceViews from '../../../enhancers/enhanceViews'

const QUERY = gql`
	query fetchMergedViews($interval: Interval!, $type: ViewType!, $limit: Int) {
		statistics {
			id
			...viewsField
		}
	}

	${ viewsField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceViews(data?.statistics.views, filters.limit)
	}

}