'use strict'

module.exports = (parent, args, { isDemo }) => {

	if (isDemo === true) {
		throw new Error('Forbidden in demo mode')
	}

}