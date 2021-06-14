import { gql } from '@apollo/client'

export default gql`
	fragment pagesField on DomainStatistics {
		pages(sorting: $sorting, range: $range) {
			id
			value
			count
			created
		}
	}
`