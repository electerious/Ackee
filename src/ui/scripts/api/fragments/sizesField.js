import { gql } from '@apollo/client'

export default gql`
	fragment sizesField on DomainStatistics {
		sizes(sorting: $sorting, type: $type, range: $range) {
			id
			value
			count
			created
		}
	}
`