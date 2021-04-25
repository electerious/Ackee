import { useMutation, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const mutation = gql`
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

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		variables: {
			id
		}
	})

	return {
		mutate,
		fetching,
		error
	}

}