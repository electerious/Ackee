import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import factsFields from '../fragments/factsFields'

const QUERY = gql`
	query fetchFacts {
		facts {
			...factFields
		}
		domains {
			...domainFields
			facts {
				...factFields
			}
		}
	}

	${ domainFields }
	${ factsFields }
`

export default () => {

	const { loading: fetching, data } = useQuery(QUERY)

	return {
		fetching,
		value: data == null ? { facts: {}, domains: [] } : data
	}

}