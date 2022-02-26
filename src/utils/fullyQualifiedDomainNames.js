'use strict'

const isValidDomain = require('is-valid-domain')

const domains = require('../database/domains')

module.exports = async () => {
	const allDomains = await domains.all()
	const allTitles = allDomains.map((domain) => domain.title)
	const fullyQualifiedDomainNames = allTitles.filter((title) => isValidDomain(title, { subdomain: true, wildcard: false, allowUnicode: true }))

	return fullyQualifiedDomainNames
}