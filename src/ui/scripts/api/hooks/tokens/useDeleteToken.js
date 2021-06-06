import { useMutation, gql } from '@apollo/client'

const MUTATION = gql`
	mutation deleteToken($id: ID!) {
		deleteToken(id: $id) {
			success
		}
	}
`

export default () => {
	const [ mutate, { loading, error }] = useMutation(MUTATION)

	return {
		mutate,
		loading,
		error,
	}
}