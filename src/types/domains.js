'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
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
		statistics: DomainStatistics!
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
`