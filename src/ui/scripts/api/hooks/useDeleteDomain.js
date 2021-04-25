import { useMutation, gql } from '@apollo/client'

const mutation = gql`
	mutation deleteDomain($id: ID!) {
		deleteDomain(id: $id) {
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
			'domains'
		]
	})

	return {
		mutate,
		fetching,
		error
	}

}