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
			id
		}
	})

	return {
		mutate: (opts) => mutate({
			optimisticResponse: {
				updateDomain: {
					payload: {
						id: id,
						title: opts.variables.input.title,
						__typename: 'Domain'
					},
					__typename: 'UpdateDomainPayload'
				}
			},
			...opts
		}),
		loading,
		error
	}

}