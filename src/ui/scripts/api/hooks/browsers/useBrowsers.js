import { useQuery, gql } from '@apollo/client'

import browsersField from '../../fragments/browsersField'
import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchBrowsers($id: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...browsersField
			}
		}
	}

	${ browsersField }
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
		value: enhanceBrowsers(data?.domain.statistics.browsers)
	}

}