import { useMutation, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const UPDATE_EVENT = gql`
	mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
		updateEvent(id: $id, input: $input) {
			payload {
				...eventFields
			}
		}
	}

	${ eventFields }
`

export default (id) => {

	const [ mutate, { loading: fetching, error }] = useMutation(UPDATE_EVENT, {
		variables: {
			id
		}
	})

	return {
		mutate,
		fetching,
		error
	}

}