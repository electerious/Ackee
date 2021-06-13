import { gql } from '@apollo/client'

export default gql`
	fragment chartField on EventStatistics {
		chart(interval: $interval, type: $type, limit: $limit) {
			id
			count
		}
	}
`