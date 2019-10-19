'use strict'

const normalizeUrl = require('normalize-url')

module.exports = (url) => normalizeUrl(url, {
	normalizeProtocol: false,
	stripWWW: false,
	removeTrailingSlash: false,
	sortQueryParameters: false
})