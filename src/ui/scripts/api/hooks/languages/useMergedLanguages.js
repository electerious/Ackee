import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import languagesField from '../../fragments/languagesField'
import enhanceLanguages from '../../../enhancers/enhanceLanguages'

const QUERY = gql`
	query fetchMergedLanguages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			...languagesField
		}
	}

	${ languagesField }
`

export default (filters) => {
	const selector = (data) => data?.statistics.languages
	const enhancer = enhanceLanguages

	return useQuery(QUERY, selector, enhancer, {
		variables: filters,
	})
}