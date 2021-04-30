import { useQuery, gql } from '@apollo/client'

import permanentTokenFields from '../fragments/permanentTokenFields'

const QUERY = gql`
	query permanentTokens {
		permanentTokens {
			...permanentTokenFields
		}
	}

	${ permanentTokenFields }
`

export default () => {

	const { loading: fetching, error, data } = useQuery(QUERY)

	return {
		fetching,
		error,
		value: data == null ? [] : data.permanentTokens
	}

}