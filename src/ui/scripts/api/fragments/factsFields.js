import { gql } from '@apollo/client'

export default gql`
	fragment factsFields on Facts {
		id
		activeVisitors
		averageViews
		averageViewsChange
		averageDuration
		averageDurationChange
		viewsToday
		viewsMonth
		viewsYear
	}
`