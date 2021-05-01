import { useQuery, gql } from '@apollo/client'

import devicesField from '../../fragments/devicesField'
import enhanceDevices from '../../../enhancers/enhanceDevices'

const QUERY = gql`
	query fetchDevices($id: ID!, $sorting: Sorting!, $type: DeviceType!, $range: Range) {
		domain(id: $id) {
			statistics {
				id
				...devicesField
			}
		}
	}

	${ devicesField }
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
		value: enhanceDevices(data?.domain.statistics.devices)
	}

}