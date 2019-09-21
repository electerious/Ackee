'use strict'

const normalizeUrl = require('normalize-url')

module.exports = (url) => normalizeUrl(url, {
	removeDirectoryIndex: true,
	removeQueryParameters: [
		/^utm_\w+/i,
		'ref',
		'fbclid',
		'source'
	]
})