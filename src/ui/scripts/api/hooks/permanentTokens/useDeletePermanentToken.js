import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../../utils/deleteIdModify'

const MUTATION = gql`
	mutation deletePermanentToken($id: ID!) {
		deletePermanentToken(id: $id) {
			success
		}
	}
`

const update = (id) => (cache, result) => {
	const success = result.data.deletePermanentToken.success
	if (success === false) return

	cache.modify({
		fields: {
			permanentTokens: deleteIdModify(id),
		},
	})
}

export default (id) => {
	const [ mutate, { loading, error }] = useMutation(MUTATION, {
		variables: {
			id,
		},
	})

	return {
		mutate: (options) => mutate({
			update: update(id),
			optimisticResponse: {
				deletePermanentToken: {
					success: true,
					__typename: 'DeletePermanentTokenPayload',
				},
			},
			...options,
		}),
		loading,
		error,
	}
}