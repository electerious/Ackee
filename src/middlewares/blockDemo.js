'use strict'

// TODO: Delete this file

const { createError } = require('micro')

const isDemo = require('../utils/isDemo')

module.exports = async () => {

	if (isDemo === true) {
		throw createError(403, 'Forbidden in demo mode')
	}

}