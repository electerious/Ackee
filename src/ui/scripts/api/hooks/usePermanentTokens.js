import { useQuery, gql } from '@apollo/client'

import permanentTokenFields from '../fragments/permanentTokenFields'

const FETCH_PERMANENT_TOKENS = gql`
	query permanentTokens {
		permanentTokens {
			...permanentTokenFields
		}
	}

	${ permanentTokenFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(FETCH_PERMANENT_TOKENS, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? [] : data.permanentTokens
	}

}