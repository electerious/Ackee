import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import systemsField from '../../fragments/systemsField'
import enhanceSystems from '../../../enhancers/enhanceSystems'

const QUERY = gql`
	query fetchSystems($id: ID!, $sorting: Sorting!, $type: SystemType!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...systemsField
			}
		}
	}

	${ systemsField }
`

export default (id, filters) => {
	const selector = (data) => data?.domain.statistics.systems
	const enhancer = enhanceSystems

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}