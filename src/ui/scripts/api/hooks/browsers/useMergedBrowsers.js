import { useQuery, gql } from '@apollo/client'

import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const FETCH_MERGED_BROWSERS = gql`
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

	const { loading: fetching, error, data } = useQuery(FETCH_MERGED_BROWSERS, {
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
		stale: fetching === true && data != null,
		error,
		value
	}

}