import { useMutation, gql } from '@apollo/client'

const MUTATION = gql`
	mutation deleteToken($id: ID!) {
		deleteToken(id: $id) {
			success
		}
	}
`

export default (id) => {

	const [ mutate, { loading, error }] = useMutation(MUTATION, {
		variables: {
			id
		}
	})

	return {
		mutate,
		loading,
		error
	}

}