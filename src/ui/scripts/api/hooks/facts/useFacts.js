import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
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
	const selector = (data) => data?.domain.facts
	const enhancer = enhanceFacts

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			id,
		},
	})
}