import { gql } from '@apollo/client'

export default gql`
	fragment factsFields on Facts {
		id
		activeVisitors
		averageViews
		averageDuration
		viewsToday
		viewsMonth
		viewsYear
	}
`