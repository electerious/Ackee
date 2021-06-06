import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
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
	const selector = (data) => data?.domain.statistics.browsers
	const enhancer = enhanceBrowsers

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}