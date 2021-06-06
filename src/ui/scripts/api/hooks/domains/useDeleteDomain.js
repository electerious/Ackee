import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../../utils/deleteIdModify'

const MUTATION = gql`
	mutation deleteDomain($id: ID!) {
		deleteDomain(id: $id) {
			success
		}
	}
`

const update = (id) => (cache, result) => {
	const success = result.data.deleteDomain.success
	if (success === false) return

	cache.modify({
		fields: {
			domains: deleteIdModify(id),
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
				deleteDomain: {
					success: true,
					__typename: 'DeleteDomainPayload',
				},
			},
			...options,
		}),
		loading,
		error,
	}
}