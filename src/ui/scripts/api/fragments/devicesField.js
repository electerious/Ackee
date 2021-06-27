import { gql } from '@apollo/client'

export default gql`
	fragment devicesField on DomainStatistics {
		devices(sorting: $sorting, type: $type, range: $range) {
			id
			value
			count
			created
		}
	}
`