'use strict'

const normalizeUrl = require('../utils/normalizeUrl')
const identifier = require('../utils/identifier')
const messages = require('../utils/messages')
const domains = require('../database/domains')
const records = require('../database/records')

const normalizeSiteLocation = (siteLocation) => {

	if (siteLocation == null) {

		// Pre-validate siteLocation and imitate MongoDB error
		throw new Error(`Path \`siteLocation\` is required`)

	}

	try {

		return normalizeUrl(siteLocation)

	} catch (err) {

		throw new Error(`Failed to normalize \`siteLocation\``, err)

	}

}

const normalizeSiteReferrer = (siteReferrer) => {

	// The siteReferrer is optional
	if (siteReferrer == null) return siteReferrer

	try {

		return normalizeUrl(siteReferrer)

	} catch (err) {

		throw new Error(`Failed to normalize \`siteReferrer\``, err)

	}

}

const polish = (obj) => {

	return Object.entries(obj).reduce((acc, [ key, value ]) => {

		value = typeof value === 'string' ? value.trim() : value
		value = value == null ? undefined : value
		value = value === '' ? undefined : value

		if (key === 'siteLocation') value = normalizeSiteLocation(value)
		if (key === 'siteReferrer') value = normalizeSiteReferrer(value)

		acc[key] = value
		return acc

	}, {})

}

module.exports = {
	Mutation: {
		createRecord: async (parent, { domainId, input }, { req }) => {

			const clientId = identifier(req, domainId)
			const data = polish({ ...input, clientId, domainId })

			const domain = await domains.get(domainId)

			if (domain == null) throw new Error('Unknown domain')

			let entry

			try {

				entry = await records.add(data)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new Error(messages(err.errors))
				}

				throw err

			}

			// Anonymize old entries with the same clientId to prevent that the browsing history
			// of a user is reconstructible. Will be skipped when there're no previous entries.
			await records.anonymize(clientId, entry.id)

			return {
				success: true,
				payload: entry
			}

		},
		updateRecord: async (parent, { id }) => {

			let entry

			try {

				entry = await records.update(id)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new Error(messages(err.errors))
				}

				throw err

			}

			if (entry == null) {
				throw new Error('Unknown record')
			}

			return {
				success: true
			}

		}
	}
}