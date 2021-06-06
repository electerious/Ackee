import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import factsFields from '../../fragments/factsFields'
import enhanceFacts from '../../../enhancers/enhanceFacts'

const QUERY = gql`
	query fetchMergedFacts {
		facts {
			...factsFields
		}
	}

	${ factsFields }
`

export default () => {
	const selector = (data) => data?.facts
	const enhancer = enhanceFacts

	return useQuery(QUERY, selector, enhancer)
}