import { useMutation, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const mutation = gql`
	mutation createDomain($input: CreateDomainInput!) {
		createDomain(input: $input) {
			payload {
				...domainFields
			}
		}
	}

	${ domainFields }
`

export default () => {

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		refetchQueries: [
			'domains'
		]
	})

	return {
		mutate,
		fetching,
		error
	}

}