'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	"""
	Event entries will be stored as actions.
	"""
	type Action {
		"""
		Action identifier.
		"""
		id: ID!
		"""
		Optional key that will be used to group similar actions in the UI.
		"""
		key: String!
		"""
		Numerical value that is added to all other numerical values of the key, grouped by day, month or year.
		Use '1' to count how many times an event occurred or a price (e.g. '1.99') to see the sum of successful checkouts in a shop.
		"""
		value: PositiveFloat!
		"""
		Details allow you to store more data along with the associated action.
		"""
		details: String
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime!
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime!
	}

	input CreateActionInput {
		"""
		Key that will be used to group similar actions in the UI.
		"""
		key: String!
		"""
		Numerical value that is added to all other numerical values of the key, grouped by day, month or year.
		Use '1' to count how many times an event occurred or a price (e.g. '1.99') to see the sum of successful checkouts in a shop.
		"""
		value: PositiveFloat
		"""
		Details allow you to store more data along with the associated action.
		"""
		details: String
	}

	type CreateActionPayload {
		"""
		Indicates that the action creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created action.
		"""
		payload: Action
	}

	input UpdateActionInput {
		"""
		Key that will be used to group similar actions in the UI.
		"""
		key: String!
		"""
		Numerical value that is added to all other numerical values of the key, grouped by day, month or year.
		Use '1' to count how many times an event occurred or a price (e.g. '1.99') to see the sum of successful checkouts in a shop.
		Reset an existing value using 'null'.
		"""
		value: PositiveFloat
		"""
		Details allow you to store more data along with the associated action.
		"""
		details: String
	}

	type UpdateActionPayload {
		"""
		Indicates that the action update was successful. Might be 'null' otherwise.
		"""
		success: Boolean
	}

	type Mutation {
		"""
		Create a new action to track an event.
		"""
		createAction(eventId: ID!, input: CreateActionInput!): CreateActionPayload!
		"""
		Update an existing action.
		"""
		updateAction(id: ID!, input: UpdateActionInput!): UpdateActionPayload!
	}
`