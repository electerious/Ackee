import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_DEVICES = gql`
	query fetchDevices($sorting: Sorting!, $type: DeviceType!, $range: Range) {
		domains {
			...domainFields
			statistics {
				devices(sorting: $sorting, type: $type, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, type, range) => {

	const { loading: fetching, error, data } = useQuery(FETCH_DEVICES, {
		variables: {
			sorting,
			type,
			range
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { domains: [] } : data
	}

}