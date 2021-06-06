import { useMutation, gql } from '@apollo/client'

import domainFields from '../../fragments/domainFields'

const MUTATION = gql`
	mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
		updateDomain(id: $id, input: $input) {
			payload {
				...domainFields
			}
		}
	}

	${ domainFields }
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
				updateDomain: {
					payload: {
						id: id,
						title: options.variables.input.title,
						__typename: 'Domain',
					},
					__typename: 'UpdateDomainPayload',
				},
			},
			...options,
		}),
		loading,
		error,
	}
}