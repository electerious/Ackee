'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	"""
	Unique name of the constant.
	"""
	enum ConstantName {
		"""
		Time granularity in page views duration analitics.
		"""
		DURATIONS_INTERVAL
		"""
		Maximum duration of page view.
		"""
		DURATIONS_LIMIT
	}

	"""
	Measure unit of the constant, usefull at UI context.
	"""
	enum ConstantUnit {
		hours
		minutes
		seconds
	}

	"""
	Constants data.
	"""
	type Constants {
		id: ConstantName!
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime
		"""
		Value of the constant.
		"""
		value: UnsignedInt!
		unit: ConstantUnit!
	}

	"""
	System constants which could be customized by user
	"""
	type SystemConstants {
		"""
		Durations limit of page view, in milliseconds.
		Visits longer than the limit will be ignored.
		"""
		durationsLimit: Constants
		"""
		Durations interval of page view, in milliseconds.
		It's a kind of time resolution of visits.
		"""
		durationsInterval: Constants
	}

	type Query {
		"""
		System constants which could be customized by user
		"""
		constants: SystemConstants!
	}

	input ConstantsInput {
		id: ConstantName!
		"""
		Value of the constant.
		"""
		value: UnsignedInt!
		unit: ConstantUnit!
	}

	type ConstantsPayload {
		"""
		Indicates if the operation finished successfully
		"""
		success: Boolean!
		"""
		Post-operation payload
		"""
		payload: Constants!
	}

	type Mutation {
		"""
		Set new value of given constant.
		"""
		setConstant(input: ConstantsInput!): ConstantsPayload!
	}
`