import { useQuery, gql } from '@apollo/client'

import domainFields from '../../fragments/domainFields'
import browsersField from '../../fragments/browsersField'
import enhanceBrowsers from '../../../enhancers/enhanceBrowsers'

const QUERY = gql`
	query fetchDomainBrowsers($id: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
		domain(id: $id) {
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

export default (id, filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			...filters,
			id
		},
		returnPartialData: true
	})

	const value = {
		domain: {
			...data?.domain,
			statistics: {
				...data?.domain?.statistics,
				browsers: enhanceBrowsers(data?.domain?.statistics?.browsers)
			}
		}
	}

	return {
		fetching,
		value
	}

}