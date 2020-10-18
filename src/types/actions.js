'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	"""
	Event entries will be stored as actions. The TotalSumAction contains data for a TotalSum type event.
	"""
	type TotalSumAction {
		"""
		Action identifier.
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

	input CreateTotalSumActionInput {
		"""
		Numerical value that is added to all other numerical values of the same day, month or year.
		"""
		value: Float!
	}

	type CreateTotalSumActionPayload {
		"""
		Indicates that the action creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created action.
		"""
		payload: TotalSumAction
	}

	input UpdateTotalSumActionInput {
		"""
		Numerical value that is added to all other numerical values of the same day, month or year.
		"""
		value: Float!
	}

	type UpdateTotalSumActionPayload {
		"""
		Indicates that the action update was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The updated action.
		"""
		payload: TotalSumAction
	}

	type Mutation {
		"""
		Create a new action for a TotalSum type event.
		"""
		createTotalSumAction(eventId: ID!, input: CreateTotalSumActionInput!): CreateTotalSumActionPayload!
		"""
		Update an existing action for a TotalSum type event.
		"""
		updateTotalSumAction(id: ID!, input: UpdateTotalSumActionInput!): UpdateTotalSumActionPayload!
	}
`