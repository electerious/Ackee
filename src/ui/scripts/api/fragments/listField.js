import { gql } from '@apollo/client'

export default gql`
	fragment listField on EventStatistics {
		list(sorting: $sorting, type: $type, range: $range) {
			id
			value
			count
			created
		}
	}
`