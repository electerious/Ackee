import { useMutation, gql } from '@apollo/client'

import eventFields from '../../fragments/eventFields'

const MUTATION = gql`
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

	const [ mutate, { loading, error }] = useMutation(MUTATION, {
		variables: {
			id
		}
	})

	return {
		mutate: (opts) => mutate({
			optimisticResponse: {
				updateEvent: {
					payload: {
						id: id,
						title: opts.variables.input.title,
						type: opts.variables.input.type,
						__typename: 'Event'
					},
					__typename: 'UpdateEventPayload'
				}
			},
			...opts
		}),
		loading,
		error
	}

}