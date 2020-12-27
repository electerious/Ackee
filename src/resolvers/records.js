'use strict'

const KnownError = require('../utils/KnownError')
const normalizeUrl = require('../utils/normalizeUrl')
const identifier = require('../utils/identifier')
const messages = require('../utils/messages')
const domains = require('../database/domains')
const records = require('../database/records')

const normalizeSiteLocation = (siteLocation) => {

	if (siteLocation == null) {

		// Pre-validate siteLocation and imitate MongoDB error
		throw new KnownError(`Path \`siteLocation\` is required`)

	}

	try {

		return normalizeUrl(siteLocation)

	} catch (err) {

		throw new KnownError(`Failed to normalize \`siteLocation\``, err)

	}

}

const normalizeSiteReferrer = (siteReferrer) => {

	// The siteReferrer is optional
	if (siteReferrer == null) return siteReferrer

	try {

		return normalizeUrl(siteReferrer)

	} catch (err) {

		throw new KnownError(`Failed to normalize \`siteReferrer\``, err)

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
		createRecord: async (parent, { domainId, input }, { ip, userAgent, isIgnored }) => {

			// Ignore your own records when logged in
			if (isIgnored === true) {
				return {
					success: true,
					payload: {
						id: '88888888-8888-8888-8888-888888888888'
					}
				}
			}

			const clientId = identifier(ip, userAgent, domainId)
			const data = polish({ ...input, clientId, domainId })

			const domain = await domains.get(domainId)

			if (domain == null) throw new KnownError('Unknown domain')

			let entry

			try {

				entry = await records.add(data)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
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
		updateRecord: async (parent, { id }, { isIgnored }) => {

			// Ignore your own records when logged in
			if (isIgnored === true) {
				return {
					success: true
				}
			}

			let entry

			try {

				entry = await records.update(id)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
				}

				throw err

			}

			if (entry == null) {
				throw new KnownError('Unknown record')
			}

			return {
				success: true
			}

		}
	}
}