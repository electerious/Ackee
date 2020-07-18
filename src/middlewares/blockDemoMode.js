'use strict'

module.exports = (parent, args, { isDemoMode }) => {

	if (isDemoMode === true) {
		throw new Error('Forbidden in demo mode')
	}

}