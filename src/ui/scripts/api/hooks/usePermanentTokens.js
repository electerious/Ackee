import { useMemo } from 'react'
import { useQuery, gql } from '@apollo/client'

import permanentTokenFields from '../fragments/permanentTokenFields'

const query = gql`
	query permanentTokens {
		permanentTokens {
			...permanentTokenFields
		}
	}

	${ permanentTokenFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network'
	})

	const value = useMemo(() => data == null ? [] : data.permanentTokens, [ data ])

	return useMemo(() => ({
		fetching,
		stale: fetching === true && data != null,
		error,
		value
	}), [ fetching, error, value ])

}