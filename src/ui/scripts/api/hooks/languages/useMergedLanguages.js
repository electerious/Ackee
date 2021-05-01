import { useQuery, gql } from '@apollo/client'

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

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhanceLanguages(data?.statistics.languages)
	}

}