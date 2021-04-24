import { useMemo } from 'react'
import { useMutation, gql } from '@apollo/client'

import eventFields from '../fragments/eventFields'

const mutation = gql`
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

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		variables: {
			id
		}
	})

	return useMemo(() => ({
		mutate,
		fetching,
		error
	}), [ mutate, fetching, error ])

}