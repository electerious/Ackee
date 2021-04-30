import { useQuery, gql } from '@apollo/client'

import domainFields from '../../fragments/domainFields'
import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchDomainsBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
		domains {
			...domainFields
			statistics {
				id
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

export default (filters) => {

	const { loading: fetching, error, data } = useQuery(QUERY, {
		variables: filters,
		returnPartialData: true
	})

	const value = {
		domains: (data?.domains ?? []).map((domain) => ({
			...domain,
			statistics: {
				...domain?.statistics,
				browsers: enhanceBrowsers(domain.statistics?.browsers)
			}
		}))
	}

	return {
		fetching,
		error,
		value
	}

}