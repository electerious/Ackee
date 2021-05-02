import { useQuery, gql } from '@apollo/client'

import eventFields from '../../fragments/eventFields'

const QUERY = gql`
	query fetchEvents {
		events {
			...eventFields
		}
	}

	${ eventFields }
`

export default () => {

	const { loading: fetching, data } = useQuery(QUERY)

	return {
		fetching,
		value: data == null ? [] : data.events
	}

}