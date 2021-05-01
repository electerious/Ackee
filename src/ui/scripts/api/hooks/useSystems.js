import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import systemsField from '../fragments/systemsField'

const QUERY = gql`
	query fetchSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
		statistics {
			id
			...systemsField
		}
		domains {
			...domainFields
			statistics {
				id
				...systemsField
			}
		}
	}

	${ domainFields }
	${ systemsField }
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
		value: data == null ? { statistics: { systems: [] }, domains: [] } : data
	}

}