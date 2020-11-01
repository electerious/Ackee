'use strict'

module.exports = (req, allowedOrigins) => {

	if (allowedOrigins === '*') return '*'

	if (allowedOrigins != null) {
		const origins = allowedOrigins.split(',')
		return origins.find((origin) => origin.includes(req.headers.origin) || origin.includes(req.headers.host))
	}

}