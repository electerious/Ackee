import { gql } from '@apollo/client'

export default gql`
	fragment browsersField on DomainStatistics {
		browsers(sorting: $sorting, type: $type, range: $range) {
			id
			value
			count
			created
		}
	}
`