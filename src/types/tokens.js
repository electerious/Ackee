'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
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
		"""
		Title of the token.
		"""
		title: String
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