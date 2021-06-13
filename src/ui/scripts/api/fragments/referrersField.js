import { gql } from '@apollo/client'

export default gql`
	fragment referrersField on DomainStatistics {
		referrers(sorting: $sorting, type: $type, range: $range) {
			id
			value
			count
			created
		}
	}
`