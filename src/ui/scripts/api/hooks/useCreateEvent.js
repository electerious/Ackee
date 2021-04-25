import { useMutation, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const mutation = gql`
	mutation createEvent($input: CreateEventInput!) {
		createEvent(input: $input) {
			payload {
				...eventFields
			}
		}
	}

	${ eventFields }
`

export default () => {

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		refetchQueries: [
			'events'
		]
	})

	return {
		mutate,
		fetching,
		error
	}

}