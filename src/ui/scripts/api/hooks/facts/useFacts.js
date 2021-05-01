import { useQuery, gql } from '@apollo/client'

import factsFields from '../../fragments/factsFields'
import enhanceFacts from '../../../enhancers/enhanceFacts'

const QUERY = gql`
	query fetchFacts($id: ID!) {
		domain(id: $id) {
			id
			facts {
				...factsFields
			}
		}
	}

	${ factsFields }
`

export default (id) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			id
		}
	})

	return {
		fetching,
		value: enhanceFacts(data?.domain.facts)
	}

}