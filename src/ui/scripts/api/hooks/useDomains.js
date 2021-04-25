import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const query = gql`
	query domains {
		domains {
			...domainFields
		}
	}

	${ domainFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? [] : data.domains
	}

}