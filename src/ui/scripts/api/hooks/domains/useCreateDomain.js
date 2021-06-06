import { useMutation, gql } from '@apollo/client'

import addAndSortModify from '../../utils/addAndSortModify'
import domainFields from '../../fragments/domainFields'

const MUTATION = gql`
	mutation createDomain($input: CreateDomainInput!) {
		createDomain(input: $input) {
			payload {
				...domainFields
			}
		}
	}

	${ domainFields }
`

const update = (cache, result) => {
	const data = result.data.createDomain.payload
	const fragment = domainFields

	cache.modify({
		fields: {
			domains: (...args) => {
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