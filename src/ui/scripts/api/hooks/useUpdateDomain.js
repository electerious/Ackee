import { useMutation, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const UPDATE_DOMAIN = gql`
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

	const [ mutate, { loading: fetching, error }] = useMutation(UPDATE_DOMAIN, {
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