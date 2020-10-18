'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	enum EventType {
		"""
		Event that calculates the sum of all action values grouped by day, month or year.
		"""
		TOTAL_SUM
		"""
		Event that calculates the sum of all action values of a key, grouped by day, month or year.
		"""
		KEY_SUM
		"""
		Event that shows all actions in a chronic order.
		"""
		LOG
	}

	"""
	Events are required to track actions. You can create as many events as you want. This allows you to analyse specific actions happening on your sites. Like a button click or a successful sale.
	"""
	type Event {
		"""
		Event identifier.
		"""
		id: ID!
		"""
		Title of the event.
		"""
		title: String!
		"""
		Type of the event.
		"""
		type: EventType!
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime!
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime!
	}

	input CreateEventInput {
		"""
		Title of the event.
		"""
		title: String!
		"""
		Type of the event.
		"""
		type: EventType!
	}

	type CreateEventPayload {
		"""
		Indicates that the event creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created event.
		"""
		payload: Event
	}

	input UpdateEventInput {
		"""
		Title of the event.
		"""
		title: String!
		"""
		Type of the event.
		"""
		type: EventType!
	}

	type UpdateEventPayload {
		"""
		Indicates that the event update was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The updated event.
		"""
		payload: Event
	}

	type DeleteEventPayload {
		"""
		Indicates that the event deletion was successful. Might be 'null' otherwise.
		"""
		success: Boolean
	}

	type Query {
		"""
		Data of a specific event.
		"""
		event(id: ID!): Event
		"""
		Data of all existing events.
		"""
		events: [Event!]
	}

	type Mutation {
		"""
		Create a new event.
		"""
		createEvent(input: CreateEventInput!): CreateEventPayload!
		"""
		Update an existing event.
		"""
		updateEvent(id: ID!, input: UpdateEventInput!): UpdateEventPayload!
		"""
		Delete an existing event.
		"""
		deleteEvent(id: ID!): DeleteEventPayload!
	}
`