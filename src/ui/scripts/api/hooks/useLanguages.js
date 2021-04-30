import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_LANGUAGES = gql`
	query fetchLanguages($sorting: Sorting!, $range: Range) {
		statistics {
			id
			languages(sorting: $sorting, range: $range) {
				id
				count
				created
			}
		}
		domains {
			...domainFields
			statistics {
				id
				languages(sorting: $sorting, range: $range) {
					id
					count
					created
				}
			}
		}
	}

	${ domainFields }
`

export default (sorting, range) => {

	const { loading: fetching, error, data } = useQuery(FETCH_LANGUAGES, {
		variables: {
			sorting,
			range
		}
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? { statistics: { languages: [] }, domains: [] } : data
	}

}