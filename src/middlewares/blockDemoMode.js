'use strict'

const KnownError = require('../utils/KnownError')

module.exports = (parent, args, { isDemoMode }) => {

	if (isDemoMode === true) {
		throw new KnownError('Forbidden in demo mode')
	}

}