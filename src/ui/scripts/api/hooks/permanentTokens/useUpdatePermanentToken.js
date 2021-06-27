import { useMutation, gql } from '@apollo/client'

import permanentTokenFields from '../../fragments/permanentTokenFields'

const MUTATION = gql`
	mutation updatePermanentToken($id: ID!, $input: UpdatePermanentTokenInput!) {
		updatePermanentToken(id: $id, input: $input) {
			payload {
				...permanentTokenFields
			}
		}
	}

	${ permanentTokenFields }
`

export default (id) => {
	const [ mutate, { loading, error }] = useMutation(MUTATION, {
		variables: {
			id,
		},
	})

	return {
		mutate: (options) => mutate({
			optimisticResponse: {
				updatePermanentToken: {
					payload: {
						id: id,
						title: options.variables.input.title,
						__typename: 'PermanentToken',
					},
					__typename: 'UpdatePermanentTokenPayload',
				},
			},
			...options,
		}),
		loading,
		error,
	}
}