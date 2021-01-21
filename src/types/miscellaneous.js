'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	scalar URL

	enum Interval {
		"""
		Group by day.
		"""
		DAILY
		"""
		Group by month.
		"""
		MONTHLY
		"""
		Group by year.
		"""
		YEARLY
	}

	enum Sorting {
		"""
		Entries with the most occurrences will be shown at the top.
		"""
		TOP
		"""
		Entries sorted by time. The newest entries will be shown at the top.
		"""
		RECENT
		"""
		Entries that appeared for the first time will be shown at the top.
		"""
		NEW
	}

	enum Range {
		"""
		Data of the last 24 hours.
		"""
		LAST_24_HOURS
		"""
		Data of the last 7 days.
		"""
		LAST_7_DAYS
		"""
		Data of the last 30 days.
		"""
		LAST_30_DAYS
		"""
		Data of the last 6 months.
		"""
		LAST_6_MONTHS
	}
`