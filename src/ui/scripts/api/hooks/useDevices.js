import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import devicesField from '../fragments/devicesField'

const QUERY = gql`
	query fetchDevices($sorting: Sorting!, $type: DeviceType!, $range: Range) {
		statistics {
			id
			...devicesField
		}
		domains {
			...domainFields
			statistics {
				id
				...devicesField
			}
		}
	}

	${ domainFields }
	${ devicesField }
`

export default (sorting, type, range) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { devices: [] }, domains: [] } : data
	}

}