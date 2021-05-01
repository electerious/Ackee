import { useQuery, gql } from '@apollo/client'

import systemsField from '../../fragments/systemsField'
import enhanceSystems from '../../../enhancers/enhanceSystems'

const QUERY = gql`
	query fetchMergedSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
		statistics {
			id
			...systemsField
		}
	}

	${ systemsField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceSystems(data?.statistics.systems)
	}

}