import { gql } from '@apollo/client'

export default gql`
	fragment languagesField on DomainStatistics {
		languages(sorting: $sorting, range: $range) {
			id
			value
			count
			created
		}
	}
`