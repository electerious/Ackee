import { useMutation, gql } from '@apollo/client'

import permanentTokenFields from '../fragments/permanentTokenFields'

const UPDATE_PERMANENT_TOKEN = gql`
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

	const [ mutate, { loading: fetching, error }] = useMutation(UPDATE_PERMANENT_TOKEN, {
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