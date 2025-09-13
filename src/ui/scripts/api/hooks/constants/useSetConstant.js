import { useMutation, gql } from '@apollo/client'

import constantFields from '../../fragments/constantFields'

const MUTATION = gql`
	mutation setConstant($input: ConstantsInput!) {
		setConstant(input: $input) {
			success
			payload {
				...constantFields
			}
		}
	}

	${ constantFields }
`

const update = (cache, result) => {
	const data = result.data.setConstant.payload
	const fragment = constantFields

	cache.modify({
		fields: {
			constants: (systemConstants) => {
				cache.writeFragment({ data, fragment })
				return systemConstants
			},
		},
	})
}

export default () => {
	const [ mutate, { loading, error }] = useMutation(MUTATION)

	return {
		mutate: (options) => mutate({
			update,
			optimisticResponse: {
				setConstant: {
					success: true,
					payload: {
						id: options.variables.input.id,
						value: options.variables.input.value,
						unit: options.variables.input.unit,
						__typename: 'Constants',
					},
					__typename: 'ConstantsPayload',
				},
			},
			...options,
		}),
		loading,
		error,
	}
}