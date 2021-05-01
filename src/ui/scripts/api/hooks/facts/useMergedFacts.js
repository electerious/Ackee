import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY)

	return {
		fetching,
		value: enhanceFacts(data?.facts)
	}

}