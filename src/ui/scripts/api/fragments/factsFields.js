import { gql } from '@apollo/client'

export default gql`
	fragment factsFields on DomainFacts {
		id
		activeVisitors
		averageViews
		averageDuration
		viewsToday
		viewsMonth
		viewsYear
	}
`