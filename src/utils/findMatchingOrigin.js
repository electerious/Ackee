'use strict'

const fullyQualifiedDomainNames = require('./fullyQualifiedDomainNames')

const findOrigin = (request, origins) => {
	return origins.find((origin) => origin.includes(request.headers.origin) || origin.includes(request.headers.host))
}

module.exports = async (request, allowedOrigins, autoOrigin) => {
	if (autoOrigin === true) {
		const origins = await fullyQualifiedDomainNames()
		return findOrigin(request, origins)
	}

	if (allowedOrigins === '*') return '*'

	if (allowedOrigins != null) {
		const origins = allowedOrigins.split(',')
		return findOrigin(request, origins)
	}
}