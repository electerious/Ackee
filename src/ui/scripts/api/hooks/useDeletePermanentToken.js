import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../utils/deleteIdModify'

const mutation = gql`
	mutation deletePermanentToken($id: ID!) {
		deletePermanentToken(id: $id) {
			success
		}
	}
`

const update = (id) => (cache) => {
	cache.modify({
		fields: {
			domains: deleteIdModify(id)
		}
	})
}

export default (id) => {

	const [ mutate, { loading: fetching, error }] = useMutation(mutation, {
		variables: {
			id
		}
	})

	return {
		mutate: (opts) => mutate({
			update: update(id),
			...opts
		}),
		fetching,
		error
	}

}