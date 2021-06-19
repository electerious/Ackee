import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import enhanceFacts from '../../../enhancers/enhanceFacts'

const QUERY = gql`
	query fetchActiveVisitors($id: ID!) {
		domain(id: $id) {
			id
			facts {
				id
				activeVisitors
			}
		}
	}
`

export default (id) => {
	const selector = (data) => data?.domain.facts
	const enhancer = enhanceFacts

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			id,
		},
		pollInterval: 5000,
	})
}