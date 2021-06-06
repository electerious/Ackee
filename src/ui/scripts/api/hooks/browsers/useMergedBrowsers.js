import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import browsersField from '../../fragments/browsersField'
import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchMergedBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
		statistics {
			id
			...browsersField
		}
	}

	${ browsersField }
`

export default (filters) => {
	const selector = (data) => data?.statistics.browsers
	const enhancer = enhanceBrowsers

	return useQuery(QUERY, selector, enhancer, {
		variables: filters,
	})
}