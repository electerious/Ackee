'use strict'

const { mergeTypeDefs } = require('graphql-tools')

module.exports = mergeTypeDefs([
	`
		"""
		Domains are required to track views. You can create as many domains as you want, but it's recommended to create on domain per project/site. This allows you to view facts and statistics separately.
		"""
		type Domain {
			"""
			Domain identifier.
			"""
			id: ID!
			"""
			Title of the domain.
			"""
			title: String!
			"""
			Facts about a domain. Usually simple data that can be represented in one value.
			"""
			facts: Facts!
			"""
			Statistics of a domain. Usually data that needs to be represented in a list or chart.
			"""
			statistics: Statistics!
			"""
			Identifies the date and time when the object was created.
			"""
			created: DateTime!
			"""
			Identifies the date and time when the object was updated.
			"""
			updated: DateTime!
		}

		input CreateDomainInput {
			"""
			Title of the domain.
			"""
			title: String!
		}

		type CreateDomainPayload {
			"""
			Indicates that the domain creation was successful. Might be 'null' otherwise.
			"""
			success: Boolean
			"""
			The newly created domain.
			"""
			payload: Domain
		}

		input UpdateDomainInput {
			"""
			Title of the domain.
			"""
			title: String!
		}

		type UpdateDomainPayload {
			"""
			Indicates that the domain update was successful. Might be 'null' otherwise.
			"""
			success: Boolean
			"""
			The updated domain.
			"""
			payload: Domain
		}

		type DeleteDomainPayload {
			"""
			Indicates that the domain deletion was successful. Might be 'null' otherwise.
			"""
			success: Boolean
		}

		type Query {
			"""
			Data of a specific domain.
			"""
			domain(id: ID!): Domain
			"""
			Data of all existing domains.
			"""
			domains: [Domain!]
		}

		type Mutation {
			"""
			Create a new domain.
			"""
			createDomain(input: CreateDomainInput!): CreateDomainPayload!
			"""
			Update an existing domain.
			"""
			updateDomain(id: ID!, input: UpdateDomainInput!): UpdateDomainPayload!
			"""
			Delete an existing domain.
			"""
			deleteDomain(id: ID!): DeleteDomainPayload!
		}
	`,
	`
	"""
Facts about a domain. Usually simple data that can be represented in one value.
"""
type Facts {
	"""
	Number of visitors currently on your site.
	"""
	activeVisitors: UnsignedInt!
	"""
	Average number of visitors per day during the last 14 days.
	"""
	averageViews: UnsignedInt!
	"""
	Average visit duration of the last 14 days in milliseconds.
	"""
	averageDuration: UnsignedInt!
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
	`,
	`
	scalar URL
	`,
	`
	"""
	Page views will be stored in records. They contain data about the visit and user. Ackee tries its best to keep tracked data anonymized. Several steps are used to avoid that users are identifiable, while still providing helpful analytics.
	"""
	type Record {
		"""
		Record identifier.
		"""
		id: ID!
		"""
		URL of the page.
		"""
		siteLocation: URL!
		"""
		Where the user came from. Either unknown, a specific page or just the domain. This depends on the browser of the user.
		"""
		siteReferrer: URL
		"""
		Preferred language of the user. ISO 639-1 formatted.
		"""
		siteLanguage: String
		"""
		Width of the screen used by the user to visit the site.
		"""
		screenWidth: UnsignedInt
		"""
		Height of the screen used by the user to visit the site.
		"""
		screenHeight: UnsignedInt
		"""
		Color depth of the screen used by the user to visit the site.
		"""
		screenColorDepth: UnsignedInt
		"""
		Device used by the user to visit the site.
		"""
		deviceName: String
		"""
		Manufacturer of the device used by the user to visit the site.
		"""
		deviceManufacturer: String
		"""
		Operating system used by the user to visit the site.
		"""
		osName: String
		"""
		Operating system version used by the user to visit the site.
		"""
		osVersion: String
		"""
		Browser used by the user to visit the site.
		"""
		browserName: String
		"""
		Version of the browser used by the user to visit the site.
		"""
		browserVersion: String
		"""
		Width of the browser used by the user to visit the site.
		"""
		browserWidth: UnsignedInt
		"""
		Height of the browser used by the user to visit the site.
		"""
		browserHeight: UnsignedInt
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime!
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime!
	}

	input CreateRecordInput {
		"""
		URL of the page.
		"""
		siteLocation: URL!
		"""
		Where the user came from. Either unknown, a specific page or just the domain. This depends on the browser of the user.
		"""
		siteReferrer: URL
		"""
		Preferred language of the user. ISO 639-1 formatted.
		"""
		siteLanguage: String
		"""
		Width of the screen used by the user to visit the site.
		"""
		screenWidth: UnsignedInt
		"""
		Height of the screen used by the user to visit the site.
		"""
		screenHeight: UnsignedInt
		"""
		Color depth of the screen used by the user to visit the site.
		"""
		screenColorDepth: UnsignedInt
		"""
		Device used by the user to visit the site.
		"""
		deviceName: String
		"""
		Manufacturer of the device used by the user to visit the site.
		"""
		deviceManufacturer: String
		"""
		Operating system used by the user to visit the site.
		"""
		osName: String
		"""
		Operating system version used by the user to visit the site.
		"""
		osVersion: String
		"""
		Browser used by the user to visit the site.
		"""
		browserName: String
		"""
		Version of the browser used by the user to visit the site.
		"""
		browserVersion: String
		"""
		Width of the browser used by the user to visit the site.
		"""
		browserWidth: UnsignedInt
		"""
		Height of the browser used by the user to visit the site.
		"""
		browserHeight: UnsignedInt
	}

	type CreateRecordPayload {
		"""
		Indicates that the record creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created record.
		"""
		payload: Record
	}

	type UpdateRecordPayload {
		"""
		Indicates that the record update was successful. Might be 'null' otherwise.
		"""
		success: Boolean
	}

	type Mutation {
		"""
		Create a new record to track a page visit.
		"""
		createRecord(domainId: ID!, input: CreateRecordInput!): CreateRecordPayload!
		"""
		Update an existing record to track the duration of a visit.
		"""
		updateRecord(id: ID!): UpdateRecordPayload!
	}
	`,
	`
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

	type Referrer {
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
	type Statistics {
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
		statistics: Statistics!
	}
	`,
	`
	type Token {
		"""
		Token identifier. Use this value for authentication.
		"""
		id: ID!
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime!
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime!
	}

	input CreateTokenInput {
		"""
		Username used to protect the Ackee instance.
		"""
		username: String!
		"""
		Password used to protect the Ackee instance.
		"""
		password: String!
	}

	type CreateTokenPayload {
		"""
		Indicates that the token creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created token.
		"""
		payload: Token
	}

	type DeleteTokenPayload {
		"""
		Indicates that the token deletion was successful. Might be 'null' otherwise.
		"""
		success: Boolean
	}

	type Mutation {
		"""
		Create a new token. The token is required in order to access protected data.
		"""
		createToken(input: CreateTokenInput!): CreateTokenPayload!
		"""
		Delete an existing token. The token than can't be used anymore for authentication.
		"""
		deleteToken(id: ID!): DeleteTokenPayload!
	}
	`
], { all: true })