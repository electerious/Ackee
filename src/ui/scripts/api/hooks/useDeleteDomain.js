import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../utils/deleteIdModify'

const DELETE_DOMAIN = gql`
	mutation deleteDomain($id: ID!) {
		deleteDomain(id: $id) {
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

	const [ mutate, { loading: fetching, error }] = useMutation(DELETE_DOMAIN, {
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