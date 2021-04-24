import { useMemo } from 'react'
import { useMutation, gql } from '@apollo/client'

const mutation = gql`
	mutation deleteEvent($id: ID!) {
		deleteEvent(id: $id) {
			success
		}
	}
`

export default (id) => {

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		variables: {
			id
		},
		refetchQueries: [
			'events'
		]
	})

	return useMemo(() => ({
		mutate,
		fetching,
		error
	}), [ mutate, fetching, error ])

}