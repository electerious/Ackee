'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
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
		Where the user came from. Specified using the source query parameter.
		"""
		source: String
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
		Where the user came from. Specified using the source query parameter.
		"""
		source: String
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
`