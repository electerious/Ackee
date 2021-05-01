import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'
import languagesField from '../fragments/languagesField'

const QUERY = gql`
	query fetchLanguages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			...languagesField
		}
		domains {
			...domainFields
			statistics {
				id
				...languagesField
			}
		}
	}

	${ domainFields }
	${ languagesField }
`

export default (sorting, range) => {

	const { loading: fetching, data } = useQuery(QUERY, {
		variables: {
			sorting,
			range
		}
	})

	return {
		fetching,
		value: data == null ? { statistics: { languages: [] }, domains: [] } : data
	}

}