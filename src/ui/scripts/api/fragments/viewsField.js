import { gql } from '@apollo/client'

export default gql`
	fragment viewsField on DomainStatistics {
		views(interval: $interval, type: $type, limit: $limit) {
			id
			count
		}
	}
`