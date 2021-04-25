import { useMutation, gql } from '@apollo/client'

import permanentTokenFields from '../fragments/permanentTokenFields'

const mutation = gql`
	mutation createPermanentToken($input: CreatePermanentTokenInput!) {
		createPermanentToken(input: $input) {
			payload {
				...permanentTokenFields
			}
		}
	}

	${ permanentTokenFields }
`

export default () => {

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
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