import { useMutation, gql } from '@apollo/client'

const MUTATION = gql`
	mutation createToken($input: CreateTokenInput!) {
		createToken(input: $input) {
			payload {
				id
			}
		}
	}
`

export default () => {

	const [ mutate, { loading: fetching, error }] = useMutation(MUTATION)

	return {
		mutate,
		fetching,
		error
	}

}