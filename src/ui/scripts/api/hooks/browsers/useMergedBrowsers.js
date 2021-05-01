import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters,
		returnPartialData: true
	})

	const value = {
		statistics: {
			...data?.statistics,
			browsers: enhanceBrowsers(data?.statistics?.browsers)
		}
	}

	return {
		fetching,
		value
	}

}