import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_BROWSERS = gql`
	query fetchBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
		domains {
			...domainFields
			statistics {
				browsers(sorting: $sorting, type: $type, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, type, range) => {

	const { loading: fetching, error, data } = useQuery(FETCH_BROWSERS, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { domains: [] } : data
	}

}