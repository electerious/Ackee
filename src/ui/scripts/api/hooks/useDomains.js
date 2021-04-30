import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const QUERY = gql`
	query fetchDomains {
		domains {
			...domainFields
		}
	}

	${ domainFields }
`

export default () => {

	const { loading: fetching, data } = useQuery(QUERY)

	return {
		fetching,
		value: data == null ? [] : data.domains
	}

}