'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	type PermanentToken {
		"""
		Permanent token identifier. Use this value for authentication.
		"""
		id: ID!
		"""
		Title of the permanent token.
		"""
		title: String!
		"""
		Identifies the date and time when the object was created.
		"""
		created: DateTime!
		"""
		Identifies the date and time when the object was updated.
		"""
		updated: DateTime!
	}

	input CreatePermanentTokenInput {
		"""
		Title of the permanent token.
		"""
		title: String!
	}

	type CreatePermanentTokenPayload {
		"""
		Indicates that the permanent token creation was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The newly created permanent token.
		"""
		payload: PermanentToken
	}

	input UpdatePermanentTokenInput {
		"""
		Title of the permanent token.
		"""
		title: String!
	}

	type UpdatePermanentTokenPayload {
		"""
		Indicates that the permanent token update was successful. Might be 'null' otherwise.
		"""
		success: Boolean
		"""
		The updated permanent token.
		"""
		payload: PermanentToken
	}

	type DeletePermanentTokenPayload {
		"""
		Indicates that the permanent token deletion was successful. Might be 'null' otherwise.
		"""
		success: Boolean
	}

	type Query {
		"""
		Data of a specific permanent token.
		"""
		permanentToken(id: ID!): PermanentToken
		"""
		Data of all existing permanent tokens.
		"""
		permanentTokens: [PermanentToken!]
	}

	type Mutation {
		"""
		Create a new permanent token. The token is required in order to access protected data.
		"""
		createPermanentToken(input: CreatePermanentTokenInput!): CreatePermanentTokenPayload!
		"""
		Update an existing permanent token.
		"""
		updatePermanentToken(id: ID!, input: UpdatePermanentTokenInput!): UpdatePermanentTokenPayload!
		"""
		Delete an existing permanent token. The token than can't be used anymore for authentication.
		"""
		deletePermanentToken(id: ID!): DeletePermanentTokenPayload!
	}
`