import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_DOMAINS = gql`
	query fetchDomains {
		domains {
			...domainFields
		}
	}

	${ domainFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(FETCH_DOMAINS, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? [] : data.domains
	}

}