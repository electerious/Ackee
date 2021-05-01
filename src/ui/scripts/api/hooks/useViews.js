import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import viewsField from '../fragments/viewsField'

const QUERY = gql`
	query fetchViews($interval: Interval!, $type: ViewType!, $limit: Int) {
		statistics {
			id
			...viewsField
		}
		domains {
			...domainFields
			statistics {
				id
				...viewsField
			}
		}
	}

	${ domainFields }
	${ viewsField }
`

export default (interval, type) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			interval,
			type,
			limit: 14
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { views: [] }, domains: [] } : data
	}

}