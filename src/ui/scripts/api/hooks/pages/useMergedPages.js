import { useQuery, gql } from '@apollo/client'

import pagesField from '../../fragments/pagesField'
import enhancePages from '../../../enhancers/enhancePages'

const QUERY = gql`
	query fetchMergedPages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			...pagesField
		}
	}

	${ pagesField }
`

export default (filters) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: filters
	})

	return {
		fetching,
		value: enhancePages(data?.statistics.pages)
	}

}