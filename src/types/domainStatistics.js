'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	enum ViewType {
		"""
		Unique site views.
		"""
		UNIQUE
		"""
		Total page views.
		"""
		TOTAL
	}

	type View {
		"""
		Date of visits.
		"""
		id: DateTime!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt!
	}

	type Page {
		"""
		URL of the page.
		"""
		id: URL!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	enum ReferrerType {
		"""
		Use source parameter instead of referrer when available.
		"""
		WITH_SOURCE
		"""
		Omit source parameters and show referrers only.
		"""
		NO_SOURCE
		"""
		Omit referrers and show source parameters only.
		"""
		ONLY_SOURCE
	}

	type Referrer {
		"""
		Either the URL of the referrer or the source parameter of the page to indicate where the visit comes from.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	type Duration {
		"""
		Date of average duration.
		"""
		id: DateTime!
		"""
		Average duration in milliseconds.
		"""
		count: UnsignedInt!
	}

	enum SystemType {
		"""
		Include system version.
		"""
		WITH_VERSION
		"""
		Omit system version.
		"""
		NO_VERSION
	}

	type System {
		"""
		Name of the system. With or without the version.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	enum DeviceType {
		"""
		Include model name.
		"""
		WITH_MODEL
		"""
		Omit model name.
		"""
		NO_MODEL
	}

	type Device {
		"""
		Name of the device. With or without the model.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	enum BrowserType {
		"""
		Include browser version.
		"""
		WITH_VERSION
		"""
		Omit browser version.
		"""
		NO_VERSION
	}

	type Browser {
		"""
		Name of the browser. With or without the version.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	enum SizeType {
		"""
		Browser height in pixels.
		"""
		BROWSER_WIDTH
		"""
		Browser width in pixels.
		"""
		BROWSER_HEIGHT
		"""
		Browser width and height in pixels.
		"""
		BROWSER_RESOLUTION
		"""
		Browser height in pixels.
		"""
		SCREEN_WIDTH
		"""
		Browser width in pixels.
		"""
		SCREEN_HEIGHT
		"""
		Browser width and height in pixels.
		"""
		SCREEN_RESOLUTION
	}

	type Size {
		"""
		Screen or browser width, height or resolution.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	type Language {
		"""
		Name of the language or language code when unknown.
		"""
		id: String!
		"""
		Amount of occurrences.
		"""
		count: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
	}

	"""
	Statistics of a domain. Usually data that needs to be represented in a list or chart.
	"""
	type DomainStatistics {
		"""
		Amount of views grouped by day, month or year.
		"""
		views(
			interval: Interval!,
			type: ViewType!,
			"""
			Number of entries to return. Starts with the current day, month or year depending on the chosen interval.
			"""
			limit: Int = 14
		): [View!]
		"""
		Pages viewed by your visitors.
		"""
		pages(
			sorting: Sorting!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Page!]
		"""
		Where your visitors are coming from.
		"""
		referrers(
			sorting: Sorting!,
			type: ReferrerType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Referrer!]
		"""
		Average visit duration by day, month or year.
		"""
		durations(
			interval: Interval!,
			"""
			Number of entries to return. Starts with the current day, month or year depending on the chosen interval.
			"""
			limit: Int = 14
		): [Duration!]
		"""
		Systems used by your visitors.
		"""
		systems(
			sorting: Sorting!,
			type: SystemType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [System!]
		"""
		Devices used by your visitors.
		"""
		devices(
			sorting: Sorting!,
			type: DeviceType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Device!]
		"""
		Browsers used by your visitors.
		"""
		browsers(
			sorting: Sorting!,
			type: BrowserType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Browser!]
		"""
		Screen or browser sizes used by your visitors.
		"""
		sizes(
			sorting: Sorting!,
			type: SizeType!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Size!]
		"""
		Browser languages used by your visitors.
		"""
		languages(
			sorting: Sorting!,
			range: Range = LAST_7_DAYS,
			"""
			Number of entries to return.
			"""
			limit: Int = 30
		): [Language!]
	}

	type Query {
		"""
		Statistics of all domains combined. Usually data that needs to be represented in a list or chart.
		"""
		statistics: DomainStatistics!
	}
`