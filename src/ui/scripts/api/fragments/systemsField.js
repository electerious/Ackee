import { gql } from '@apollo/client'

export default gql`
	fragment systemsField on DomainStatistics {
		systems(sorting: $sorting, type: $type, range: $range) {
			value
			count
			created
		}
	}
`