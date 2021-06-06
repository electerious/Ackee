import { useMutation, gql } from '@apollo/client'

import addAndSortModify from '../../utils/addAndSortModify'
import permanentTokenFields from '../../fragments/permanentTokenFields'

const MUTATION = gql`
	mutation createPermanentToken($input: CreatePermanentTokenInput!) {
		createPermanentToken(input: $input) {
			payload {
				...permanentTokenFields
			}
		}
	}

	${ permanentTokenFields }
`

const update = (cache, result) => {
	const data = result.data.createPermanentToken.payload
	const fragment = permanentTokenFields

	cache.modify({
		fields: {
			permanentTokens: (...args) => {
				const newRef = cache.writeFragment({ data, fragment })
				return addAndSortModify(newRef, 'title')(...args)
			},
		},
	})
}

export default () => {
	const [ mutate, { loading, error }] = useMutation(MUTATION)

	return {
		mutate: (options) => mutate({
			update,
			...options,
		}),
		loading,
		error,
	}
}