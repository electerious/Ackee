import { gql } from '@apollo/client'

export default gql`
	fragment languagesField on DomainStatistics {
		languages(sorting: $sorting, range: $range) {
			value
			count
			created
		}
	}
`