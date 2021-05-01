import { useQuery, gql } from '@apollo/client'

import domainFields from '../../fragments/domainFields'
import browsersField from '../../fragments/browsersField'
import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchDomainsBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
		domains {
			...domainFields
			statistics {
				id
				...browsersField
			}
		}
	}

	${ domainFields }
	${ browsersField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
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
		value
	}

}