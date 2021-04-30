import { useQuery, gql } from '@apollo/client'

import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchMergedBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
		statistics {
			id
			browsers(sorting: $sorting, type: $type, range: $range) {
				id
				count
				created
			}
		}
	}
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