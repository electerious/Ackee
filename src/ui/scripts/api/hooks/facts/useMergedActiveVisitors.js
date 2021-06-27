import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import enhanceFacts from '../../../enhancers/enhanceFacts'

const QUERY = gql`
	query fetchMergedActiveVisitors {
		facts {
			id
			activeVisitors
		}
	}
`

export default () => {
	const selector = (data) => data?.facts
	const enhancer = enhanceFacts

	return useQuery(QUERY, selector, enhancer, {
		pollInterval: 5000,
	})
}