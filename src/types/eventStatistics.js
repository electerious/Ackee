'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	enum EventChartType {
		"""
		Total sum of values.
		"""
		TOTAL
		"""
		Average sum of values.
		"""
		AVERAGE
	}

	enum EventListType {
		"""
		Total sum of values.
		"""
		TOTAL
		"""
		Average sum of values.
		"""
		AVERAGE
	}

	type EventChartEntry {
		"""
		Date of the event.
		"""
		id: DateTime!
		"""
		Sum of values on that date.
		"""
		count: Float!
	}

	type EventListEntry {
		"""
		Key of the event.
		"""
		id: String!
		"""
		Sum of values of the current event key.
		"""
		count: Float
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	"""
	Statistics of an event. The data is available in different types, depending on whether they are to be shown in a chart or list.
	"""
	type EventStatistics {
		"""
		The chart type should be used when showing events in a chart. It groups events by an interval and shows the total or average sum of values on each entry.
		"""
		chart(
			interval: Interval!,
			type: EventChartType!,
			"""
			Number of entries to return. Starts with the current day, month or year depending on the chosen interval.
			"""
			limit: Int = 14
		): [EventChartEntry!]
		"""
		The list type should be used when showing events in a list. It groups events by their key and shows the total or average sum of values on each entry.
		"""
		list(
			sorting: Sorting!,
			type: EventListType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [EventListEntry!]
	}
`