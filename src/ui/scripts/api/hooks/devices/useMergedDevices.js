import { useQuery, gql } from '@apollo/client'

import devicesField from '../../fragments/devicesField'
import enhanceDevices from '../../../enhancers/enhanceDevices'

const QUERY = gql`
	query fetchMergedDevices($sorting: Sorting!, $type: DeviceType!, $range: Range) {
		statistics {
			id
			...devicesField
		}
	}

	${ devicesField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceDevices(data?.statistics.devices)
	}

}