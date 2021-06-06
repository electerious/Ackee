import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import permanentTokenFields from '../../fragments/permanentTokenFields'

const QUERY = gql`
	query permanentTokens {
		permanentTokens {
			...permanentTokenFields
		}
	}

	${ permanentTokenFields }
`

export default () => {
	const selector = (data) => data?.permanentTokens
	const enhancer = (permanentTokens = []) => permanentTokens

	return useQuery(QUERY, selector, enhancer, {
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})
}