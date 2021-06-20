'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	"""
	Facts about a domain. Usually simple data that can be represented in one value.
	"""
	type Facts {
		"""
		Facts identifier.
		"""
		id: ID!
		"""
		Number of visitors currently on your site.
		"""
		activeVisitors: UnsignedInt!
		"""
		Average number of visitors per day during the last 14 days.
		"""
		averageViews: UnsignedInt!
		"""
		Percentage change of the average visitors when comparing the last 7 days with the previous 7 days.
		Might be undefined when there's not enough data to compare.
		"""
		averageViewsChange: Float
		"""
		Average visit duration of the last 14 days in milliseconds.
		"""
		averageDuration: UnsignedInt!
		"""
		Percentage change of the average visit duration when comparing the last 7 days with the previous 7 days.
		Might be undefined when there's not enough data to compare.
		"""
		averageDurationChange: Float
		"""
		Number of unique views today.
		"""
		viewsToday: UnsignedInt!
		"""
		Number of unique views this month.
		"""
		viewsMonth: UnsignedInt!
		"""
		Number of unique views this year.
		"""
		viewsYear: UnsignedInt!
	}

	type Query {
		"""
		Facts of all domains combined. Usually simple data that can be represented in one value.
		"""
		facts: Facts!
	}
`