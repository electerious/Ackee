import { useQuery, gql } from '@apollo/client'

import systemsField from '../../fragments/systemsField'
import enhanceSystems from '../../../enhancers/enhanceSystems'

const QUERY = gql`
	query fetchSystems($id: ID!, $sorting: Sorting!, $type: SystemType!, $range: Range) {
		domain(id: $id) {
			statistics {
				id
				...systemsField
			}
		}
	}

	${ systemsField }
`

export default (id, filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			...filters,
			id
		}
	})

	return {
		fetching,
		value: enhanceSystems(data?.domain.statistics.systems)
	}

}