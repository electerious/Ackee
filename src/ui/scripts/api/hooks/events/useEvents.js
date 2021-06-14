import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
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
	const selector = (data) => data?.events
	const enhancer = (events = []) => events

	return useQuery(QUERY, selector, enhancer, {
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})
}