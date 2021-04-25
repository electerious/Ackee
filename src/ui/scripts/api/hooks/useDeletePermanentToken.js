import { useMutation, gql } from '@apollo/client'

const mutation = gql`
	mutation deletePermanentToken($id: ID!) {
		deletePermanentToken(id: $id) {
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
			'permanentTokens'
		]
	})

	return {
		mutate,
		fetching,
		error
	}

}