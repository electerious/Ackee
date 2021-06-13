import { gql } from '@apollo/client'

export default gql`
	fragment durationsField on DomainStatistics {
		durations(interval: $interval, limit: $limit) {
			id
			count
		}
	}
`