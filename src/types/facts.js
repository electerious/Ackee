'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	type AverageViews {
		"""
		Average number of views per day during the last 14 days, excluding the current day.
		"""
		count: UnsignedInt!
		"""
		Percentage change of the average views when comparing the last 7 days with the previous 7 days.
		Might be undefined when there's not enough data to compare.
		"""
		change: Float
	}

	type AverageDuration {
		"""
		Average visit duration in milliseconds for the last 14 days, excluding the current day.
		"""
		count: UnsignedInt!
		"""
		Percentage change of the average visit duration when comparing the last 7 days with the previous 7 days.
		Might be undefined when there's not enough data to compare.
		"""
		change: Float
	}

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
		Details about the average number of views.
		"""
		averageViews: AverageViews!
		"""
		Details about the average visit duration.
		"""
		averageDuration: AverageDuration!
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