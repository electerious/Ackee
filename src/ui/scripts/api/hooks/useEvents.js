import { useQuery, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const QUERY = gql`
	query fetchEvents {
		events {
			...eventFields
		}
	}

	${ eventFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(QUERY)

	return {
		fetching,
		error,
		value: data == null ? [] : data.events
	}

}