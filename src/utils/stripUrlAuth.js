'use strict'

module.exports = (url) => {
	if (typeof url !== 'string') {
		throw new TypeError('Expected a valid URL')
	}

	return url.replace(/^((?:\w+:)?\/\/)[^@/]+@/, '$1')
}