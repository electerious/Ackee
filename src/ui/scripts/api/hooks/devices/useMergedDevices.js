import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
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
	const selector = (data) => data?.statistics.devices
	const enhancer = enhanceDevices

	return useQuery(QUERY, selector, enhancer, {
		variables: filters,
	})
}