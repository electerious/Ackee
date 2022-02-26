'use strict'

const isValidDomain = require('is-valid-domain')

const domains = require('../database/domains')

module.exports = async () => {
	const availableDomains = await domains.all()
	const availableTitles = availableDomains.map((domain) => domain.title)

	return availableTitles.filter((title) => isValidDomain(title, { subdomain: true, wildcard: false, allowUnicode: true }))
}